import { checkifFileExists, generatePresignedUrl, getPresignedImageUrl } from '../../utils/s3';
import { CreateProductInput } from './product.schema';
import { ProductService } from './product.service';
import { Request, Response } from 'express';
import logger from '../../utils/logger';
import cache from '../../utils/cache';


export const createProduct = async (req:any, res:any) => {
  const {name, price, description, imageKey} = req.body as CreateProductInput

  const checkifFileExistsproduct =await checkifFileExists(imageKey);

  if (!checkifFileExistsproduct) {
    return res.status(400).json({ error: 'Image file does not exist, kinldy upload the product file and share image key' });
  };

  await ProductService.createProduct({name, price, description, imageKey});
  logger.info('Product created successfully', { name, price, description, imageKey });
  return res.status(201).json({ product : 'Product created successfully' });
};


export const getAllProducts = async (_req: any, res: any) => {

  const dataFromCache = await cache.get('products');

  if(dataFromCache){
    logger.info('Fetched products from cache', { count: dataFromCache });
    return res.status(200).json({ "fromCache" : true, products: dataFromCache });
  }
  const products = await ProductService.getProducts();

  const productsWithImageUrl = await Promise.all( products.map( async (p) => {
    return { ...p,  imageUrl: await getPresignedImageUrl( p.imageKey! ) };
  } )   )

  cache.set('products', productsWithImageUrl, 60); // Cache for 60 seconds

  logger.info('Fetched all products, data from db', { count: productsWithImageUrl.length });
  return res.status(200).json({"fromCache" : false, productsWithImageUrl });
};




export const getPresignedUploadUrl = async (req: Request, res: Response) => {
  const { filename, contentType } = req.query ;

  if (!filename || !contentType) {
     res.status(400).json({ error: 'Missing filename or contentType' });
     return
  }

  try {
    const { url, key } = await generatePresignedUrl(
      filename as string,
      contentType as string
    );

    logger.info('Generated presigned URL', { filename, contentType, url, key });
     res.json({ uploadUrl: url, key });
     return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate presigned URL' });
    return;
  }
};
