const { User, Thought } = require('../models');

module.exports = {
    //* `GET` all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    //`GET` a single user by its `_id` and populated thought and friend data 
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})

    },

    // * `POST` (create) a new user:
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json (user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    },

    // * `PUT` to update a user by its `_id`
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then ((user) => 
        !user
        ? res.status(404).json({ message: "No user with this id!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // * `DELETE` to remove user by its `_id`
    deleteUser(req, res) {
        User.findOneAndDelete({ _id:req.params.userId })
        .then((user) =>
        !user
            ? res.status(404).json({ message: "No user with that ID"})
            : Thought.deleteMany({ _id: { $in: user.thoughts}})
        )
        // **BONUS**: Remove a user's associated thoughts when deleted.
        .then(() => res.json({ message: "User and thoughts deleted!" }))
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: {friends:req.params.friendId}},
            { new: true}
        )
        .then ((user) => {
            !user
            ? res.status(404).json({ message: "No user with this id!"})
            : res.json(user)
        }) 
        .catch((err) => res.status(500).json(err));

    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: {friends:req.params.friendId}},
            { new: true}
        )
        .then ((user) => {
            !user
            ? res.status(404).json({ message: "No user with this id!"})
            : res.json(user)
        }) 
        .catch((err) => res.status(500).json(err));
    }

};





// **`/api/users`**

// * `GET` all users

// * `GET` a single user by its `_id` and populated thought and friend data

// * `POST` a new user:

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```

// * `PUT` to update a user by its `_id`

// * `DELETE` to remove user by its `_id`

// **BONUS**: Remove a user's associated thoughts when deleted.