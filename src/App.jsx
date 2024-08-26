import { RouterProvider } from "react-router-dom";

import Router from "./Router";
import NavMootMate from "./components/NavMootMate";
import FooterMootMate from "./components/FooterMootMate";

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
