import {useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {Outlet} from 'react-router-dom';
import Sidebar from "@/pages/Navbar/Sidebar";

const Layout = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-pattern-foreground overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
                <div className={`hidden md:block inset-y-0 left-0 z-40`}>
                    <Sidebar onToggleExpand={setIsSidebarExpanded} isExpanded={isSidebarExpanded}/>
                </div>

                <main className="flex-1 w-full h-full m-4 rounded-4xl bg-foreground overflow-auto">
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
                    <div className="h-full w-full overflow-auto overflow-y-auto bg-white">
                        <Outlet/>
                    </div>
                </main>
            </div>
            <div className="md:hidden">
                <Sidebar onToggleExpand={setIsSidebarExpanded} isExpanded={isSidebarExpanded}/>
            </div>
        </div>
    );
};

export default Layout;
