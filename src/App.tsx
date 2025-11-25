
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login/login";

function App() {
    return (
        <div className="min-h-screen w-full p-4">
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
