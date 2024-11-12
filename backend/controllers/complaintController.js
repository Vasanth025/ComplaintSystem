const User = require("../models/userModel.js")
const Complaint = require("../models/complaintModel.js");
const AssignedComplaint = require("../models/assignedModel.js");

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

const updateComplaint = async(req,res) =>
{
    try {
        const compId = req.params.complaintId;
        const {status} = req.body;

        const complaint = await Complaint.findById(compId)
        if(!complaint)
            return res.status(404).json({error:"complaint not found"})

        const updatedComplaint = await Complaint.findByIdAndUpdate(compId,{status},{new:true})

        const assignedComplaint = await AssignedComplaint.findOneAndUpdate({complaintId:compId},{status},{new:true})

        if(!updatedComplaint && !assignedComplaint)
            return res.status(500).json({error:"complaint not found"})

        return res.status(200).json({updatedComplaint,message:"complaint updated successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}

const agentComplaints = async (req, res) => {
    try {
      const agentId = req.params.agentId;
  
      // Fetch complaints assigned to the agent
      const complaints = await AssignedComplaint.find({ agentId: agentId });
  
      // Extract complaintIds from the complaints
      const complaintIds = complaints.map((comp) => comp.complaintId);
  
      // Fetch complaint details for the complaintIds
      const complaintDetails = await Complaint.find({ _id: { $in: complaintIds } });
  
      // Create a map of complaint details for quick lookup
      const complaintDetailsMap = complaintDetails.reduce((acc, detail) => {
        acc[detail._id.toString()] = detail;
        return acc;
      }, {});
  
      // Merge complaint details into the complaints array
      const updatedComplaints = complaints.map((complaint) => {
        const complaintDetail = complaintDetailsMap[complaint.complaintId.toString()];
  
        // Convert complaint to a plain object and merge complaint details
        return {
          ...complaint.toObject(),
          name: complaintDetail?.name,
          city: complaintDetail?.city,
          state: complaintDetail?.state,
          address: complaintDetail?.address,
          pincode: complaintDetail?.pincode,
          comment: complaintDetail?.comment,
        };
      });
  
      return res
        .status(200)
        .json({ updatedComplaints, message: "Complaints fetched successfully" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
module.exports = {createComplaint,getAllComplaints,getUserComplaints,updateComplaint,agentComplaints}