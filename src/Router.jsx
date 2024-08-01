import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';


const Router = createBrowserRouter([
    //Pagina principal 'mootmate.com/'
    {
        path: '/',
        element: <Home />
    }
]);

export default Router;