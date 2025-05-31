import { AppDataSource } from "../config/db";
import { Order } from "../entities/order.entity";
import { publishOrderPlacedEvent } from "../sns";


export class OrderService {
    static async createOrder (data:any) {
        try {

           const orderRepo = AppDataSource.getRepository(Order);
           const newOrder = orderRepo.create(data);
           console.log("Creating order with data:", newOrder);
           const savedData = await orderRepo.save(newOrder)
           await publishOrderPlacedEvent(savedData); 

        } catch (error) {
            console.error("Error creating order:", error);
            throw new Error("Failed to create order");
        }
    }    
}