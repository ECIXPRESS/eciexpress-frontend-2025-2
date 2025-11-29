import {Routes, Route, Navigate} from "react-router-dom";
import {ProtectedRoute} from "./modules/auth/utils/ProtectedRoute";
import Login from "./modules/auth/components/login";
import Layout from "./modules/auth/utils/Layout";
import {AuthProvider} from "@/modules/auth/states/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route element={<Layout/>}>
                        <Route path="/catalog" element={<div>Catalog</div>}/>
                        <Route path="/shoppingCart" element={<div>Shopping Cart</div>}/>
                        <Route path="/orders" element={<div>Orders</div>}/>
                        <Route path="/chat" element={<div>Chat</div>}/>
                        <Route path="/dashboard" element={<div>Dashboard</div>}/>
                        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </AuthProvider>
    );
}

export default App;
