const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken");
const { addMessage, getMessage } = require("../controllers/messageControllers");
const router = express.Router();

router.post("/add-message",authenticateToken,addMessage);
router.get("/messages/:complaintId",authenticateToken,getMessage)

module.exports = router