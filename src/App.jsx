import BannerPrincipal from "./components/BannerPrincipal";
import Header from "./components/Header";
import Descripcion from "./components/Descripcion";
import CardSistema from "./components/CardSistema";
import Desarrolladores from "./components/Desarrolladores";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registro from "./components/Registro";

const tituloSoftware = "MootMate";
const App = () => {
  return (
    <div>
      <Header nombre={tituloSoftware}/>
      <BannerPrincipal nombre={tituloSoftware}/>
      <Descripcion/>
      <CardSistema nombre={tituloSoftware}/>
      <Desarrolladores/>
      <Login/>
      <Registro/>
      <Footer nombre={tituloSoftware}/>
    </div>
  );
};

export default App;
