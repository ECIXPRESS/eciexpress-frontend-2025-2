import {useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {Outlet} from 'react-router-dom';
import Sidebar from "@/pages/Navbar/Sidebar";

const Layout = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-pattern-foreground overflow-hidden">
            {/* ToastContainer global */}
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
                theme="light"
                toastClassName="rounded-lg shadow-md"
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Una sola vez */}
                <Sidebar
                    onToggleExpand={setIsSidebarExpanded}
                    isExpanded={isSidebarExpanded}
                />

                {/* Main content */}
                <main className="flex-1 w-full h-full md:m-4 md:rounded-4xl bg-foreground overflow-auto">
                    <div className="h-full w-full overflow-auto bg-white pb-16 md:pb-0">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;