const express = require("express")
const { authenticateToken } = require("../middleware/authenticateToken")
const { createComplaint, getAllComplaints, getUserComplaints, updateComplaint, agentComplaints } = require("../controllers/complaintController")
const router = express.Router()

router.post("/add-complaint/:userId",createComplaint)
router.get("/all-complaints",getAllComplaints)
router.get("/user-complaint/:userId",getUserComplaints)
router.post("/update-complaint/:complaintId",updateComplaint)
router.get("/agent-complaints/:agentId",agentComplaints)

module.exports = router