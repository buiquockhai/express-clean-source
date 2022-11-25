const router = require("express").Router();
const {
  getToken,
  getUsers,
  getUserDetail,
  getForceUserDetail,
  updateUser,
  newUser,
  changePassword,
  getFreezeUsers,
} = require("../services/UserService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/login", wrapper(getToken, { ignoreAuth: true }));
router.post("/", wrapper(newUser, { ignoreAuth: true }));

/*
 ** 2. Update endpoints
 */
router.put("/password", wrapper(changePassword));
router.put("/", wrapper(updateUser));

/*
 ** 3. Get endpoints
 */

router.get("/freeze", wrapper(getFreezeUsers));
router.get("/:id", wrapper(getUserDetail));
router.get("/", wrapper(getUsers));

module.exports = router;
