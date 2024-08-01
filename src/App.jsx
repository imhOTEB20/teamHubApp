import BannerPrincipal from "./components/BannerPrincipal";
import Header from "./components/Header";
import Descripcion from "./components/Descripcion";
import CardSistema from "./components/CardSistema";
import Desarrolladores from "./components/Desarrolladores";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Bienvenido from "./components/Bienvenido";
import ModalEditarPerfil from "./components/ModalEditarPerfil";

const tituloSoftware = "MootMate";
const App = () => {
  return (
    <div>
      <Header nombre={tituloSoftware}/>

      {/* PAGINA PRINCIPAL*/}
      <BannerPrincipal nombre={tituloSoftware}/>
      <Descripcion/>
      <CardSistema nombre={tituloSoftware}/>
      <Desarrolladores/>
      <Login/>
      <Registro/>
      <ModalEditarPerfil/>

      {/* PAGINA BIENVENIDA*/}
      {/* <Bienvenido/>
      <CardSistema nombre={tituloSoftware}/> */}

      <Footer nombre={tituloSoftware}/>
    </div>
  );
};

export default App;
