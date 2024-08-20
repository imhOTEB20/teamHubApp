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

const Router = createBrowserRouter([
    {
        path: "/",
        element: <ComponentIfLogged childrenIfLogged={<BienvenidaPage />} childrenIfNotLogged={<HomePage />}/>,
    },
    {
        path: "/servidores/:id",
        element: <PrivateRoute><CanalesPage /></PrivateRoute>
    },
    {
        path: "/servidores/",
        element: <PrivateRoute><TodosLosServidores /></PrivateRoute>
    },
    {
        path: "/miembros",
        element: <PrivateRoute><MiembrosPage /></PrivateRoute>,
    },
    {
        path: "/bienvenida",
        element: <PrivateRoute><BienvenidaPage /></PrivateRoute>,
    },
    {
        path: "/desarrolladores",
        element: <DesarrolladoresPage />,
    },
    {
        path: "*",
        element: <Error404Page />,
    }
]);

export default Router;