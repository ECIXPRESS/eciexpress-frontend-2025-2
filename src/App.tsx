import {Routes, Route, Navigate} from "react-router-dom";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import Login from "./pages/login/login";
import Layout from "./utils/Layout";
import {AuthProvider} from "@/utils/context/AuthProvider";

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
