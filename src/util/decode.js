const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

function decodeJwt(token) {
    const response = jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
           return null
        }
        return decoded._id
    })
    return response;
}

module.exports = {decodeJwt}