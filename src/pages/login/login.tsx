import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logotipo from '@/assets/logotipo.svg';
import StandardInput from '@/lib/input/standarInput';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useAuth} from "@/pages/login/hooks/useAuth";
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
        <div className="max-h-screen w-screen flex bg-[url(@/assets/lightBackground.png)] bg-cover">
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
            <div className="w-1/2 flex-1 bg-[url(@/assets/login/loginBanner.png)] bg-cover bg-center">
                <img src={banner} alt="banner"/>
            </div>

            {/* Login */}
            <div className="w-1/2 pr-[150px] flex flex-col items-center justify-center">
                <div className="w-1/2 max-w-[350px] max-w-md h-screen flex flex-col justify-center items-center gap-[20px] p-[20px] bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-4">
                        <img
                            className="w-96 h-12 object-contain"
                            alt="Logotipo ECIEXPRESS"
                            src={logotipo}
                        />
                    </div>

                    {/* Header */}
                    <h1 className="text-gray-600 text-[24px] font-arial-rounded text-center mb-2">
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
                            className="w-1/3 h-[40px] bg-[#5AC7E1] border-none rounded-[10px] text-[#ffffff] rounded-2xl shadow-md cursor-pointer hover:bg-cyan-500 transition-colors text-white text-xl font-semibold mt-4"
                        >
                            Iniciar
                        </button>
                    </form>

                    <div className="flex flex-col items-center">
                        {/* SignIn button */}
                        <div className="flex items-center h-fit gap-[5px]">
                            <p className="text-gray-600 font-medium m-[0px]">
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
                            className="font-semibold text-cyan-400 underline hover:text-cyan-500 transition-colors"
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