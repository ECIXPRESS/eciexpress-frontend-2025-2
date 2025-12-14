import React from 'react';
import logotipo from '@/assets/logotipo.svg';
import StandardInput from '@/lib/input/standarInput';

interface SignUpFormProps {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (password: string) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
                                                   name,
                                                   setName,
                                                   email,
                                                   setEmail,
                                                   password,
                                                   setPassword,
                                                   confirmPassword,
                                                   setConfirmPassword,
                                                   loading,
                                                   onSubmit,
                                                   onSwitchToLogin
                                               }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div
                className="w-full h-full flex flex-col justify-center items-center px-2">
                {/* Logo */}
                <div className="flex items-center justify-center mb-4">
                    <img
                        className="w-96 h-12 object-contain"
                        alt="Logotipo ECIEXPRESS"
                        src={logotipo}
                    />
                </div>

                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-arial-rounded text-center mb-2">
                    Crear cuenta
                </h1>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="w-full flex flex-col gap-2 items-cente   r p-4"
                >
                    <div className="w-full flex flex-col gap-1 md:gap-3">
                        <label
                            htmlFor="signup-name"
                            className="text-gray-600 font-semibold md:text-lg"
                        >
                            Nombre completo
                        </label>
                        <StandardInput
                            id="signup-name"
                            value={name}
                            onChange={setName}
                            required
                            placeholder="Ingresa tu nombre completo"
                            type="text"
                            name="name"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1 md:gap-3">
                        <label
                            htmlFor="signup-email"
                            className="text-gray-600 font-semibold md:text-lg"
                        >
                            Correo institucional
                        </label>
                        <StandardInput
                            id="signup-email"
                            value={email}
                            onChange={setEmail}
                            required
                            placeholder="correo institucional"
                            type="email"
                            name="email"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1 md:gap-3">
                        <label
                            htmlFor="signup-password"
                            className="text-gray-600 font-semibold md:text-lg"
                        >
                            Contraseña
                        </label>
                        <StandardInput
                            id="signup-password"
                            value={password}
                            onChange={setPassword}
                            required
                            placeholder="Crea una contraseña"
                            type="password"
                            name="password"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1 md:gap-3">
                        <label
                            htmlFor="signup-confirm-password"
                            className="text-gray-600 font-semibold md:text-lg"
                        >
                            Confirmar contraseña
                        </label>
                        <StandardInput
                            id="signup-confirm-password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            required
                            placeholder="Confirma tu contraseña"
                            type="password"
                            name="confirmPassword"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-1/3 h-[40px] bg-[#5AC7E1] mx-auto border-none text-black rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors text-white text-xl font-semibold mt-4"
                    >
                        {loading ? "Creando..." : "Registrar"}
                    </button>
                </form>

                <div className="flex flex-col items-center">
                    <div className="flex items-center h-fit gap-[5px]">
                        <p className="text-gray-600 font-medium m-[0px]">
                            ¿Ya tienes una cuenta?
                        </p>
                        <button
                            onClick={onSwitchToLogin}
                            className="font-semibold bg-transparent border-none text-[#5AC7E1] underline hover:text-[#1A97A1] transition-colors"
                        >
                            Inicia Sesion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;