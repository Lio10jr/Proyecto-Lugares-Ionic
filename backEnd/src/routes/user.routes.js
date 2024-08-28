const { Router } = require('express');
const { registro, login } = require("../controllers/user.controller");
const { isAuthenticated, isAuthorized } = require("../middleware/auth");
const { roles } = require("../config");
const router = Router();

router.post("/registro", registro);
router.post("/login", login);

module.exports = router;