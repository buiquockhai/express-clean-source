const router = require("express").Router();
const {
  getQuestions,
  getQuestionDetail,
  getFolders,
  getTree,
  newFolder,
  newQuestion,
  updateQuestion,
  updateFolder,
} = require("../services/QuestionService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/folder", wrapper(newFolder));
router.post("/", wrapper(newQuestion));

/*
 ** 2. Update endpoints
 */

router.put("/folder", wrapper(updateFolder));
router.put("/", wrapper(updateQuestion));

/*
 ** 3. Get endpoints
 */

router.get("/folder", wrapper(getFolders));
router.get("/tree", wrapper(getTree));
router.get("/:id", wrapper(getQuestionDetail));
router.get("/", wrapper(getQuestions));

module.exports = router;
