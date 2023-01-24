const { User, Thought } = require('../models');

module.exports = {
    //* `GET` all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

 //`GET` a single thought by its `_id` and populated thought and friend data -- NEED HELP
 getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId})
    .then((thought) => {
        if(!thought){
            return res.status(404).json({message: "There is no thought with this id!"})
        }
        res.json(thought)
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
    });
 
},

    // * `POST` (create) a new thought:
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                { $push: {thoughts:thought._id}},
                { new: true}
                )
        } ) 
        .then((user) =>{
            if(!user){
                return res.status(404).json({message: "The thought was created but there was no user with this id!"})
            }
            res.json(user)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    },

    // * `PUT` to update a thought by its `_id`
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then ((thought) => 
        !thought
        ? res.status(404).json({ message: "No thought with this id!"})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

        // * `DELETE` to remove thought by its `_id`
        deleteThought(req, res) {
            Thought.findOneAndDelete({ _id:req.params.thoughtId })
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: "No thought with that ID"})
                : Thought.deleteMany({ _id: { $in: User.thoughts}})
            )
            // **BONUS**: Remove a user's associated thoughts when deleted.
            .then(() => res.json({ message: "User and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
        },

        createReaction(req, res){
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: {reactions:req.body}},
                { runValidators: true, new: true}
                )
                .then ((thought) => 
                !thought
                ? res.status(404).json({ message: "No thought with this id!"})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
            },
    };
    