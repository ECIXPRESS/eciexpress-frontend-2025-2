import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Sidebar from "@/utils/Sidebar";
const Layout = () => (_jsxs("div", { className: "flex h-screen bg-[#F6F6F6] overflow-hidden", children: [_jsx(Sidebar, {}), _jsx("div", { className: "flex-1 flex flex-col min-w-0 md:ml-20", children: _jsxs("main", { className: "flex-1 mr-4 mb-4 mt-4 rounded-4xl bg-white overflow-auto", children: [_jsx(ToastContainer, { position: "bottom-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true, theme: "light", toastClassName: "rounded-lg shadow-md" }), _jsx("div", { className: "h-full w-full", children: _jsx(Outlet, {}) })] }) })] }));
export default Layout;
