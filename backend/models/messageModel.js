const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        complaintId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"complaint",
            required:true
        }
    },{timestamps:true}
)

const Message = mongoose.model("message",messageSchema)
module.exports = Message