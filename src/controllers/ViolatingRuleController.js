const router = require("express").Router();
const {
  getViolatingRules,
  getViolatingRuleDetail,
  newViolatingRule,
  updateViolatingRule,
} = require("../services/ViolatingRuleService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newViolatingRule));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateViolatingRule));

/*
 ** 3. Get endpoints
 */

router.get("/:id", wrapper(getViolatingRuleDetail));
router.get("/", wrapper(getViolatingRules));

module.exports = router;
