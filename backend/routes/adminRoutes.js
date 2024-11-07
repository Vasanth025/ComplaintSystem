const express = require("express")
const router = express.Router()
const {getAgents, getUsers, getSingleAgent, deleteUser} = require("../controllers/adminController.js")
const { authenticateToken } = require("../middleware/authenticateToken.js")

router.get("/agents",authenticateToken,getAgents)
router.get("/user",authenticateToken,getUsers)
router.get("/agent/:agentId",authenticateToken,getSingleAgent)
router.delete("/delete-user/:userId",authenticateToken,deleteUser)

module.exports = router