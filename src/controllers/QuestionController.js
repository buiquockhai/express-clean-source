const router = require("express").Router();
const {
  getQuestions,
  getQuestionDetail,
  newFolder,
  getFolders,
  updateFolder,
} = require("../services/QuestionService");
const { wrapper } = require("../util/functions");

router.get("/:id", wrapper(getQuestionDetail));
router.get("/folder", wrapper(getFolders));
router.post("/folder", wrapper(newFolder));
router.put("/folder", wrapper(updateFolder));
router.get("/", wrapper(getQuestions));

module.exports = router;
