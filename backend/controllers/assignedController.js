const User = require("../models/userModel.js")
const Complaint = require("../models/complaintModel.js")
const AssignedComplaint = require("../models/assignedModel.js")

const assignComplaints = async(req,res) =>
{
    try {
        const {agentId,complaintId,status,agentName} = req.body
        const complaint = await AssignedComplaint.create({agentId,complaintId,status,agentName})
        return res.status(201).json({message:"complaint assigned successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {assignComplaints}