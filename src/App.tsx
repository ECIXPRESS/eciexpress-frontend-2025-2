import {Routes, Route, Navigate} from "react-router-dom";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import Login from "./modules/auth/pages/login";
// import Layout from "./utils/Layout";
import {AuthProvider} from "@/modules/auth/states/AuthProvider";

import Home from "./modules/orders/pages/Home";

function App() {
  return <Home />;
}


export default App;
