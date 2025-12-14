import {z} from 'zod';

export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export enum OrderType {
    PICKUP = "PICKUP",
}

export enum ProductType {
    FOOD = "FOOD",
    STATIONERY = "STATIONERY"
}

export const orderItemSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    productId: z.string(),
    productName: z.string(),
    productType: z.enum(ProductType),
    quantity: z.number().int().positive().default(1),
    unitPrice: z.number().or(z.bigint()).or(z.string()).pipe(z.coerce.number()),
    details: z.string().optional()
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
    userId: z.string(),
    orderType: z.enum(OrderType).default(OrderType.PICKUP),
    status: z.enum(OrderStatus).default(OrderStatus.PENDING),
    items: z.array(orderItemSchema),
    store: z.string(),
    createdAt: z.date().default(() => new Date()),
    scheduledPickup: z.date(),
    pickupLocation: z.string(),
    total: z.number().or(z.bigint()).or(z.string()).pipe(z.coerce.number()),
    trackingCode: z.string(),
    estimatedPreparationTime: z.number().int().positive().optional(),
    specialInstructions: z.string().optional()
});

export type Order = z.infer<typeof orderSchema>;