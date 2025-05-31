import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: 'order',
    entities: [__dirname + '/../entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*.{js,ts}'],
    synchronize: true,
    logging: false   
});


export const initDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
        throw error;
    }
}