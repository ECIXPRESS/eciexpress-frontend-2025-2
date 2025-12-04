/**
 * Configuración de Vite para ECI Express Frontend
 * Define los alias de importación para simplificar las rutas
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias para componentes compartidos (Header, Container, Card, Badge, etc.)
      '@shared': path.resolve(__dirname, './utils/qr-validation-seller'),
      // Alias para la página de validación QR del vendedor
      '@pages/qr-validation-seller': path.resolve(__dirname, './src/pages/qr-validation-seller'),
    },
  },
})