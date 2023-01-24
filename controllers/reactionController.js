const { User, Thought, Reaction } = require('../models');
const reactionSchema = require('../models/Reaction'); // is this necessary?

module.exports = {
    //* `GET` all reactions
    getReactions(req, res) {
        Reaction.find()
            .then((reaction) => res.json(reaction))
            .catch((err) => res.status(500).json(err));
    },

    //`GET` a single reaction by its `_id` and populated thought and friend data -- NEED HELP
    getSingleReaction(req, res) {
        Reaction.findOne({ _id: req.params.reactionId })

    },

    // * `POST` (create) a new reaction:
    createReaction(req, res) {
        Reaction.create(req.body)
            .then((reaction) => res.json(reaction))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    // * `PUT` to update a reaction by its `_id`
    updateReaction(req, res) {
        Reaction.findOneAndUpdate(
            { _id: req.params.reactionId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: "No reaction with this id!" })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },


    // * `DELETE` to remove reaction by its `_id`
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.reactionId })
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: "No reaction with that ID" })
                    : Reaction.deleteMany({ _id: { $in: User.thoughts } })
            )
            // **BONUS**: Remove a user's associated thoughts when deleted.
            .then(() => res.json({ message: "User and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
    }
};

