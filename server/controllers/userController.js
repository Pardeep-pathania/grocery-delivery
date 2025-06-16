import bcryptjs from "bcryptjs"
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Register user
export const register = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false, message:"missing details"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false, message:"User already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password,10)
        const user = await User.create({name, email, password:hashedPassword})

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"})

        res.cookie('token', token, {
            httpOnly:true,   //prevent js to access cookie
            secure: false, 
            sameSite: 'lax', 
            maxAge: 7 * 24 * 60 * 60 *1000 //cookie expiration

        })
        return res.status(201).json({success:true, user:{email:user.email, name:user.name}})

    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

//login user
export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message:'Email and password are required'})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({success: false, message:'Invalid Email or password'})
        }

        const isMatch = await bcryptjs.compareSync(password, user.password)

        if(!isMatch){
             return res.status(400).json({success: false, message:'Invalid Email or password'})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"})

        res.cookie('token', token, {
            httpOnly:true,  
            secure: false, 
            sameSite: 'lax', 
            maxAge: 7 * 24 * 60 * 60 *1000 

        })
        return res.status(200).json({success:true, user:{email:user.email, name:user.name}})


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}

//check Auth

export const isAuth = async(req,res)=>{
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password")

        return res.status(200).json({success:true, user})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}

//logout user

export const logout = (req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure: false,
            sameSite:'lax',
        })

        return res.status(200).json({success:true, message:"Logged Out"})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}