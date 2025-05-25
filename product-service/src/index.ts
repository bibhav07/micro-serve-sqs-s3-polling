import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './modules/product/product.router';
import { getPresignedUploadUrl } from './modules/product/product.controller';
import { zodErrorHandler } from './middlewares/zodError.middleware';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);
app.get("/upload-url", getPresignedUploadUrl)


app.use((err : any, req : any, res : any, next : any) => {
  zodErrorHandler(err, req, res, next);
})

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});