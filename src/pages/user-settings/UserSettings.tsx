import UserHeader from "@/pages/user-settings/components/UserHeader";
import WalletCard from "@/pages/user-settings/components/WalletCard";
import OrderCard from "@/pages/user-settings/components/OrderCard";
import HistorialPanel from "@/pages/user-settings/components/HistorialPanel";
import {
    Order,
    OrderStatus,
    OrderType,
    PaymentMethod, ProductType,
    Receipt,
    ReceiptStatus
} from "@/pages/user-settings/components/types";

export const UserSettings: React.FC = () => {
    const historial: Receipt[] = [
        {
            receiptId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
            orderId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
            clientId: "user-12345-67890-abcde-fghij",
            storeId: "store-12345-67890-abcde-fghij",
            paymentDetail: {
                amount: 15.99,
                currency: "USD",
                transactionId: "txn_1234567890",
                paymentDate: new Date("2025-12-14T12:30:00"),
                paymentMethod: PaymentMethod.DEBIT_CARD
            },
            paymentMethod: PaymentMethod.DEBIT_CARD,
            receiptStatus: ReceiptStatus.COMPLETED,
            orderStatus: OrderStatus.COMPLETED,
            timeStamps: {
                createdAt: new Date("2025-12-14T12:00:00"),
                updatedAt: new Date("2025-12-14T12:30:00")
            }
        },
        {
            receiptId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
            orderId: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
            clientId: "user-12345-67890-abcde-fghij",
            storeId: "store-23456-78901-bcdef-ghijk",
            paymentDetail: {
                amount: 12.50,
                currency: "USD",
                paymentDate: new Date("2025-12-13T19:15:00"),
                paymentMethod: PaymentMethod.DEBIT_CARD
            },
            paymentMethod: PaymentMethod.DEBIT_CARD,
            receiptStatus: ReceiptStatus.COMPLETED,
            orderStatus: OrderStatus.COMPLETED,
            timeStamps: {
                createdAt: new Date("2025-12-13T19:00:00"),
                updatedAt: new Date("2025-12-13T19:15:00")
            }
        },
        {
            receiptId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
            orderId: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
            clientId: "user-12345-67890-abcde-fghij",
            storeId: "store-34567-89012-cdefg-hijkl",
            paymentDetail: {
                amount: 18.75,
                currency: "USD",
                paymentDate: new Date("2025-12-12T13:45:00"),
                paymentMethod: PaymentMethod.CASH
            },
            paymentMethod: PaymentMethod.CASH,
            receiptStatus: ReceiptStatus.REFUNDED,
            orderStatus: OrderStatus.CANCELLED,
            timeStamps: {
                createdAt: new Date("2025-12-12T13:30:00"),
                updatedAt: new Date("2025-12-12T14:00:00")
            }
        }
    ];

    const upcomingOrders: Order[] = [
        {
            userId: "user-12345-67890-abcde-fghij",
            orderType: OrderType.PICKUP,
            status: OrderStatus.PENDING,
            items: [
                {
                    id: "item-12345",
                    orderId: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
                    productId: "prod-12345",
                    productName: "Combo Hamburguesa",
                    productType: ProductType.FOOD,
                    quantity: 1,
                    unitPrice: 15.99,
                    details: "Sin cebolla, con queso extra"
                }
            ],
            store: "Reggio",
            createdAt: new Date(),
            scheduledPickup: new Date(Date.now() + 30 * 60 * 1000),
            pickupLocation: "Mostrador principal",
            total: 15.99,
            trackingCode: "REG123456",
            estimatedPreparationTime: 15,
            specialInstructions: "Por favor empaquetar para llevar"
        }
    ];

    return (
        <main className="flex flex-col flex-1 bg-snow rounded-3xl overflow-hidden">
            <UserHeader
                name="Katherin Silva Granados"
                role="Estudiante"
                onSettingsClick={() => console.log('Settings clicked')}
            />

            <div className="flex gap-2.5 p-5 flex-1">
                {/* Left Column */}
                <section className="flex flex-col w-[500px] gap-2.5 px-5 py-6">
                    <WalletCard
                        balance={120000}
                        cardholderName="Katerine Silva Granados"
                        cardNumber="100010012083"
                        onAddFunds={() => console.log('Add funds clicked')}
                    />

                    <h2 className="font-['Arial_Rounded_MT_Bold'] text-neutral-800 text-2xl mt-4">
                        Proximos pedidos
                    </h2>

                    <div className="flex flex-col gap-3 flex-1">
                        {upcomingOrders.map((order) => (
                            <OrderCard
                                key={order.trackingCode}
                                order={order}
                                onViewDetails={() => console.log('View order:', order.trackingCode)}
                            />
                        ))}
                    </div>
                </section>
                <HistorialPanel historial={historial}/>
            </div>
        </main>
    );
};

