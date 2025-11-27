import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logotipo from '@/assets/logotipo.svg';
import StandardInput from '@/lib/input/standarInput';

const Login = () => {
    const [signInForm, setSignInForm] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (field: string) => (value: string) => {
        setSignInForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign in form submitted:", signInForm);
    };

    return (
        <div className="h-screen w-screen flex bg-[url(@/assets/lightBackground.png)] bg-cover">
            {/* Banner */}
            <div className="flex-1 bg-[url(@/assets/login/loginBanner.png)] bg-cover bg-center"/>

            {/* Login */}
            <div className="w-3/5 flex flex-col items-center justify-center">
                <div className="w-1/2 max-w-md flex flex-col items-center gap-8 py-8 px-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-4">
                        <img
                            className="w-96 h-12 object-contain"
                            alt="Logotipo ECIEXPRESS"
                            src={logotipo}
                        />
                    </div>

                    {/* Header */}
                    <h2 className="text-gray-600 text-2xl font-bold text-center mb-2">
                        Iniciar sesión
                    </h2>

                    {/* Form */}
                    <form
                        onSubmit={handleSignInSubmit}
                        className="w-full flex flex-col gap-6 items-center p-12"
                    >
                        {/* Campo Email */}
                        <div className="w-full flex flex-col gap-3">
                            <label
                                htmlFor="signin-username"
                                className="text-gray-600 font-semibold text-lg"
                            >
                                Email
                            </label>
                            <StandardInput
                                id="signin-username"
                                value={signInForm.username}
                                onChange={handleInputChange('username')}
                                required
                                placeholder="Ingresa tu email"
                                type="email"
                                name="username"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="w-full flex flex-col gap-3">
                            <label
                                htmlFor="signin-password"
                                className="text-gray-600 font-semibold text-lg"
                            >
                                Contraseña
                            </label>
                            <StandardInput
                                id="signin-password"
                                value={signInForm.password}
                                onChange={handleInputChange('password')}
                                required
                                placeholder="Ingresa tu contraseña"
                                type="password"
                                name="password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-1/3 h-16 bg-cyan-400 rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors text-white text-xl font-semibold mt-4"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    {/* SignIn button */}
                    <div className="flex items-center gap-2 mt-4">
                        <p className="text-gray-600 font-medium">
                            ¿No tienes una cuenta?
                        </p>
                        <Link
                            to="/signup"
                            className="font-semibold text-cyan-400 underline hover:text-cyan-500 transition-colors"
                        >
                            Crea una
                        </Link>
                    </div>

                    {/* Password recovery */}
                    <Link
                        to="/forgot-password"
                        className="font-semibold text-cyan-400 underline hover:text-cyan-500 transition-colors mt-2"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;