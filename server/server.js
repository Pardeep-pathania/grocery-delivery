import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

await connectDB()
await connectCloudinary()

//middleware configuration

app.use(cors({origin: ['http://localhost:5173',
    'https://grocery-delivery-front.vercel.app/'
], credentials: true}))
app.use(express.json());
app.use(cookieParser())

app.get('/',(req,res)=>res.send("API is Working"))

app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)

app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})
