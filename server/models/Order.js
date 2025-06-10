import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
        ref:'user'
    },
    items:[{
        product:{
            type:String,
            required:true,
            ref:'product'
        },
        quantity:{
            type:Number,
            required:true,
        }
    }],
    amount:{
        type:Number,
        requird: true
    },
    address:{
        type:String,
        requird: true,
        ref: 'address'
    },
    status:{
        type:String,
        default: 'Order Placed'
    },
    paymentType:{
        type:String,
        requird: true
    },
    isPaid:{
        type:Boolean,
        requird: true,
        default:false
    }
},{timestamps:true})

const Order = mongoose.model.order || mongoose.model('model',orderSchema)

export default Order