const { verify } = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    const token = req.header("x-authorization");
    
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid token.");
    }
};

function isAuthorized(...roles) {
    return function (req, res, next) {
        const allowed = [...roles];
        var { rol_id } = req.usuario;
        if (rol_id == 1 ) rol_id = 'admin';
        if (rol_id == 2) rol_id = 'usuario';

        if (!allowed.includes(rol_id))
            return res.status(403).send("Access denied.");

        next();
    };
}

module.exports = {
    isAuthenticated,
    isAuthorized,
};
