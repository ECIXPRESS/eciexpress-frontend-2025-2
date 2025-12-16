import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Sidebar from "@/utils/Sidebar";

const Layout = () => (
    <div className="flex h-screen bg-[#F6F6F6] overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 md:ml-20">
            <main className="flex-1 mr-4 mb-4 mt-4 rounded-4xl bg-white overflow-auto">
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    toastClassName="rounded-lg shadow-md"
                />
                <div className="h-full w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    </div>
);

export default Layout;
