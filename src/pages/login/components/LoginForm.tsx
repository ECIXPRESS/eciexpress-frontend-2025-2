import React from 'react';
import { Link } from 'react-router-dom';
import logotipo from '@/assets/logotipo.svg';
import StandardInput from '@/lib/input/standarInput';

interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
                                                 email,
                                                 setEmail,
                                                 password,
                                                 setPassword,
                                                 loading,
                                                 onSubmit,
                                                 onSwitchToSignup
                                             }) => {
    return (
        <div className="w-full flex flex-row items-center justify-center">
            <div className="w-full max-w-lg h-screen flex flex-col justify-center items-center gap-4 px-2">
                {/* Logo */}
                <div className="flex items-center justify-center mb-4">
                    <img
                        className="w-96 h-12 object-contain"
                        alt="Logotipo ECIEXPRESS"
                        src={logotipo}
                    />
                </div>

                {/* Header */}
                <h1 className="text-3xl font-arial-rounded text-center mb-2">
                    Iniciar sesión
                </h1>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="w-full flex flex-col gap-2 items-center p-2"
                >
                    <div className="w-full flex flex-col gap-3">
                        <label
                            htmlFor="signin-username"
                            className="text-gray-600 font-semibold text-lg"
                        >
                            Email
                        </label>
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

                    <div className="w-full flex flex-col gap-3">
                        <label
                            htmlFor="signin-password"
                            className="text-gray-600 font-semibold text-lg"
                        >
                            Contraseña
                        </label>
                        <StandardInput
                            id="signin-password"
                            value={password}
                            onChange={setPassword}
                            required
                            placeholder="Ingresa tu contraseña"
                            type="password"
                            name="password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-1/3 h-[40px] bg-[#5AC7E1] border-none rounded-lg text-white rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors text-white text-xl font-semibold mt-4"
                    >
                        Iniciar
                    </button>
                </form>

                <div className="flex flex-col items-center">
                    <div className="flex items-center h-fit gap-[5px]">
                        <p className="text-gray-600 font-medium m-[0px]">
                            ¿No tienes una cuenta?
                        </p>
                        <button
                            onClick={onSwitchToSignup}
                            className="font-semibold font-sans bg-transparent border-none text-[#5AC7E1] underline hover:text-[#1A97A1] transition-colors"
                        >
                            Crea una
                        </button>
                    </div>

                    <Link
                        to="/forgot-password"
                        className="font-semibold text-[#5AC7E1] underline hover:text-[#1A97A1] transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;