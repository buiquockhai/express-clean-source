const router = require("express").Router();
const { getToken, getUser } = require("../services/UserService");
const { wrapper } = require("../util/functions");

router.post("/login", wrapper(getToken, { ignoreAuth: true }));

router.get("/user", wrapper(getUser));

module.exports = router;
