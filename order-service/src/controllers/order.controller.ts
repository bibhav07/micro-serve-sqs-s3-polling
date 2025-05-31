import { OrderService } from "../services/order.service";

export class OrderController {
    static async createOrder(req: any, res: any) {
        try {
            const orderData = req.body;
            console.log("Received order data:", orderData);
            // Assuming OrderService.createOrder is defined and imported
            await OrderService.createOrder(orderData);
            res.status(201).send({ message: "Order created successfully" });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: "Failed to create order" });
        }
    }
}