import {Link, useNavigate} from "react-router-dom";
import {Undo2} from "lucide-react";
import StandardInput from "@/lib/input/standarInput";
import React from "react";

interface EmailFormProps {
    onEmailSent: (email: string) => void;
}

const EmailForm:React.FC<EmailFormProps> = ({onEmailSent}) => {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEmailSent(email);
        setLoading(true);
        navigate('/verificationCode');
        setLoading(false);
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-5 p-16">
            <Link className="flex items-center gap-3 w-full"
                  to="/auth">
                <Undo2 className="w-7 h-7 text-[#ffad2a]"/>
                <span className="font-bold text-[#ffad2a] text-xl">
                        Volver
                    </span>
            </Link>

            {/* Form */}
            <form className="flex flex-col h-[500px] justify-between items-center w-full py-6 rounded-3xl">
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
                    onClick={onSubmit}
                    disabled={loading}
                    className="w-1/3 h-fit bg-[#5AC7E1] border-none py-4 rounded-lg text-white text-xl rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors font-semibold"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default EmailForm;