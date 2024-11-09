const mongoose = require("mongoose")

const assignedSchema = new mongoose.Schema(
    {
        agentId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        complaintId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        agentName:{
            type:String,
            required:true
        }
    }
)

const AssignedComplaint = mongoose.model("assigned-complaint",assignedSchema)

module.exports = AssignedComplaint;