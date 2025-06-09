import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoutes.js';
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

await connectDB()
await connectCloudinary()

//Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

//middleware configuration
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/',(req,res)=>res.send("API is Working"))

app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)

app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})
