const { Router } = require('express');
const { 
    getAllLugares, 
    getLugarById, 
    createLugar, 
    updateLugar, 
    deleteLugar 
} = require('../controllers/lugares.controller');
const { isAuthenticated, isAuthorized } = require("../middleware/auth");
const { roles } = require("../config");
const router = Router();

router.post("/", isAuthenticated, isAuthorized(roles.admin), createLugar);
router.put("/:id", isAuthenticated, isAuthorized(roles.admin), updateLugar);
router.get("/", isAuthenticated, isAuthorized(roles.usuario, roles.admin), getAllLugares);
router.get("/:id", isAuthenticated, isAuthorized(roles.usuario, roles.admin), getLugarById);
router.delete("/:id", isAuthenticated, isAuthorized(roles.admin), deleteLugar);

module.exports = router;