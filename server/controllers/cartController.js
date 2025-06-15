import User from "../models/User.js";

// update User CartData
export const updateCart = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from auth middleware
        const { cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems });
        res.status(200).json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}