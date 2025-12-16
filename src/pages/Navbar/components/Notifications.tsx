import {Bell, CheckCircle2, Package} from "lucide-react";
import {useEffect, useRef} from "react";

export interface Notification {
    id: string;
    icon: 'success' | 'delivery';
    title: string;
    description: string;
    time: string;
}

interface NotificationsPanelProps {
    notifications: Notification[];
    onClose: () => void;
}

const NotificationsPanel = ({ notifications, onClose }: NotificationsPanelProps) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const getNotificationIcon = (type: 'success' | 'delivery') => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5 text-green-600" />;
            case 'delivery':
                return <Package className="w-5 h-5 text-blue-600" />;
            default:
                return <Bell className="w-5 h-5 text-gray-600" />;
        }
    };

    return (
        <div
            ref={panelRef}
            className="fixed top-16 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
        >
            <header className="flex items-center p-5 bg-white border-b border-gray-100">
                <h1 className="text-2xl font-semibold text-gray-500">
                    Notificaciones
                </h1>
            </header>
            <main className="flex flex-col gap-2 p-4 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <Bell className="w-12 h-12 mb-2 opacity-50" />
                        <p className="text-sm">No tienes notificaciones</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <article
                            key={notification.id}
                            className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
                        >
                            <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                                {getNotificationIcon(notification.icon)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-bold text-gray-800 mb-1">
                                    {notification.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {notification.description}
                                </p>
                            </div>
                            <time className="flex-shrink-0 text-sm text-gray-400">
                                {notification.time}
                            </time>
                        </article>
                    ))
                )}
            </main>
        </div>
    );
};

export default NotificationsPanel;