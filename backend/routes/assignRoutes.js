const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken");
const { assignComplaints } = require("../controllers/assignedController");
const router = express.Router();

router.post('/assign-complaint',authenticateToken,assignComplaints)

module.exports = router