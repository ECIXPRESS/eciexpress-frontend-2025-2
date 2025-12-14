import StandardInput from "@/lib/input/standarInput";
import React from "react";
import {toast} from "react-toastify";
import {useChangePassword} from "@/pages/password-recovery/hooks/useChangePassword";

interface PasswordChangeFormProps {
    email: string;
    token: string;
    onPasswordChanged: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({email, token, onPasswordChanged}) => {
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

    const validatePassword = (password: string) => {
        return passwordRequirements.every((requirement) => requirement.regex.test(password));
    };

    const onSubmit = async (e: React.FormEvent) => {
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
                password,
                token: token,
            });
            toast.success("Contraseña cambiada exitosamente");
            onPasswordChanged();
        } catch {
            toast.error("Error al cambiar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-5 p-16">
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
                            {passwordRequirements.map(requirement => (
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

