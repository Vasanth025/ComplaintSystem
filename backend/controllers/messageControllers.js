const User = require("../models/userModel.js")
const Complaint = require("../models/complaintModel.js");
const AssignedComplaint = require("../models/assignedModel.js");
const Message = require("../models/messageModel.js")

const addMessage = async(req,res) =>
{
    try {
        const {name,message,complaintId} = req.body;
        const newMessage = await Message.create({name,message,complaintId})
        return res.status(200).json({newMessage})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}

const getMessage = async(req,res) =>
{
    try {
        const {complaintId} = req.params;
        const messages = await Message.find({complaintId:complaintId}).sort("-createdAt")
        if(messages.length == 0)
            return res.json({error:"messages not found"})
        return res.status(200).json({messages})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}

module.exports = {addMessage,getMessage}