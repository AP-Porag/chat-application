/*
*external imports
*/
const mongoose = require('mongoose');

//create mongoose schema for users
const peopleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);

//create mongoose model with people Schema
const people = mongoose.model('people', peopleSchema);

//export the model
module.exports = people;