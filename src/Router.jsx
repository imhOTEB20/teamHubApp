import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import BienvenidaPage from "./pages/BienvenidaPage";
import DesarrolladoresPage from "./pages/DesarrolladoresPage";
import CanalesPage from "./pages/CanalesPage";
import MiembrosPage from "./pages/MiembrosPage";
import PrivateRoute from "./components/PrivateRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/canales",
        element: <PrivateRoute><CanalesPage/></PrivateRoute>
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