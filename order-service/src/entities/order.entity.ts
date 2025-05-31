import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    productName!: string;

    @Column('decimal')
    amount!: number;

    @Column()
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    
}