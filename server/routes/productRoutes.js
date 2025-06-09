import express from 'express';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import { upload } from '../config/multer.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array('images'),authSeller,addProduct)

productRouter.get('/list',productList)
productRouter.get('/id',productById)
productRouter.get('/stock',authSeller, changeStock)

export default productRouter;