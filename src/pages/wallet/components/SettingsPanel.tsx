import { X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userRole: string;
  userAvatar?: string;
  onProfileImageChange?: (imageUrl: string) => void;
}

export function SettingsPanel({ 
  isOpen, 
  onClose, 
  userName, 
  userRole, 
  userAvatar,
  onProfileImageChange 
}: SettingsPanelProps) {
  const [profileImage, setProfileImage] = useState<string>(userAvatar || '');
  const [notificationChannel, setNotificationChannel] = useState<'bandeja' | 'correo' | 'ambos'>('ambos');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no puede superar los 5MB', {
          position: 'bottom-right',
        });
        return;
      }

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen válido', {
          position: 'bottom-right',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        onProfileImageChange?.(imageUrl);
        
        toast.success('Imagen de perfil actualizada correctamente', {
          position: 'bottom-right',
          autoClose: 2500,
        });
      };
      reader.onerror = () => {
        toast.error('Error al cargar la imagen. Por favor intenta nuevamente', {
          position: 'bottom-right',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Validar contraseñas si se intenta cambiar
    if (newPassword && !currentPassword) {
      toast.error('Debes ingresar tu contraseña actual para cambiarla', {
        position: 'bottom-right',
      });
      return;
    }

    if (newPassword && newPassword.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres', {
        position: 'bottom-right',
      });
      return;
    }

    // Simular guardado de configuración
    toast.info('Guardando configuración...', {
      position: 'bottom-right',
      autoClose: 1500,
    });

    setTimeout(() => {
      const cambios: string[] = [];
      
      if (profileImage && profileImage !== userAvatar) {
        cambios.push('imagen de perfil');
      }
      
      if (notificationChannel) {
        cambios.push('preferencias de notificación');
      }
      
      if (newPassword) {
        cambios.push('contraseña');
      }

      if (cambios.length > 0) {
        toast.success(
          `Configuración actualizada: ${cambios.join(', ')}`,
          {
            position: 'bottom-right',
            autoClose: 4000,
          }
        );
      } else {
        toast.info('No se detectaron cambios en la configuración', {
          position: 'bottom-right',
        });
      }

      console.log('Guardando configuración...', {
        profileImage,
        notificationChannel,
        passwordChanged: !!newPassword
      });
      
      // Limpiar campos de contraseña
      setCurrentPassword('');
      setNewPassword('');
      
      onClose();
    }, 1500);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay con animación */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel lateral con animación de deslizamiento */}
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#F6F6F6] shadow-2xl z-[101] overflow-y-auto transition-transform duration-300 ease-out ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header amarillo con animación de fade */}
        <div className={`sticky top-0 bg-gradient-to-r from-[#FDDF65] to-[#f5d74e] px-6 py-8 flex items-center justify-between z-10 shadow-md transition-opacity duration-300 delay-100 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-white">Ajustes</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
            aria-label="Cerrar ajustes"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Contenido con animación escalonada */}
        <div className="p-6 space-y-6">
          {/* Sección Perfil */}
          <section className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-150 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-lg font-bold text-[#262626] mb-5">Perfil</h3>
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-600 mb-3 block">
                  Selecciona tu imagen de perfil
                </span>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    {profileImage ? (
                      <img src={profileImage} alt="Perfil" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Upload className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-[#262626] hover:bg-gray-50 transition-colors cursor-pointer text-sm"
                    >
                      Seleccionar
                    </label>
                    <p className="text-xs text-gray-400 mt-2 truncate">
                      {profileImage ? 'imagen-de-perfil.png' : 'Ningún archivo seleccionado'}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Sección Notificaciones */}
          <section className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-200 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-lg font-bold text-[#262626] mb-3">Notificaciones</h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Define el canal de entrega de las notificaciones, ya sea mediante correo electrónico o dentro de la aplicación.
            </p>

            <div className="space-y-3.5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="notification"
                    value="bandeja"
                    checked={notificationChannel === 'bandeja'}
                    onChange={() => setNotificationChannel('bandeja')}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FDDF65] checked:border-[6px] transition-all cursor-pointer"
                  />
                </div>
                <span className="text-[#262626] text-sm font-medium">Bandeja de notificaciones</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="notification"
                    value="correo"
                    checked={notificationChannel === 'correo'}
                    onChange={() => setNotificationChannel('correo')}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FDDF65] checked:border-[6px] transition-all cursor-pointer"
                  />
                </div>
                <span className="text-[#262626] text-sm font-medium">Correo Electrónico</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="notification"
                    value="ambos"
                    checked={notificationChannel === 'ambos'}
                    onChange={() => setNotificationChannel('ambos')}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FDDF65] checked:border-[6px] transition-all cursor-pointer"
                  />
                </div>
                <span className="text-[#262626] text-sm font-medium">Ambos</span>
              </label>
            </div>
          </section>

          {/* Sección Contraseña */}
          <section className={`bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-300 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h3 className="text-lg font-bold text-[#262626] mb-3">Contraseña</h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Define el canal de entrega de las notificaciones, ya sea mediante correo electrónico o dentro de la aplicación.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm text-gray-600 mb-2">
                  Contraseña actual
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Contraseña actual"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm text-gray-600 mb-2">
                  Nueva contraseña
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nueva contraseña"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer con animación de slide-up */}
        <div className={`sticky bottom-0 bg-[#F6F6F6] px-6 py-6 border-t border-gray-200 transition-all duration-300 delay-150 ${
          isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-[#FDDF65] hover:bg-[#f5d74e] rounded-2xl font-bold text-[#262626] text-base transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
