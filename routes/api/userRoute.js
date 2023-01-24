const router = require('express').Router();
const {
    getUsers, 
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/userController");
    
// /api/users
router.route("/").get(getUsers).post(createUser)

// http://localhost:3001/api/users/63ce9185b03d0e08ccad91aa
// /api/users/: userId <- In Insomnia, after  ' users/ ' you'll whatever ID you're looking for- in the link above, I'm pulling up 'Amy' . You don't need the ' : '
    //In Insomnia, I changed 'Amy' to 'Cleo'. It works, and then when I do a 'GET' to GET all of the users, I saw that 'Amy' changed to 'Cleo' 

router
    .route("/:userId")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;