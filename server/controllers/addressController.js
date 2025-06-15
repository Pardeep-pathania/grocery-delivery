import Address from "../models/Address.js"

// Add address
export const addAddress = async(req, res) => {
    try {
        const userId = req.user.id;
        const address = req.body.address;
        await Address.create({ ...address, userId });
        res.status(201).json({ success: true, message: "Address added successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get addresses
export const getAddress = async(req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await Address.find({ userId });
        return res.status(200).json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}