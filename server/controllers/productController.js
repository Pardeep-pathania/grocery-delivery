
import {v2 as cloudinary} from "cloudinary";
import Product from "../models/Product.js";
// Add Product
export const addProduct = async(req,res)=>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        await Product.create({...productData, image:imagesUrl})

        res.json({success:true, message: "Product Added"})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}

//get product
export const productList = async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({success:true, products})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}

//get single product data

export const productById = async(req,res)=>{
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.status(200).json({success:true, product})

    } catch (error) {
         console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}

// change product stock

export const changeStock = async(req,res) =>{
    try {
        const {id, inStock} = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.status(200).json({success:true, message:"Stock Updated"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:error.message})
    }
}