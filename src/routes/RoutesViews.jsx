import { Routes, Route } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import DesarrolladoresPage from "../pages/DesarrolladoresPage";
import CanalesPage from "../pages/CanalesPage";
import MiembrosPage from "../pages/MiembrosPage";
import BienvenidaPage from "../pages/BienvenidaPage";
import HomePage from "../pages/HomePage";
import Error404Page from "../pages/Error404Page";


const RoutesViews = () => {
    return (
    <>
        <Routes>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/desarrolladores" element={<DesarrolladoresPage/>}/>
            <Route path="/canales" element={<CanalesPage/>}/>
            <Route path="/miembros" element={<MiembrosPage/>}/>
            <Route path="/bienvenida" element={<BienvenidaPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<Error404Page/>}/>
        </Routes>
    </>
    )
}

export default RoutesViews;
