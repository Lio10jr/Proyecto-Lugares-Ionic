const { Router } = require('express');
const { 
    addComment,
    getAllComments, 
    getCommentById
} = require('../controllers/comentario.controller');
const { isAuthenticated, isAuthorized } = require("../middleware/auth");
const { roles } = require("../config");
const router = Router();

router.post("/", isAuthenticated, isAuthorized(roles.admin, roles.usuario), addComment);
router.get("/", isAuthenticated, isAuthorized(roles.usuario, roles.admin), getAllComments);
router.get("/:id", isAuthenticated, isAuthorized(roles.usuario, roles.admin), getCommentById);

module.exports = router;