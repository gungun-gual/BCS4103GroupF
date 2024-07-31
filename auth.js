const jwt = require('jsonwebtoken');
const secret = "EcommerceAPI";

// Token Creation
module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isadmin: user.isadmin
    }

    return jwt.sign(data, secret, {})
}

// Token Verification
module.exports.verify = (req, res, next) => {

    let token = req.headers.authorization

    if (typeof token !== "undefined") {
        console.log(token);
        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (error, data) =>{
            if(error){
                return res.send({auth: "failed"})
            } else {
                next()
            }
        })
    } else {
        return res.send({auth: "failed"})
    }
};

// Token Decryption
module.exports.decode = (token) => {
    if (typeof token !== "undefined"){

        token = token.slice(7, token.length);

        return jwt.verify(token, secret, (error, data) =>{
            if(error){
                return null;
            } else {
                return jwt.decode(token, {complete:true}).payload
            }
        })
    } else {
        return null
    }
}