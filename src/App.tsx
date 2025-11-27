import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../../eciexpress-frontend-2025-2/src/utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/login/login";
import Layout from "./utils/Layout";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>} />

                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/catalog" element={<div/>} />
                            <Route path="/shoppingCart" element={<div />}/>
                            <Route path="/orders" element={<div />}/>
                            <Route path="/chat" element={<div />}/>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
