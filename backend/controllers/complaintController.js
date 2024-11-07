const User = require("../models/userModel.js")
const Complaint = require("../models/complaintModel.js")

const createComplaint = async(req,res) =>
{
    try {
        const {userId} = req.params;

        const {name,address,city,state,pincode,comment,status} = req.body;

        const id = req.user;
        // console.log("userId",id)

        const user = await User.findById(userId)

        if(!user)
            return res.json({error:"User not found"})

        const complaint = await Complaint.create({userId : userId, name,address,city,state,pincode,comment,status });

        return res.status(200).json({complaint})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}

const getAllComplaints = async(req,res) =>
{
    try {
        const complaints = await Complaint.find();
        if(complaints.length == 0)
            return res.json({error : "No Complaints Recorded"})

        return res.status(200).json({complaints})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}

const getUserComplaints = async(req,res) =>
{
    try {
        const { userId} = req.params;
        const user = await User.findOne({_id:userId})
        if(!user)
            return res.status(404).json({error:"User not found"})

        const complaints = await Complaint.find({userId:userId})

        if(complaints.length == 0)
            return res.json({error : "No Complaints Recorded"})

        return res.status(200).json({complaints})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}

module.exports = {createComplaint,getAllComplaints,getUserComplaints}