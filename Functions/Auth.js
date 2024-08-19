const jwt=require("jsonwebtoken")
const secreat="rahul";

function setUser(user) {
   const payload ={
        email: user.Email,
        password:user.password
    }
    return jwt.sign(payload,secreat)
}

function getUser(token) {
    return jwt.verify(token,secreat)
}

module.exports={setUser}