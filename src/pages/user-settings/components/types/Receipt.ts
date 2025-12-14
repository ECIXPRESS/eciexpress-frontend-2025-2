import { z } from 'zod';
import { OrderStatus } from './Order';

export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    CASH = 'CASH',
    PAYPAL = 'PAYPAL',
    OTHER = 'OTHER'
}

export enum ReceiptStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

export interface TimeStamps {
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PaymentDetail {
    amount: number;
    currency: string;
    transactionId?: string;
    paymentDate: Date;
    paymentMethod: PaymentMethod;
}

export const paymentDetailSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3),
    transactionId: z.string().optional(),
    paymentDate: z.date(),
    paymentMethod: z.enum(PaymentMethod)
});

export const timeStampsSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().optional()
});

export const receiptSchema = z.object({
    receiptId: z.string(),
    orderId: z.string(),
    clientId: z.string(),
    storeId: z.string(),
    paymentDetail: paymentDetailSchema,
    paymentMethod: z.enum(PaymentMethod),
    receiptStatus: z.enum(ReceiptStatus),
    orderStatus: z.enum(OrderStatus),
    timeStamps: timeStampsSchema
});

export type Receipt = z.infer<typeof receiptSchema>;