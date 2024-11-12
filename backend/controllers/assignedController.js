const User = require("../models/userModel.js")
const Complaint = require("../models/complaintModel.js")
const AssignedComplaint = require("../models/assignedModel.js")

const assignComplaints = async (req, res) => {
    try {
      const { agentId, complaintId, agentName, status } = req.body;
      
      // Find the complaint and update its status to 'assigned' (or another status)
      const complaint = await Complaint.findById(complaintId);
  
      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
  
      // Update the complaint's status and assign the agent
      complaint.status = 'assigned'; // You can choose other statuses like 'in-progress'
      complaint.agentId = agentId;
      complaint.agentName = agentName;
  
      await complaint.save();
  
      // Create an entry in the AssignedComplaint collection
      await AssignedComplaint.create({ agentId, complaintId, agentName, status });
  
      return res.status(201).json({ message: 'Complaint assigned successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = {assignComplaints}