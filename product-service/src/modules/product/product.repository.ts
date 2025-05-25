import { PrismaClient } from "@prisma/client";
import {  CreateProductDTO } from "./product.dto";

const prisma = new PrismaClient();

export const ProductRepository = {
  create: async (data: CreateProductDTO) => {
    return prisma.product.create({ data });
  },
  findAll: async () => {
    return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  },
};