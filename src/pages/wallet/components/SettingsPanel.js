import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export function SettingsPanel({ isOpen, onClose, userName, userRole, userAvatar, onProfileImageChange }) {
    const [profileImage, setProfileImage] = useState(userAvatar || '');
    const [notificationChannel, setNotificationChannel] = useState('ambos');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsAnimating(true), 10);
        }
        else {
            setIsAnimating(false);
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isOpen]);
    const handleImageUpload = (e) => {
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
                const imageUrl = reader.result;
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
            const cambios = [];
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
                toast.success(`Configuración actualizada: ${cambios.join(', ')}`, {
                    position: 'bottom-right',
                    autoClose: 4000,
                });
            }
            else {
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
    if (!shouldRender)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: `fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`, onClick: onClose }), _jsxs("div", { className: `fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#F6F6F6] shadow-2xl z-[101] overflow-y-auto transition-transform duration-300 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`, children: [_jsxs("div", { className: `sticky top-0 bg-gradient-to-r from-[#FDDF65] to-[#f5d74e] px-6 py-8 flex items-center justify-between z-10 shadow-md transition-opacity duration-300 delay-100 ${isAnimating ? 'opacity-100' : 'opacity-0'}`, children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "Ajustes" }), _jsx("button", { onClick: onClose, className: "w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110", "aria-label": "Cerrar ajustes", children: _jsx(X, { className: "w-6 h-6 text-white" }) })] }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("section", { className: `bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-150 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`, children: [_jsx("h3", { className: "text-lg font-bold text-[#262626] mb-5", children: "Perfil" }), _jsx("div", { className: "space-y-4", children: _jsxs("label", { className: "block", children: [_jsx("span", { className: "text-sm text-gray-600 mb-3 block", children: "Selecciona tu imagen de perfil" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0", children: profileImage ? (_jsx("img", { src: profileImage, alt: "Perfil", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400", children: _jsx(Upload, { className: "w-6 h-6" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("input", { type: "file", id: "profile-upload", accept: "image/*", onChange: handleImageUpload, className: "hidden" }), _jsx("label", { htmlFor: "profile-upload", className: "inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-[#262626] hover:bg-gray-50 transition-colors cursor-pointer text-sm", children: "Seleccionar" }), _jsx("p", { className: "text-xs text-gray-400 mt-2 truncate", children: profileImage ? 'imagen-de-perfil.png' : 'Ningún archivo seleccionado' })] })] })] }) })] }), _jsxs("section", { className: `bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-200 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`, children: [_jsx("h3", { className: "text-lg font-bold text-[#262626] mb-3", children: "Notificaciones" }), _jsx("p", { className: "text-xs text-gray-500 mb-5 leading-relaxed", children: "Define el canal de entrega de las notificaciones, ya sea mediante correo electr\u00F3nico o dentro de la aplicaci\u00F3n." }), _jsxs("div", { className: "space-y-3.5", children: [_jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "radio", name: "notification", value: "bandeja", checked: notificationChannel === 'bandeja', onChange: () => setNotificationChannel('bandeja'), className: "w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FDDF65] checked:border-[6px] transition-all cursor-pointer" }) }), _jsx("span", { className: "text-[#262626] text-sm font-medium", children: "Bandeja de notificaciones" })] }), _jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "radio", name: "notification", value: "correo", checked: notificationChannel === 'correo', onChange: () => setNotificationChannel('correo'), className: "w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FDDF65] checked:border-[6px] transition-all cursor-pointer" }) }), _jsx("span", { className: "text-[#262626] text-sm font-medium", children: "Correo Electr\u00F3nico" })] }), _jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "radio", name: "notification", value: "ambos", checked: notificationChannel === 'ambos', onChange: () => setNotificationChannel('ambos'), className: "w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FDDF65] checked:border-[6px] transition-all cursor-pointer" }) }), _jsx("span", { className: "text-[#262626] text-sm font-medium", children: "Ambos" })] })] })] }), _jsxs("section", { className: `bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 delay-300 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`, children: [_jsx("h3", { className: "text-lg font-bold text-[#262626] mb-3", children: "Contrase\u00F1a" }), _jsx("p", { className: "text-xs text-gray-500 mb-5 leading-relaxed", children: "Cambia tu contrase\u00F1a actual por una nueva. Aseg\u00FArate de usar una contrase\u00F1a segura con al menos 8 caracteres." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "current-password", className: "block text-sm text-gray-600 mb-2", children: "Contrase\u00F1a actual" }), _jsx("input", { id: "current-password", type: "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), placeholder: "Contrase\u00F1a actual", className: "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "new-password", className: "block text-sm text-gray-600 mb-2", children: "Nueva contrase\u00F1a" }), _jsx("input", { id: "new-password", type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), placeholder: "Nueva contrase\u00F1a", className: "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDDF65]/50 focus:border-[#FDDF65] transition-all text-[#262626] text-sm placeholder:text-gray-400" })] })] })] })] }), _jsx("div", { className: `sticky bottom-0 bg-[#F6F6F6] px-6 py-6 border-t border-gray-200 transition-all duration-300 delay-150 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`, children: _jsx("button", { onClick: handleSave, className: "w-full py-3.5 bg-[#FDDF65] hover:bg-[#f5d74e] rounded-2xl font-bold text-[#262626] text-base transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]", children: "Guardar" }) })] })] }));
}
