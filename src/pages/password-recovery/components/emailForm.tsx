import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";
import StandardInput from "@/lib/input/standarInput";
import React from "react";
import { useSendVerificationCode } from "@/pages/password-recovery/hooks/useSendVerificationCode";
import {toast} from "react-toastify";

interface EmailFormProps {
    onEmailSent: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSent }) => {
    const [email, setEmail] = React.useState('');
    const { loading, sendVerificationCode } = useSendVerificationCode();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Por favor ingresa tu correo electrónico");
            return;
        }

        const result = await sendVerificationCode(email);
        if (result?.success) {
            onEmailSent(email);
        } else if (result?.error) {
            toast.error(result.error);
        }
    };
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-5 p-16">
            <Link
                className="flex items-center gap-3 w-full"
                to="/auth"
            >
                <Undo2 className="w-7 h-7 text-[#ffad2a]"/>
                <span className="font-bold text-[#ffad2a] text-xl">
                    Volver
                </span>
            </Link>

            {/* Form */}
            <form
                onSubmit={onSubmit}
                className="flex flex-col h-[500px] justify-between items-center w-full py-6 rounded-3xl"
            >
                <div className="flex flex-col gap-10 w-full">
                    <h1 className="text-neutral-800 text-[28px] text-center font-arial-rounded">
                        Recupera tu contraseña
                    </h1>

                    <div className="flex flex-col gap-3 w-full">
                        <h2 className="font-bold text-neutral-800 text-lg">
                            Verifica tu correo
                        </h2>
                        <p className="text-neutral-800 text-lg font-normal">
                            Por favor, escribe la dirección de correo electrónico con la que
                            te registraste en la aplicación para continuar.
                        </p>
                    </div>

                    <StandardInput
                        id="signin-username"
                        value={email}
                        onChange={setEmail}
                        required
                        placeholder="Ingresa tu email"
                        type="email"
                        name="username"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-1/3 h-fit bg-[#5AC7E1] border-none py-4 rounded-lg text-white text-xl rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors font-semibold ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};

export default EmailForm;