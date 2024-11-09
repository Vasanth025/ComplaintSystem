const express = require("express")
const router = express.Router()
const {getAgents, getUsers, getSingleAgent, deleteUser, updateUser} = require("../controllers/adminController.js")
const { authenticateToken } = require("../middleware/authenticateToken.js")

router.get("/agents",authenticateToken,getAgents)
router.get("/user",authenticateToken,getUsers)
router.get("/agent/:agentId",authenticateToken,getSingleAgent)
router.delete("/delete-user/:userId",authenticateToken,deleteUser)
router.post("/update-user/:id",authenticateToken,updateUser)

module.exports = router