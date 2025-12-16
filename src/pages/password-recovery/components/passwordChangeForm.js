import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import StandardInput from "@/lib/input/StandardInput";
import React from "react";
import { toast } from "react-toastify";
import { useChangePassword } from "@/pages/password-recovery/hooks/useChangePassword";
const PasswordChangeForm = ({ email, token, onPasswordChanged }) => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { changePassword } = useChangePassword();
    const passwordRequirements = [
        { regex: /^(?=.*[!@#$%^&*])/, message: "Al menos un carácter especial" },
        { regex: /^(?=.*\d)/, message: "Al menos un número" },
        { regex: /^(?=.*[A-Z])/, message: "Al menos una letra mayúscula" },
        { regex: /^.{8,}$/, message: "Al menos 8 caracteres" }
    ];
    const validatePassword = (password) => {
        return passwordRequirements.every((requirement) => requirement.regex.test(password));
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validatePassword(password)) {
            toast.error("Contraseña no valida");
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }
        try {
            await changePassword({
                email: email,
                newPassword: password,
                code: token,
            });
            toast.success("Contraseña cambiada exitosamente");
            onPasswordChanged();
        }
        catch {
            toast.error("Error al cambiar la contraseña");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "w-full h-screen flex flex-col items-center justify-center gap-5 p-16", children: _jsxs("form", { className: "flex flex-col h-[500px] justify-between items-center w-full py-6 rounded-3xl gap-8", children: [_jsxs("div", { className: "flex flex-col gap-10 w-full", children: [_jsx("h1", { className: "text-neutral-800 text-[28px] text-center font-arial-rounded", children: "Crea tu nueva contrase\u00F1a" }), _jsxs("div", { className: "flex flex-col gap-3 w-full", children: [_jsx("p", { className: "text-neutral-800 text-lg font-normal", children: "Por favor completa el siguiente formulario para reestablecer tu contrase\u00F1a." }), _jsx("h2", { className: "font-bold text-neutral-800 text-lg", children: "Nueva contrase\u00F1a" }), _jsx(StandardInput, { id: "signin-username", value: password, onChange: setPassword, required: true, type: "password", name: "username" }), _jsx("div", { className: "flex flex-col gap-0 w-full", children: passwordRequirements.map(requirement => (_jsx("p", { id: requirement.message, className: "text-neutral-500 text-sm", children: requirement.message }))) }), _jsx("h2", { className: "font-bold text-neutral-800 text-lg", children: "Confirma contrase\u00F1a" }), _jsx(StandardInput, { id: "signin-username", value: confirmPassword, onChange: setConfirmPassword, required: true, type: "password", name: "username" })] })] }), _jsx("button", { type: "submit", onClick: onSubmit, disabled: loading, className: "w-1/3 h-fit bg-[#5AC7E1] border-none py-4 rounded-lg text-white text-xl rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors font-semibold", children: "Enviar" })] }) }));
};
export default PasswordChangeForm;
