const getUsers = "SELECT * FROM users";

const getSpecificUser = "SELECT * FROM users WHERE id = $1";

const createUser = "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)";

const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";

const deleteUser = "DELETE FROM users WHERE id = $1";

const updateUser = "UPDATE users SET email = $1 WHERE id = $2";

const findUserByEmail = "SELECT * from users WHERE email = $1";

module.exports = {
    getUsers,
    getSpecificUser,
    createUser,
    checkEmailExists,
    deleteUser,
    updateUser,
    findUserByEmail
};
