import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { PedidosList, FiltrosPedidos, EstadoNavigation as EstadoNavigationPedidos, ValidationModal, SuccessModal, ErrorModal } from './index';
import { mockPedidos } from './mocks/mockPedidos';
export default function QRValidationSellerPage() {
    const [pedidos, setPedidos] = useState(mockPedidos);
    const [filtros, setFiltros] = useState({
        query: '',
        estado: undefined
    });
    const [estadoActivo, setEstadoActivo] = useState('total');
    const [modalValidacionAbierto, setModalValidacionAbierto] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [validatedCode, setValidatedCode] = useState('');
    const [errorType, setErrorType] = useState('qr-invalid');
    const [errorCode, setErrorCode] = useState('');
    const [initialTab, setInitialTab] = useState('qr');
    const handleValidatePedido = (id) => {
        // Abrir el modal de validación en lugar de completar directamente
        setPedidoSeleccionado(id);
        setInitialTab('qr');
        setModalValidacionAbierto(true);
    };
    const handleValidacionExitosa = (codigo) => {
        console.log("Código validado:", codigo);
        // Marcar el pedido como completado
        if (pedidoSeleccionado) {
            setPedidos(pedidos.map(p => p.id === pedidoSeleccionado ? { ...p, estado: "completado" } : p));
        }
        setValidatedCode(codigo);
        setModalValidacionAbierto(false);
        setSuccessModalOpen(true);
    };
    const handleCerrarModal = () => {
        setModalValidacionAbierto(false);
        setPedidoSeleccionado(null);
        setInitialTab('qr');
    };
    const handleCloseSuccess = () => {
        setSuccessModalOpen(false);
        setPedidoSeleccionado(null);
        setValidatedCode('');
    };
    const handleCloseError = () => {
        setErrorModalOpen(false);
        setErrorCode('');
    };
    const handleErrorManualEntry = () => {
        setErrorModalOpen(false);
        setInitialTab('manual');
        setTimeout(() => {
            setModalValidacionAbierto(true);
        }, 300);
    };
    const handleErrorRetry = () => {
        setErrorModalOpen(false);
        setInitialTab('qr');
        setTimeout(() => {
            setModalValidacionAbierto(true);
        }, 300);
    };
    const handleVerDetalles = (id) => {
        console.log("Ver detalles del pedido:", id);
    };
    /**
     * handleEstadoChange - sincroniza el estado activo del header con los filtros
     * mapea las keys del header ('total','pendientes','completados') a los valores
     * de filtros.estado (undefined,'preparacion','completado') para que ambos
     * controles se mantengan sincronizados.
     */
    const handleEstadoChange = (key) => {
        setEstadoActivo(key);
        setFiltros(prev => ({
            ...prev,
            estado: key === 'pendientes' ? 'preparacion' : key === 'completados' ? 'completado' : undefined
        }));
    };
    // Calcular resumen de pedidos
    const resumen = useMemo(() => {
        const total = pedidos.length;
        const pendientes = pedidos.filter(p => p.estado === 'preparacion').length;
        const completados = pedidos.filter(p => p.estado === 'completado').length;
        return { total, pendientes, completados };
    }, [pedidos]);
    // Filtrar pedidos
    const pedidosFiltrados = useMemo(() => {
        return pedidos.filter(p => {
            // Filtro por búsqueda
            if (filtros.query && !p.nombreCliente.toLowerCase().includes(filtros.query.toLowerCase()) &&
                !p.codigo.toLowerCase().includes(filtros.query.toLowerCase())) {
                return false;
            }
            // Filtro por estado
            if (filtros.estado && p.estado !== filtros.estado) {
                return false;
            }
            return true;
        });
    }, [pedidos, filtros]);
    return (_jsxs("div", { className: "p-8 space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-yellow-400", children: "Pedidos" }), _jsx(EstadoNavigationPedidos, { resumen: resumen, estadoActivo: estadoActivo, onEstadoChange: handleEstadoChange }), _jsx(FiltrosPedidos, { filtros: filtros, onFiltrosChange: setFiltros }), _jsx(PedidosList, { pedidos: pedidosFiltrados, onValidarPedido: handleValidatePedido, onVerDetalles: handleVerDetalles }), _jsx(ValidationModal, { isOpen: modalValidacionAbierto, onClose: handleCerrarModal, onSuccess: handleValidacionExitosa, pedidoId: pedidoSeleccionado || '', initialTab: initialTab }), _jsx(SuccessModal, { isOpen: successModalOpen, onClose: handleCloseSuccess, code: validatedCode }), _jsx(ErrorModal, { isOpen: errorModalOpen, onClose: handleCloseError, errorType: errorType, code: errorCode, onManualEntry: handleErrorManualEntry, onRetry: handleErrorRetry })] }));
}
