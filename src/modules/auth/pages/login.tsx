import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logotipo from '@/assets/logotipo.svg';
import StandardInput from '@/lib/input/standarInput';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useAuth} from "@/modules/auth/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";
import banner from '@/assets/login/loginBanner.png';

const roleRoutes: Record<string, string> = {
    STUDENT: "/dashboard",
    TEACHER: "/dashboard",
    DEAN: "/dashboard",
};

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post("/auth/login", { email, password });
            const { token, user } = response.data;

            login(token, user);
            const redirectPath = roleRoutes[user.role] || "/dashboard";
            navigate(redirectPath, { replace: true });
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-h-screen w-screen flex bg-pattern-light">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastClassName="rounded-lg shadow-md"
            />
            
            {/* Banner */}
            <div className="w-1/2 flex-1 bg-[banner] bg-cover bg-center">
                <img src={banner} alt="banner"/>
            </div>

            {/* Login */}
            <div className="w-1/2 pr-[150px] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-4">
                        <img
                            className="w-96 h-12 object-contain"
                            alt="Logotipo ECIEXPRESS"
                            src={logotipo}
                        />
                    </div>

                    {/* Header */}
                    <h1 className="page-title mb-2">
                        Iniciar sesión
                    </h1>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-[15px] items-center p-12"
                    >
                        {/* Campo Email */}
                        <div className="w-full flex flex-col gap-3">
                            <label
                                htmlFor="signin-username"
                                className="label-text"
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

                        {/* Campo Contraseña */}
                        <div className="w-full flex flex-col gap-3">
                            <label
                                htmlFor="signin-password"
                                className="label-text"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/3 h-[40px] btn-primary rounded-2xl mt-4 text-xl"
                        >
                            Iniciar
                        </button>
                    </form>

                    <div className="flex flex-col items-center">
                        {/* SignIn button */}
                        <div className="flex items-center h-fit gap-[5px]">
                            <p className="paragraph-text">
                                ¿No tienes una cuenta?
                            </p>
                            <Link
                                to="/signup"
                                className="link-primary"
                            >
                                Crea una
                            </Link>
                        </div>

                        {/* Password recovery */}
                        <Link
                            to="/forgot-password"
                            className="link-primary"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;