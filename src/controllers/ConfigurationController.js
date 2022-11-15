const router = require("express").Router();
const {
  getConfigurations,
  newConfiguration,
  updateConfiguration,
} = require("../services/ConfigurationService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newConfiguration));

/*
 ** 2. Update endpoints
 */

router.put("/", wrapper(updateConfiguration));

/*
 ** 3. Get endpoints
 */

router.get("/", wrapper(getConfigurations));

module.exports = router;
