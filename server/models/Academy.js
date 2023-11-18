const mongoose = require('mongoose')


const AcademySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'provide name'],
    },
    sports: {
        type: [String],
        required: [true, 'enter atleast one sport'],

    },
    state: String,
    city: String,
    contactNo: String,
    address: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },

});

module.exports = mongoose.model('Academy', AcademySchema)