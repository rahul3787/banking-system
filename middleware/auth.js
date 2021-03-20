const jwt =require('jsonwebtoken');
const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
module.exports = function(req,res,next){
    try {
        const token =req.header('x-auth-token');
        const verifiedUser = jwt.verify(
            token,
            jwtSecret


        )
        req.user =verifiedUser.user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg : "server error ..."});
        
    }
}