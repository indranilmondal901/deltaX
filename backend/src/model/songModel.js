const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    artWork: {
        type: String,
        required: true
    },
    artists:[{
        type:ObjectId,
        ref: 'Artist',
        required:true
    }],
    rating:{
        type: Number,
        default: 0
    }
});

const Songs = mongoose.model("Songs",songSchema);

module.exports = Songs;