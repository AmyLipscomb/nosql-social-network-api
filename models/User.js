// Define Mongoose
const { Schema, model } = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({

    // * `username` 
        //   * String
        //   * Unique 
        //   * Required 
        //   * Trimmed 

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

    // * `email`
            //   * String 
            //   * Required 
            //   * Unique 
            //   * Must match a valid email address (look into Mongoose's matching validation) - ASK SARA during session what's a good one
        email: {
        type: String,
        required: true,
        unique: true,
        match: [] //-- need to add regex for match
        //Strings have 'match' validators - https://mongoosejs.com/docs/validation.html
    },

    // * `thoughts` 
        //   * Array of `_id` values referencing the `Thought` model

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],

// * `friends` 
    //   * Array of `_id` values referencing the `User` model (self-reference)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
},


// **Schema Settings**: - NEED HELP!

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

    {
        toObject: {virtuals: true}, toJSON: {virtuals: true}
    },

  
// {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
)


const User = model('user', userSchema);

module.exports = User;

// **User**:

