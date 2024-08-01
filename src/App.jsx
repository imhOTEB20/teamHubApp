import { BrowserRouter as RutasMootMate } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";

const App = () => {
    return (
      <>
        <RutasMootMate>
          <RoutesViews/>
        </RutasMootMate>
      </>
    );
};

export default App;
