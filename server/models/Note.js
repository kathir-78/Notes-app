const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    user: {
        type: Schema.ObjectId,   // this is used for the only one user data not the othe user data
        ref: 'User' //The ref method in Mongoose is used to create a reference to another model. This allows you to establish relationships between different models in your MongoDB database.
    },
    title: {
        type: String,
        required: true,
      },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Note', NoteSchema);