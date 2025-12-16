export const mockWalletData = {
    saldo: 0,
    nombreUsuario: 'Katerine Silva Granados',
    numeroTarjeta: '100010012083',
    movimientos: [
        {
            id: '1',
            tipo: 'gasto',
            descripcion: 'Combo Hamburguesa',
            monto: -15000,
            fecha: '12/05'
        },
        {
            id: '2',
            tipo: 'gasto',
            descripcion: 'Pasta Boloñesa',
            monto: -18000,
            fecha: '07/05'
        },
        {
            id: '3',
            tipo: 'gasto',
            descripcion: 'Pastel de carne',
            monto: -12000,
            fecha: '07/05'
        },
        {
            id: '4',
            tipo: 'recarga',
            descripcion: 'Recarga',
            monto: 50000,
            fecha: '02/05'
        }
    ]
};
export const mockProximosPedidos = [
    {
        id: '1',
        titulo: 'Combo hamburguesa',
        vendedor: 'Reggio',
        estado: 'pendiente',
        tiempoEstimado: 'Pagado - Recoge en 10:32 min'
    }
];
