import { RouterProvider } from "react-router-dom";
import { useState } from "react";

import Router from "./Router";
import NavMootMate from "./components/NavMootMate";
import FooterMootMate from "./components/FooterMootMate";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const tituloSoftware =  'MootMate';
  return (
    <>
      <NavMootMate nombre={tituloSoftware}/>
      <RouterProvider router={Router} />
      <FooterMootMate nombre={tituloSoftware}/>
    </>
  );
};

export default App;
