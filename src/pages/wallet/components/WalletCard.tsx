interface WalletCardProps {
  saldo: number;
  nombreUsuario: string;
  numeroTarjeta: string;
  onRecargar: () => void;
}

export function WalletCard({ saldo, nombreUsuario, numeroTarjeta, onRecargar }: WalletCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <div className="bg-gradient-to-br from-[#FDDF65] to-[#f5d74e] rounded-3xl p-6 sm:p-8 shadow-lg w-full relative overflow-hidden">
        {/* Decoración con triángulos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 border-8 border-white transform rotate-45"></div>
          <div className="absolute top-20 right-32 w-16 h-16 border-4 border-white transform rotate-12"></div>
          <div className="absolute bottom-10 right-20 w-20 h-20 border-6 border-white transform -rotate-12"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>

          <div className="text-white text-4xl sm:text-5xl font-bold mb-4">
            $ {saldo.toLocaleString('es-CO')}
          </div>

          <div className="text-white font-semibold mb-1 text-sm sm:text-base">
            {nombreUsuario}
          </div>
          
          <div className="text-white text-xs sm:text-sm opacity-90">
            {numeroTarjeta}
          </div>
        </div>
      </div>

      {/* Botón de recarga - Rectangular verde */}
      <button
        onClick={onRecargar}
        className="bg-[#A8E6A3] hover:bg-[#95d98f] rounded-3xl px-8 py-12 sm:py-16 shadow-lg transition-colors self-center sm:self-stretch flex items-center justify-center min-w-[120px] sm:min-w-[140px]"
        aria-label="Recargar billetera"
      >
        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
