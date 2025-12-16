import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { toast } from "react-toastify";
import { useVerifySecurityCode } from "@/pages/password-recovery/hooks/useVerifySecurityCode";
export const VerificationCodeForm = ({ email, onCodeVerified }) => {
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);
    const handleInputChange = (index, value) => {
        if (!/^\d$/.test(value) && value !== "")
            return;
        const newCode = [...verificationCode];
        newCode[index] = value.slice(0, 1);
        setVerificationCode(newCode);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData))
            return;
        const newCode = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
        setVerificationCode(newCode);
        const nextEmptyIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextEmptyIndex]?.focus();
    };
    const { verifyCode, loading } = useVerifySecurityCode();
    const handleVerify = async () => {
        const code = verificationCode.join("");
        if (code.length === 6) {
            try {
                const token = await verifyCode(email, code);
                onCodeVerified(token);
            }
            catch (error) {
                console.error("Error al verificar el código:", error);
            }
        }
        else {
            toast.error("El código de verificación debe tener 6 dígitos");
        }
    };
    return (_jsxs("div", { className: "flex flex-col w-full h-screen items-center justify-center gap-5 p-3", children: [_jsxs(Link, { className: "flex items-center gap-3 w-full", to: "/auth", children: [_jsx(Undo2, { className: "w-7 h-7 text-[#ffad2a]" }), _jsx("span", { className: "font-bold text-[#ffad2a] text-xl", children: "Volver" })] }), _jsxs("div", { className: "flex flex-col h-[500px] justify-between items-center w-full py-6 rounded-3xl ", children: [_jsxs("div", { className: "flex flex-col gap-10 w-full", children: [_jsx("h1", { className: "text-neutral-800 text-[28px] text-center", children: "Recupera tu contrase\u00F1a" }), _jsxs("div", { className: "flex flex-col gap-3 w-full", children: [_jsx("h2", { className: "font-bold text-neutral-800 text-lg", children: "C\u00F3digo de verificaci\u00F3n enviado" }), _jsxs("p", { className: "text-neutral-800 text-lg", children: ["Hemos enviado un c\u00F3digo de verificaci\u00F3n a la direcci\u00F3n", " ", _jsx("span", { className: "font-bold", children: email.toLowerCase() })] })] }), _jsx("div", { className: "flex items-center justify-center gap-3 px-5 py-3 w-full", children: verificationCode.map((digit, index) => (_jsx("input", { type: "text", inputMode: "numeric", maxLength: 1, value: digit, onChange: (e) => handleInputChange(index, e.target.value), onKeyDown: (e) => handleKeyDown(index, e), onPaste: handlePaste, className: "w-[60px] h-[70px] bg-[#f1f1f1] rounded-lg border border-[#8b8b8b] text-center text-2xl font-bold text-neutral-800 focus:border-[#5ac7e1] focus:outline-none focus:ring-2 focus:ring-[#5ac7e1] focus:ring-opacity-50", "aria-label": `Dígito ${index + 1} del código de verificación` }, index))) })] }), _jsx("button", { type: "button", onClick: handleVerify, disabled: loading, className: "w-1/3 bg-[#5AC7E1] py-4 rounded-xl text-white text-3xl font-semibold shadow-md cursor-pointer hover:bg-cyan-500 transition-colors", children: loading ? 'Verificando...' : 'Verificar' })] })] }));
};
