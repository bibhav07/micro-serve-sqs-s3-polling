import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const sns = new AWS.SNS({
    region: 'ap-south-1', // Change to your region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


export const publishOrderPlacedEvent = async (savedData: any) => {
    try {
        await sns.publish({
            TopicArn: process.env.AWS_SNS_TOPIC_ARN, // Ensure this environment variable is set
            Message: JSON.stringify({ neworderData: savedData }),
            MessageAttributes: {
                event: {
                    DataType: 'String',
                    StringValue: 'order.placed',
                },
            },
        }).promise();

    } catch (error) {
        console.error('Error publishing order placed event:', error);
        throw new Error('Failed to publish order placed event');
    }
};

