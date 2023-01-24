const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought)

router
    .route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction)
     //whatever i create in my thought controller will be in the parentheses
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction); 
    //whatever i create in my thought controller will be in the parentheses

module.exports = router;