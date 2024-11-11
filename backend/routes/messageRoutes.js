const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken");
const { addMessage, getMessage } = require("../controllers/messageControllers");
const router = express.Router();

router.post("/add-message",addMessage);
router.get("/messages/:complaintId",getMessage)

module.exports = router