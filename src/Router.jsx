import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import BienvenidaPage from "./pages/BienvenidaPage";
import DesarrolladoresPage from "./pages/DesarrolladoresPage";
import CanalesPage from "./pages/CanalesPage";
import MiembrosPage from "./pages/MiembrosPage";
import PrivateRoute from "./components/PrivateRoute";
import ComponentIfLogged from "./components/ComponentIfLogged";
import TodosLosServidores from "./pages/TodosLosServidores";
import ChatPage from "./pages/ChatPage";
import NavMootMate from "./components/NavMootMate";
import FooterMootMate from "./components/FooterMootMate";

const Router = createBrowserRouter([
    {
        path: "/",
        element:
        <>
        <NavMootMate />
        <ComponentIfLogged childrenIfLogged={<BienvenidaPage />} childrenIfNotLogged={<HomePage />}/>
        <FooterMootMate />
        </>
    },
    {
        path: "/servidores/:id",
        element:
        <>
        <NavMootMate />
        <PrivateRoute><CanalesPage /></PrivateRoute>
        <FooterMootMate />
        </>
    },
    {
        path: "/servidores/",
        element:
        <>
        <NavMootMate />
        <PrivateRoute><TodosLosServidores /></PrivateRoute>
        <FooterMootMate />
        </>
    },
    {
        path: "/canales/:id",
        element: <PrivateRoute><ChatPage /></PrivateRoute>
    },
    {
        path: "/miembros",
        element:
        <>
        <NavMootMate />
        <PrivateRoute><MiembrosPage /></PrivateRoute>
        <FooterMootMate />
        </>
    },
    {
        path: "/bienvenida",
        element:
        <>
        <NavMootMate />
        <PrivateRoute><BienvenidaPage /></PrivateRoute>
        <FooterMootMate />
        </>
    },
    {
        path: "/desarrolladores",
        element:
        <>
        <NavMootMate />
        <DesarrolladoresPage />
        <FooterMootMate />
        </>
    },
    {
        path: "*",
        element:
        <>
        <NavMootMate />
        <Error404Page />
        <FooterMootMate />
        </>
    }
]);

export default Router;