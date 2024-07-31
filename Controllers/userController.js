const pool = require('../connection.js');
const queries = require('../queries.js');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

const getSpecificUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getSpecificUser, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
};

const createUser = (req, res) => {
    const { firstname, lastname, email, password} = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email already exists");
        }

        // add user to database
        pool.query(queries.createUser, [firstname, lastname, email, password], (error, results) => {
            if (error) throw error;
            res.status(200).send("User Created Successfully")
        });
    })
    
};


const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getSpecificUser, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound){
            res.send("User does not exist in the database");
        } else {
            pool.query(queries.deleteUser, [id], (error, results) => {
                if(error) throw error;
                res.status(200).send("User deleted!")
            })
        }

    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { email } = req.body;

    pool.query(queries.getSpecificUser, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound){
            res.send("User does not exist in the database");
        } else {
            pool.query(queries.updateUser, [email, id], (error, results) => {
                if(error) throw error;
                res.status(200).send("User updated successfully!");
            })
        }
    })
}

const authUser = (req, res) => {
    const { firstname, lastname, email, password} = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email already exists");
        }

        // add user to database
        pool.query(queries.createUser, [firstname, lastname, email, bcrypt.hashSync(password, 10)], (error, results) => {
            if (error) throw error;
            res.status(200).send("User Created Successfully")
        });
    })
    
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    pool.query(queries.findUserByEmail, [email], (error, results) => {
        if(results.rows.length){
            // res.status(200).json(results.rows[0].password)

            const isPasswordCorrect = bcrypt.compareSync(password, results.rows[0].password);

            const accessToken = auth.createAccessToken(results)

            if(isPasswordCorrect){
                res.send({accessToken})

            } else {
                return false
            }

        } else {
            res.send("Please register")
        }
    })
};


module.exports = {
    getUsers,
    getSpecificUser,
    createUser,
    deleteUser,
    updateUser,
    authUser,
    loginUser
};