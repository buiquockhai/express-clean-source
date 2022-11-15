const UserController = require("../controllers/UserController");
const QuestionController = require("../controllers/QuestionController");
const PingController = require("../controllers/PingController");
const ExamController = require("../controllers/ExamController");
const GroupController = require("../controllers/GroupController");
const ConfigurationController = require("../controllers/ConfigurationController");
const NotificationController = require("../controllers/NotificationController");

const router = require("express").Router();

router.use("/v1/ping", PingController);
router.use("/v1/user", UserController);
router.use("/v1/question", QuestionController);
router.use("/v1/exam", ExamController);
router.use("/v1/group", GroupController);
router.use("/v1/configuration", ConfigurationController);
router.use("/v1/notification", NotificationController);

module.exports = router;
