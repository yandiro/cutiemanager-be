const { Schema, model } = require('mongoose');

const CutieSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})