const User = require("../models/userModel.js")

const getAgents = async(req,res) =>
{
    try {
        
        const agent = await User.find({userType:"Agent"})
        if(agent.length == 0)
        {
            return res.json({error: "Agent not Found"})
        }

        return res.status(200).json({agent})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const getUsers = async(req,res)=>
{
    try {
        const user = await User.find({userType:"Ordinary"})
        if(user.length == 0)
        {
            return res.json({error:"User not Found"})
        }

        return res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const getSingleAgent = async(req,res) =>
{
    try {
          const {agentId} = req.params;

          const agent = await User.findOne({agentId})

          if(!agent)
            return res.json({error:"Agent not found"})

          return res.status(200).json(agent)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const deleteUser = async(req,res) =>
{
    try {
        const { userId} = req.params;

        const user = await User.findOne({userId})

        if(!user)
            return res.json({error: "User not found"})

        await User.findByIdAndDelete(userId);

        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const updateUser = async(req,res) =>
{
    try {
        const id = req.params.id;
        const {name,email,phone} = req.body;

        const isUser = await User.findById(id)
        if(!isUser)
            return res.status(404).json({error:'user not found'})

        const updatedUser = await User.findByIdAndUpdate(id,{name,email,phone},{new:true})

        return res.status(200).json({updatedUser,message:"user updated Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = {getAgents,getUsers,getSingleAgent,deleteUser,updateUser}