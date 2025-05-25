import { Router } from 'express';
import { createProduct, getAllProducts, getPresignedUploadUrl } from './product.controller';
import { validateBody } from '../../middlewares/validateDto';
import { createProductSchema } from './product.schema';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();
    // GET  /product
router.post('/', validateBody(createProductSchema), createProduct);         // POST /product
router.get('/',  getAllProducts); 
// router.post('/', authenticate, validateBody(createProductSchema), createProduct);         // POST /product
// router.get('/',authenticate,  getAllProducts); 

export default router;
