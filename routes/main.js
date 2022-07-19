const express = require("express");
const { route } = require("express/lib/router");
const { dashboard, login } = require("../controllers/main");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
