// seller login

import jwt from "jsonwebtoken";


export const sellerLogin = async(req,res) =>{
    try {
        const {email, password} = req.body;

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:'7d'})

         res.cookie('sellerToken', token, {
            httpOnly:true,  
            secure: false, 
            sameSite: 'lax', 
            maxAge: 7 * 24 * 60 * 60 *1000 

        })
        return res.status(200).json({success:true, message:"Logged In"})
    }
    } catch (error) {
        console.log(error)

       return res.status(500).json({success: false, message: error.message})
    }
}

// seller isAuth
export const isSellerAuth = async(req,res) =>{
    try {
        
        return res.status(200).json({success:true})
    } catch (error) {
        console.log(error)
         return res.status(500).json({success: false, message: error.message})
    }
}

//logout seller

export const sellerLogout = (req,res)=>{
    try {
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
        })

        return res.status(200).json({success:true, message:"Logged Out"})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}