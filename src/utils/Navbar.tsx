import {Bell, LayoutDashboard, MessageSquare, ShoppingCart, Clipboard} from 'lucide-react';

const Navbar = () => {
    return (
        <div className="flex flex-col justify-between items-center p-4 bg-foreground">
            <div className="flex justify-between items-center w-full">
                <header className="flex items-center gap-4">
                    <button className="rounded-full overflow-hidden h-12 w-12">
                        <img src="" alt="" />
                    </button>
                    <button className="flex flex-col">
                        <Bell className="w-5 h-5" />
                    </button>
                </header>

                <div className="flex items-center gap-2">
                    <nav className="w-full flex gap-4">
                        <button className="flex flex-col">
                            <LayoutDashboard className="w-5 h-5"/>
                            <span className="text-xs text-foreground ">Dashboard</span>
                        </button>
                    </nav>
                    <nav className="w-full flex gap-4">
                        <button className="flex flex-col">
                            <ShoppingCart className="w-5 h-5"/>
                            <span className="text-xs text-foreground ">Carrito de compras</span>
                        </button>
                    </nav>
                    <nav className="w-full flex gap-4">
                        <button className="flex flex-col">
                            <Clipboard className="w-5 h-5"/>
                            <span className="text-xs text-foreground ">Pedidos</span>
                        </button>
                    </nav>
                    <nav className="w-full flex gap-4">
                        <button className="flex flex-col">
                            <MessageSquare className="w-5 h-5"/>
                            <span className="text-xs text-foreground ">Chat</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;