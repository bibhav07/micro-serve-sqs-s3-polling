const axios = require("axios");
const logger = require("./utils/logger");

export async function handleEvent(event) {
    const { type, data } = event;
    logger.info(`Received event of type: ${type}`);

    switch (type) {

        case "user.created":
            logger.info(`Handling user.created event with data: ${JSON.stringify(data)}`);
            // Process user creation logic here
            await axios.post(`${process.env.PRODUCT_SERVICE_URL}/internal/reduce-stock`,
                {
                    productId: data.productId,
                    quantity: data.quantity
                });
            break;

        case "payment.success":
            logger.info(`Handling payment.success event with data: ${JSON.stringify(data)}`);
            // Process payment success logic here
            // await axios.post(`${process.env.ORDER_SERVICE_URL}/internal/create-order`, 
            // {
            //     userId: data.userId,
            //     productId: data.productId,
            //     quantity: data.quantity
            // });
            break;

        default:
            logger.warn(`Unhandled event type: ${type}`);
            break;
    }
}