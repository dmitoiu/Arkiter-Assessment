// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// Portfolio (projectController.js) v1.0.0 10/07/2022
// A web application designed for a personal website
// -----------------------------------------------------------------------

// Importing libraries and utilities
var Shapes = require("../models/shapes");
var mongoose = require("mongoose");

/**
 * Register
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addShapes = async (req, res) => {
    try{
        const groupName = req.body.groupName;
        const rects = req.body.rectangles;
        const circles = req.body.circles;
        const stars = req.body.stars;
        const color = req.body.color;
        const shapesGroupExists = await Shapes.findOne({groupName});
        let errorProjectExists = "";
        if(shapesGroupExists){
            if(shapesGroupExists.groupName === groupName){
                errorProjectExists = "Shapes already exists in database,";
            }
            res.json({
                error: errorProjectExists
            });
        } else {
            const shapes = await Shapes.create({
                groupName,
                rects,
                circles,
                stars,
                color
            })
            if(shapes){
                res.status(201).json({
                    _id: shapes._id,
                    shapesGroup: shapes.groupName,
                    rects: shapes.rects,
                    circles: shapes.circles,
                    stars: shapes.stars,
                    color: shapes.color
                })
            } else {
                res.send(404);
            }
        }

    } catch (e) {
        console.log(e);
    }
}

const getPostIndex = async () => {
    const count = await Post.countDocuments();
    let result = (parseInt(count) + 1).toString();
    let format = result.length < 3 ? pad("0" + result, 3) : result
    return format;
}

function pad (data, max) {
    data = data.toString();
    return data.length < max ? pad("0" + data, max) : data;
}

/**
 * Update Project
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateShapes = async (req, res) => {
    try{
        const groupName = req.body.groupName;
        const rects = req.body.rects;
        const circles = req.body.circles;
        const stars = req.body.stars;
        const color = req.body.color;
        const shapes = await Shapes.findOne({groupName: groupName});
        console.log("Shapes: ", req.body);
        console.log("Circles: ", circles);
        if(shapes){
            Shapes.findOneAndUpdate({groupName: groupName}, {
                $set: {
                    "groupName": groupName,
                    "rects": rects,
                    "circles": circles,
                    "stars": stars,
                    "color": color
                }},
                {new: true}, (err, doc) =>{
                    console.log(doc);
                    res.json(doc)
                })
            res.status(200)
        } else {
            res.json({
                error: "Project element is incorrect"
            })
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Reset the post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deletePost = async (req, res) => {
    try{
        const projectName = req.body.name;
        const project = await Post.findOne({name: projectName});
        if(project){
            Post.findOneAndUpdate({name: projectName}, {$set: {"archived": true}},
                {new: true}, (err, doc) =>{
                    console.log(doc);
                    res.json(doc)
                })
            res.status(200)
        } else {
            res.status(401).json({
                error: "Project element is incorrect"
            })
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Retrieves posts data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getShapes = async (req, res) => {
    const shapes = await Shapes.find({});
    res.json(shapes);
}

const getPostById = async (req, res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const project = await Post.findById(req.params.id);
        if(project){
            res.json(project);
        } else {
            res.json({error: "Project not found."});
        }
    } else {
        res.json({error: "Project not found."});
    }
}

module.exports = {addShapes, updateShapes, getShapes, getPostById, deletePost};