// Define Mongoose
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Create a new instance of the Mongoose schema to define shape of each document

const thoughtSchema = new Schema({

    // * `thoughtText` 
    //   * String
    //   * Required
    //   * Must be between 1 and 280 characters

    thoughtText: {
        type: String,
        required: true,
        minLength: [1] ,
        maxLength: [280],
        // default: "Must have at least one character!",
    },

    // * `createdAt`
    //   * Date
    //   * Set default value to the current timestamp
    //   * Use a getter method to format the timestamp on query

    createdAt: {
        type: Date,
        default: Date.now,
     
    },


    // * `username` (The user that created this thought)
    //   * String
    //   * Required
    username: {
        type: String,
        required: true,
    },

    // * `reactions` (These are like replies)
    //   * Array of nested documents created with the `reactionSchema`
    reactions: [
       reactionSchema
    ]
},

    {
        toJSON: {
            getters: true,
        }
    },

)

// **Schema Settings**: 

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
    //Refer to Mod 18 Activity 21- Virtuals

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});




// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;




// **Thought**:











