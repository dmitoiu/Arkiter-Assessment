// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// TwitStips (posts.js) v1.0.0 13/03/2022
// A web application designed for personal use
// -----------------------------------------------------------------------

// Importing libraries and utilities
var express = require('express');
var router = express.Router();
var shapesController = require("../controllers/shapesController");
var authMiddleware = require("../middleware/authMiddleware");
var getShapes = shapesController.getShapes;
var getPostById = shapesController.getPostById;
var protect = authMiddleware.protect;
var admin = authMiddleware.admin;
var addShapes = shapesController.addShapes;
var updateShapes = shapesController.updateShapes;
var deletePost = shapesController.deletePost;

// Create api vouchers routes
router.route("/").get(getShapes);
router.route("/:id").get(getPostById);
router.route("/add").post(addShapes);
router.route("/delete").post(protect, admin, deletePost);
router.route("/update").post(updateShapes);

module.exports = router;
