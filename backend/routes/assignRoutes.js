const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken");
const { assignComplaints } = require("../controllers/assignedController");
const router = express.Router();

router.post('/assign-complaint',assignComplaints)

module.exports = router