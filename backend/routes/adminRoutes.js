const express = require("express")
const router = express.Router()
const {getAgents, getUsers, getSingleAgent, deleteUser, updateUser} = require("../controllers/adminController.js")
const { authenticateToken } = require("../middleware/authenticateToken.js")

router.get("/agents",getAgents)
router.get("/user",getUsers)
router.get("/agent/:agentId",getSingleAgent)
router.delete("/delete-user/:userId",deleteUser)
router.post("/update-user/:id",updateUser)

module.exports = router