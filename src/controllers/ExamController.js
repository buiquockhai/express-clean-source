const router = require("express").Router();
const { getExams } = require("../services/ExamService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

// router.post("/folder", wrapper(newFolder));
// router.post("/", wrapper(newQuestion));

/*
 ** 2. Update endpoints
 */

// router.put("/folder", wrapper(updateFolder));
// router.put("/", wrapper(updateQuestion));

/*
 ** 3. Get endpoints
 */

// router.get("/", wrapper(getExams));

module.exports = router;
