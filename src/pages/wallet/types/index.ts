export interface Movement {
  id: string;
  tipo: 'recarga' | 'gasto';
  descripcion: string;
  monto: number;
  fecha: string;
}

export interface WalletData {
  saldo: number;
  nombreUsuario: string;
  numeroTarjeta: string;
  movimientos: Movement[];
}
