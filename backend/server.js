const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const authRoutes = require("./routes/authRoutes.js")
const adminRoutes = require("./routes/adminRoutes.js")
const compRoutes = require("./routes/complaintRoutes.js")
const assignRoutes = require("./routes/assignRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const cookieParser = require("cookie-parser")
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/comp",compRoutes)
app.use("/api/comp",assignRoutes)
app.use("/api/mesg",messageRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database Connected Successfully"))
.catch((err)=>console.log(err))


app.listen(process.env.PORT,()=>{console.log(`server is connected at port ${process.env.PORT}`)})
