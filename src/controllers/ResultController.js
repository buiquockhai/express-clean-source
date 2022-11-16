const router = require("express").Router();
const {
  getResults,
  getResultDetail,
  newResult,
  updateResult,
} = require("../services/ResultService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newResult));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateResult));

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getResultDetail));
router.get("/", wrapper(getResults));

module.exports = router;
