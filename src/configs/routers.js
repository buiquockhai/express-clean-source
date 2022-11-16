const UserController = require("../controllers/UserController");
const QuestionController = require("../controllers/QuestionController");
const PingController = require("../controllers/PingController");
const ExamController = require("../controllers/ExamController");
const GroupController = require("../controllers/GroupController");
const MarkController = require("../controllers/MarkController");
const ResultController = require("../controllers/ResultController");
const RoomController = require("../controllers/RoomController");
const ViolatingRuleController = require("../controllers/ViolatingRuleController");
const ConfigurationController = require("../controllers/ConfigurationController");
const NotificationController = require("../controllers/NotificationController");

const router = require("express").Router();

router.use("/v1/ping", PingController);
router.use("/v1/user", UserController);
router.use("/v1/question", QuestionController);
router.use("/v1/exam", ExamController);
router.use("/v1/group", GroupController);
router.use("/v1/mark", MarkController);
router.use("/v1/result", ResultController);
router.use("/v1/room", RoomController);
router.use("/v1/violating", ViolatingRuleController);
router.use("/v1/configuration", ConfigurationController);
router.use("/v1/notification", NotificationController);

module.exports = router;
