// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// TwitStips (postModel.js) v1.0.0 20/09/2022
// A web application designed for a personal use
// -----------------------------------------------------------------------

// Importing libraries and utilities
var mongoose = require("mongoose");

const rectangleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: false,
        default: 105
    },
    height: {
        type: Number,
        required: false,
        default: 45
    },
    fill: {
        type: String,
        required: false,
        default: "white"
    },
    draggable: {
        type: String,
        required: false,
        default: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

const circleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: false,
        default: 145
    },
    radius: {
        type: Number,
        required: false,
        default: 70
    },
    height: {
        type: Number,
        required: false,
        default: 75
    },
    fill: {
        type: String,
        required: false,
        default: "white"
    },
    draggable: {
        type: String,
        required: false,
        default: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

const starSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: false,
        default: 145
    },
    innerRadius: {
        type: Number,
        required: false,
        default: 15
    },
    height: {
        type: Number,
        required: false,
        default: 75
    },
    fill: {
        type: String,
        required: false,
        default: "white"
    },
    draggable: {
        type: String,
        required: false,
        default: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

// Create user schema
const shapesSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    rects: [rectangleSchema],
    circles: [circleSchema],
    stars: [starSchema],
    color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create User model
const Shapes = mongoose.model("Shapes", shapesSchema);

module.exports = Shapes;