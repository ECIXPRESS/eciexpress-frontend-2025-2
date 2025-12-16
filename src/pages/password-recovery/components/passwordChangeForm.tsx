import StandardInput from "@/lib/input/standarInput";
import React from "react";
import {toast} from "react-toastify";
import {X, Check} from "lucide-react";

const PasswordChangeForm = () => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const passwordRequeriments = [
        {regex: /^(?=.*[!@#$%^&*]).+$/, message: "Al menos un carácter especial, numero y mayuscula"},
        {regex: /^.{8,}$/, message: "Al menos 8 caracteres"}
    ];

    const validatePassword = (password: string) => {
        return passwordRequeriments.every((requirement) => requirement.regex.test(password));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!validatePassword(password)) {
            toast.error("Contraseña no valida");
        } else if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
        } else {
            toast.success("Contraseña cambiada exitosamente");
        }
        setLoading(false);
    };

    return (
        <div className="w-1/3 h-screen flex flex-col items-center justify-center gap-5 p-16">
            {/* Form */}
            <form className="flex flex-col h-[500px] justify-between items-center w-full py-6 rounded-3xl gap-8">
                <div className="flex flex-col gap-10 w-full">
                    <h1 className="text-neutral-800 text-[28px] text-center font-arial-rounded">
                        Crea tu nueva contraseña
                    </h1>

                    <div className="flex flex-col gap-3 w-full">
                        <p className="text-neutral-800 text-lg font-normal">
                            Por favor completa el siguiente formulario para reestablecer tu contraseña.
                        </p>

                        <h2 className="font-bold text-neutral-800 text-lg">
                            Nueva contraseña
                        </h2>

                        <StandardInput
                            id="signin-username"
                            value={password}
                            onChange={setPassword}
                            required
                            type="password"
                            name="username"
                        />

                        <div className="flex flex-col gap-0 w-full">
                            {passwordRequeriments.map(requirement => (
                                    <p id={requirement.message} className="text-neutral-500 text-sm">
                                        {requirement.message}
                                    </p>
                            ))}
                        </div>

                        <h2 className="font-bold text-neutral-800 text-lg">
                            Confirma contraseña
                        </h2>

                        <StandardInput
                            id="signin-username"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            required
                            type="password"
                            name="username"
                        />
                    </div>


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

export default PasswordChangeForm;

