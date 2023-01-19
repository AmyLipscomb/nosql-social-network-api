// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            // any white space strings will be false or invalid
            validator: function (v) {
                if (v.trim() === 0) {
                    return false;
                }
                return /[A-Za-z0-9\- ]+/.test(v);
                    //regex used - any letter (uppercase or lowercase can be used, can contain numbers 0-9, can include a hyphen, has one or more instances)
            }, message: props => `${props.value} is not a valid username!`

        },

    },

    email: {
        type: String,
        required: true,
        unique: true,
    }
})




// **User**:

// * `username` 
//   * String - added
//   * Unique - added
//   * Required - added
//   * Trimmed - added

// * `email`
//   * String - added
//   * Required - added
//   * Unique - added
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.