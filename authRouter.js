const Router = require("express");
const authController = require("./AuthController");

const {check} = require("express-validator");

const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

const router = new Router();

router.post(
  "/registration", 
  [
    check('username', "Username cannot be empty").notEmpty(),
    check('password', "Password should be more than 4 characters and less than 10").isLength({min:4, max:10})
  ],
 authController.registration
);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

module.exports = router;
