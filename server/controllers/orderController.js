import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Razorpay from "razorpay";

// placeorder COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    //calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax Charge(2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res
      .status(201)
      .json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// placeorder Razor

export const placeOrderRazor = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { items, address } = req.body; // items: [{product, quantity}], address: addressId

    if (!address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      if (!product) throw new Error("Product not found");
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax Charge (2%)
    amount += Math.floor(amount * 0.02);

    // 1. Create Razorpay order
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `rcptid_${Date.now()}`,
    };

    const razorpayOrder = await instance.orders.create(options);

    // 2. Save order in DB with status "pending"
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      razorpayOrderId: razorpayOrder.id,
      status: "paid",
      isPaid: true
    });

    // 3. Return Razorpay order info and your order ID
    res.status(201).json({
      success: true,
      razorpayOrder,
      orderId: order._id,
      amount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Orders By User Id
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not logged in" });
    }
    const orders = await Order.find({ userId })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all Orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product address");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
