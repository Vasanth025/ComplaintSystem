const express = require("express")
const router = express.Router();
const  { SignUp, login} = require("../controllers/authControllers.js")

router.post("/signup",SignUp)
router.post("/login", login)


module.exports = router