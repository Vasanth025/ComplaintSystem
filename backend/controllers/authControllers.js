const User = require("../models/userModel.js");
const { generateTokenandSaveCookies } = require("../utilities/generateToken.js");

const SignUp = async(req,res)=>
{
    try { 
    
    const {name,email,password,phone,userType} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email))
    {
        return res.status(400).json({error:"Invalid Email Format"})
    }

    const existingEmail = await User.findOne({email});

    if(existingEmail)
        return res.status(400).json({error:"Email Already Exists"})

    const newUser = new User(
        {
            name,
            email,
            password,
            phone,
            userType
        }
    )


    if(newUser)
    {
        generateTokenandSaveCookies(newUser._id,res);
        await newUser.save();
        return res.status(200).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            phone:newUser.phone,
            userType:newUser.userType
        })
    }else {
        return res.status(400).json({ error: "Invalid user data" });
    }


} catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server error" });
}

}

const login = async(req,res) =>
{
    try {
        const {email,password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email))
        {
            return res.status(400).json({error:"Invalid Email Format"})
        }

        const isUser = await User.findOne({email})

        const isCorrectPassword = isUser.password === password ? true : false

        if(!isCorrectPassword)
            {
                return res.status(400).json({error:"invalid Password"})
            }
    
        generateTokenandSaveCookies(isUser._id, res);

        return res.status(200).json({
            _id:isUser._id,
            name:isUser.name,
            email:isUser.email,
            phone:isUser.phone,
            userType:isUser.userType
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server error" });
    }
}


module.exports = {SignUp,login}