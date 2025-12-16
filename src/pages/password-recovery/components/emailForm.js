import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";
import StandardInput from "@/lib/input/StandardInput";
import React from "react";
import { useSendVerificationCode } from "@/pages/password-recovery/hooks/useSendVerificationCode";
import { toast } from "react-toastify";
const EmailForm = ({ onEmailSent }) => {
    const [email, setEmail] = React.useState('');
    const { loading, sendVerificationCode } = useSendVerificationCode();
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Por favor ingresa tu correo electrónico");
            return;
        }
        const result = await sendVerificationCode(email);
        if (result?.success) {
            onEmailSent(email);
        }
        else if (result?.error) {
            toast.error(result.error);
        }
    };
    return (_jsxs("div", { className: "w-full h-screen flex flex-col items-center justify-center gap-5 p-16", children: [_jsxs(Link, { className: "flex items-center gap-3 w-full", to: "/auth", children: [_jsx(Undo2, { className: "w-7 h-7 text-[#ffad2a]" }), _jsx("span", { className: "font-bold text-[#ffad2a] text-xl", children: "Volver" })] }), _jsxs("form", { onSubmit: onSubmit, className: "flex flex-col h-[500px] justify-between items-center w-full py-6 rounded-3xl", children: [_jsxs("div", { className: "flex flex-col gap-10 w-full", children: [_jsx("h1", { className: "text-neutral-800 text-[28px] text-center font-arial-rounded", children: "Recupera tu contrase\u00F1a" }), _jsxs("div", { className: "flex flex-col gap-3 w-full", children: [_jsx("h2", { className: "font-bold text-neutral-800 text-lg", children: "Verifica tu correo" }), _jsx("p", { className: "text-neutral-800 text-lg font-normal", children: "Por favor, escribe la direcci\u00F3n de correo electr\u00F3nico con la que te registraste en la aplicaci\u00F3n para continuar." })] }), _jsx(StandardInput, { id: "signin-username", value: email, onChange: setEmail, required: true, placeholder: "Ingresa tu email", type: "email", name: "username" })] }), _jsx("button", { type: "submit", disabled: loading, className: `w-1/3 h-fit bg-[#5AC7E1] border-none py-4 rounded-lg text-white text-xl rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`, children: loading ? 'Enviando...' : 'Enviar' })] })] }));
};
export default EmailForm;
