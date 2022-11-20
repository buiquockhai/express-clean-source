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
router.post("/", wrapper(newUser));

/*
 ** 2. Update endpoints
 */
router.put("/password", wrapper(changePassword));
router.put("/", wrapper(updateUser));

/*
 ** 3. Get endpoints
 */

router.get("/detail", wrapper(getUserDetail));
router.get("/freeze", wrapper(getFreezeUsers));
router.get("/force-detail/:id", wrapper(getForceUserDetail));
router.get("/", wrapper(getUsers));

module.exports = router;
