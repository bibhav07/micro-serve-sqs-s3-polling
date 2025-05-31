const AWS  = require('aws-sdk');
const axios =  require('axios');
const dotenv =  require('dotenv');

dotenv.config();  

// Initialize SQS
const sqs = new AWS.SQS({
  region: 'ap-south-1', // Change to your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Replace this with your actual queue URL
const QUEUE_URL = process.env.SQS_QUEUE_URL

 const pollMessages = async () => {
  try {
    const response = await sqs.receiveMessage({
      QueueUrl: QUEUE_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20, // Long polling
      VisibilityTimeout: 30,
    }).promise();

    if (!response.Messages || response.Messages.length === 0) {
      console.log(`[${new Date().toISOString()}] No messages received.`);
      return;
    }

    for (const message of response.Messages) {
      try {
        console.log(`Message received at ${new Date().toISOString()}`);
        const body = JSON.parse(message.Body); // SNS wraps payloads
        const actualMessage = JSON.parse(body.Message); // double-parse SNS structure

        console.log('Raw Message Body:', body.MessageAttributes);
        console.log('Parsed Message:', actualMessage);

        // Call product service to reduce quantity
        // await axios.post('http://localhost:4002/product/reduce', {
        //   productId: actualMessage.productId,
        //   quantity: actualMessage.quantity,
        // });


        // Delete message after successful processing
        // await sqs.deleteMessage({
        //   QueueUrl: QUEUE_URL,
        //   ReceiptHandle: message.ReceiptHandle,
        // }).promise();

      } catch (err) {
        console.error('Error processing message:', err);
      }
    }
  } catch (err) {
    console.error('Error polling messages:', err);
  }
};


// Start polling messages every 10 seconds
setInterval(() => {
  console.log(`Polling for messages at ${new Date().toISOString()}`);
  pollMessages();
}, 10000); // Poll every 10 seconds