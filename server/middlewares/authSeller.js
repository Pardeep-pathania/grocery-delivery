import jwt from 'jsonwebtoken';

const authSeller = async(req,res, next) => {
    const { sellerToken } = req.cookies;

    if(!sellerToken){
        return res.status(400).json({success:false, message:"Not authorised! Please Login First"})
    }

    try {
        const verifyToken = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if(verifyToken.email === process.env.SELLER_EMAIL){
            req.body.userId = verifyToken.id
        } else{
            return res.status(400).json({success:false, message:"Not authorised"})
        }
        next()
    } catch (error) {
       return res.status(500).json({success:false, message:error.message})
    }
}
export default authSeller