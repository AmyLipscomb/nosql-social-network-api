// const connection = require("../config/connection");
// const { User, Thought } = require('../models');

// connection.on('error', (err) => err);

// connection.once("open", async () => {
//   console.log("connected");

//   // Drop existing friends
//   await User.deleteMany({});

//   // Drop existing thoughts
//   await Thought.deleteMany({});





//   // Log out the seed data to indicate what should appear in the database
// //   console.table(user);
//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// });