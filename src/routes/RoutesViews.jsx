import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Error404Page from "../pages/Error404Page";
import NavMootMate from "../components/NavMootMate";
import FooterMootMate from "../components/FooterMootMate";
import BienvenidaPage from "../pages/BienvenidaPage";
import DesarrolladoresPage from "../pages/DesarrolladoresPage";
import CanalesPage from "../pages/CanalesPage";

const tituloSoftware = "MootMate";

const RoutesViews = () => {
    return (
    <>
        <NavMootMate nombre={tituloSoftware}/>
        <Routes>
            <Route path="/desarrolladores" element={<DesarrolladoresPage/>}/>
            <Route path="/canales" element={<CanalesPage/>}/>
            <Route path="/bienvenida" element={<BienvenidaPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<Error404Page/>}/>
        </Routes>
        <FooterMootMate nombre={tituloSoftware}/>
    </>
    )
}

export default RoutesViews
