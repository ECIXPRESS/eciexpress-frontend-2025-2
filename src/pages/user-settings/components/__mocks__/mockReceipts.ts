import {Receipt, ReceiptStatus, PaymentMethod} from '../types/Receipt';
import {OrderStatus, ProductType} from '../types/Order';

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000;

export const mockReceipts: Receipt[] = [
    {
        receiptId: 'rec_001',
        receiptName: 'Combo Hamburguesa Clásica',
        orderId: 'ord_001',
        clientId: 'user_123',
        storeId: 'store_001',
        paymentDetail: {
            amount: 24900,
            currency: 'COP',
            transactionId: 'txn_001',
            paymentDate: new Date(now.getTime() - (oneDay * 2)),
            paymentMethod: PaymentMethod.CREDIT_CARD
        },
        paymentMethod: PaymentMethod.CREDIT_CARD,
        receiptStatus: ReceiptStatus.COMPLETED,
        orderStatus: OrderStatus.COMPLETED,
        timeStamps: {
            createdAt: new Date(now.getTime() - (oneDay * 2)),
            updatedAt: new Date(now.getTime() - (oneDay * 1.5)),
            deletedAt: undefined
        },
        items: [
            {
                id: 'item_001',
                orderId: 'ord_001',
                productId: 'prod_001',
                productName: 'Combo Hamburguesa Clásica',
                productType: ProductType.FOOD,
                quantity: 1,
                unitPrice: 19900,
                details: 'Sin cebolla, extra queso'
            },
            {
                id: 'item_002',
                orderId: 'ord_001',
                productId: 'prod_002',
                productName: 'Gaseosa Personal',
                productType: ProductType.FOOD,
                quantity: 1,
                unitPrice: 5000,
                details: 'Coca Cola'
            }
        ]
    },
    {
        receiptId: 'rec_002',
        receiptName: 'Pizza Familiar',
        orderId: 'ord_002',
        clientId: 'user_123',
        storeId: 'store_002',
        paymentDetail: {
            amount: 45000,
            currency: 'COP',
            transactionId: 'txn_002',
            paymentDate: new Date(now.getTime() - (oneDay * 5)),
            paymentMethod: PaymentMethod.DEBIT_CARD
        },
        paymentMethod: PaymentMethod.DEBIT_CARD,
        receiptStatus: ReceiptStatus.COMPLETED,
        orderStatus: OrderStatus.COMPLETED,
        timeStamps: {
            createdAt: new Date(now.getTime() - (oneDay * 5)),
            updatedAt: new Date(now.getTime() - (oneDay * 4.5)),
            deletedAt: undefined
        },
        items: [
            {
                id: 'item_003',
                orderId: 'ord_002',
                productId: 'prod_003',
                productName: 'Pizza Familiar',
                productType: ProductType.FOOD,
                quantity: 1,
                unitPrice: 40000,
                details: 'Jamón, champiñones, pimentón'
            },
            {
                id: 'item_004',
                orderId: 'ord_002',
                productId: 'prod_004',
                productName: 'Gaseosa 1.5L',
                productType: ProductType.FOOD,
                quantity: 1,
                unitPrice: 5000,
                details: 'Pepsi'
            }
        ]
    },
    {
        receiptId: 'rec_003',
        receiptName: 'Sushi Roll Mix',
        orderId: 'ord_003',
        clientId: 'user_123',
        storeId: 'store_003',
        paymentDetail: {
            amount: 32000,
            currency: 'COP',
            transactionId: 'txn_003',
            paymentDate: new Date(now.getTime() - (oneDay * 1)),
            paymentMethod: PaymentMethod.CASH
        },
        paymentMethod: PaymentMethod.CASH,
        receiptStatus: ReceiptStatus.PENDING,
        orderStatus: OrderStatus.PENDING,
        timeStamps: {
            createdAt: new Date(now.getTime() - (oneDay * 1)),
            updatedAt: new Date(now.getTime() - (oneDay * 0.8)),
            deletedAt: undefined
        },
        items: [
            {
                id: 'item_005',
                orderId: 'ord_003',
                productId: 'prod_005',
                productName: 'Sushi Roll Mix',
                productType: ProductType.FOOD,
                quantity: 1,
                unitPrice: 30000,
                details: 'Incluye 12 piezas variadas'
            },
            {
                id: 'item_006',
                orderId: 'ord_003',
                productId: 'prod_006',
                productName: 'Té Verde',
                productType: ProductType.FOOD,
                quantity: 1,
                unitPrice: 2000,
                details: 'Caliente'
            }
        ]
    }
];
