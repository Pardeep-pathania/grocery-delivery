
//add address

import Address from "../models/Address.js"

export const addAddress = async(req,res)=>{
    try {
        const {address, userId} = req.body
        await Address.create({...address, userId})
        res.status(201).json({success:true, message:error.message})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false, message:error.message})
    }
}

// get address

export const getAddress = async(req,res) =>{
    try {
        const {userId} = req.body
        const addresses = await Address.find({userId})
        return res.status(200).json({success: true, addresses})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false, message:error.message})
    }
}