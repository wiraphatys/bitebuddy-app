const express = require("express");
const router = express.Router();

const {
    getMenus,
} = require('../controllers/MenuController');

router.route("/").get(getMenus);

module.exports = router;