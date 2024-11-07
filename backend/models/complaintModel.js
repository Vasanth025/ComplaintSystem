const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
        name: {type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true }, 
        comment: { type: String, required: true },
        status: { type: String, required: true , default : "pending" },
    }
)

const Complaint = mongoose.model("complaint", complaintSchema)

module.exports = Complaint;