const router = require("express").Router();
const {
  getGroups,
  newGroup,
  updateGroup,
} = require("../services/GroupService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newGroup));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateGroup));

/*
 ** 3. Get endpoints
 */

router.get("/", wrapper(getGroups));

module.exports = router;
