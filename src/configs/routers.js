const UserController = require("../controllers/UserController");
const QuestionController = require("../controllers/QuestionController");

const router = require("express").Router();

router.use("/v1/user", UserController);
router.use("/v1/question", QuestionController);

module.exports = router;
