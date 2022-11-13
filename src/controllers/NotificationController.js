const router = require("express").Router();
const {
  getNotifications,
  newNotification,
} = require("../services/NotificationService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newNotification));

/*
 ** 2. Update endpoints
 */

/*
 ** 3. Get endpoints
 */

router.get("/", wrapper(getNotifications));

module.exports = router;
