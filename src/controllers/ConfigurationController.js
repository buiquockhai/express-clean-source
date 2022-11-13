const router = require("express").Router();
const {
  getConfigurations,
  newConfiguration,
} = require("../services/ConfigurationService");
const { wrapper } = require("../util/functions");

/*
 ** 1. Create endpoints
 */

router.post("/", wrapper(newConfiguration));

/*
 ** 2. Update endpoints
 */

/*
 ** 3. Get endpoints
 */

router.get("/", wrapper(getConfigurations));

module.exports = router;
