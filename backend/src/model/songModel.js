const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
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
        required: true
    }
});

const Songs = mongoose.model("Songs",songSchema);

module.exports = Songs;