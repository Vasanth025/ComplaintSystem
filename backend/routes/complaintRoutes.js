const express = require("express")
const { authenticateToken } = require("../middleware/authenticateToken")
const { createComplaint, getAllComplaints, getUserComplaints, updateComplaint, agentComplaints } = require("../controllers/complaintController")
const router = express.Router()

router.post("/add-complaint/:userId",authenticateToken,createComplaint)
router.get("/all-complaints",authenticateToken,getAllComplaints)
router.get("/user-complaint/:userId",authenticateToken,getUserComplaints)
router.post("/update-complaint/:complaintId",authenticateToken,updateComplaint)
router.get("/agent-complaints/:agentId",authenticateToken,agentComplaints)

module.exports = router