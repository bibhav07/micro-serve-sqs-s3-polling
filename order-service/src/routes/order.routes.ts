import { FastifyInstance } from 'fastify';
import { OrderController } from '../controllers/order.controller';

export default async function orderRoutes(fastify: FastifyInstance) {
  fastify.post('/orders', OrderController.createOrder);
}
