import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './product.dto';

export const ProductService = {
  createProduct: async (dto: CreateProductDTO) => {
    return await ProductRepository.create(dto);
  },

  getProducts: async () => {
    return await ProductRepository.findAll();
  },
};
