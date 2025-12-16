import UserHeader from "@/pages/user-settings/components/UserHeader";
import WalletCard from "@/pages/user-settings/components/WalletCard";
import OrderCard from "@/pages/user-settings/components/OrderCard";
import HistorialPanel from "@/pages/user-settings/components/HistorialPanel";
import {
    Order,
    OrderStatus,
    OrderType,
    ProductType,
    Receipt
} from "@/pages/user-settings/components/types";
import {mockReceipts} from "@/pages/user-settings/components/__mocks__/mockReceipts";

export const UserSettings: React.FC = () => {
    const historial: Receipt[] = mockReceipts;

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
                name="Martin Cantor Urrego"
                role="Profesor"
                onSettingsClick={() => console.log('Settings clicked')}
            />

            <div className="flex gap-2.5 p-5 flex-col lg:flex-row lg:flex-1">
                {/* Left Column */}
                <section className="flex flex-col lg:w-2/5 w-full gap-2.5 px-5 py-6">
                    <WalletCard
                        balance={120000}
                        cardholderName="Martin Cantor Urrego"
                        cardNumber="100010012083"
                        onAddFunds={() => console.log('Add funds clicked')}
                    />

                    <h2 className=" text-neutral-800 text-2xl mt-4">
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