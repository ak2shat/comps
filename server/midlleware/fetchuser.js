const jwt = require('jsonwebtoken');
const JWT_SECRET = "hack_kar_ke_dikha";

function fetchuser(req, res, next) {
    
    const token = req.header('auth-token');
    if(!token){
        res.send("Please login first").status(401);
    }
    try {
        let data = jwt.verify(token,JWT_SECRET);
        req.user = data.user
        next();  
    } catch (error) {
        res.send("Please login first").status(401);
    }
}

module.exports = fetchuser;