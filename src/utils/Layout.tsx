import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";
import Navbar from "@/utils/Navbar";

const Layout = () => (
    <div className="flex h-screen bg-pattern-foreground overflow-hidden">
        <Navbar/>
        <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 mr-4 mb-4 rounded-4xl bg-foreground overflow-auto">
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
                    <Outlet/>
                </div>
            </main>
        </div>
    </div>
);

export default Layout;
