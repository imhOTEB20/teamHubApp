import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';


const Router = createBrowserRouter([
    //Pagina principal 'mootmate.com/'
    {
        path: '/',
        element: <Home />
    },
    //Pagina error
    {
        path: '*',
        element: <NotFound />
    }
]);

export default Router;