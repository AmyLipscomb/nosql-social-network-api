const router = require('express').Router();
const userRoutes = require("./userRoute");
const thoughtRoutes = require("./thoughtRoute");
const reactionsRoutes = require("./reactionRoute");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionsRoutes);


module.exports = router;