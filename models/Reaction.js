// **Reaction** (SCHEMA ONLY) <- not sure what this means
const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const reactionSchema = new mongoose.Schema({

// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new ObjectId //not sure if this is correct?
},

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

reactionBody: {
    type: String,
    required: true,
    maxLength: [280]
},

// * `username`
//   * String
//   * Required

username: {
    type: String,
    required: true,
},

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

createdAt: {
    type: Date,
    default: Date.now(),
    toJSON: {
        getters: true,
    }
},
});





