import BannerPrincipal from "./BannerPrincipal";
import Header from "./Header";
import Descripcion from "./Descripcion";
import CardSistema from "./CardSistema";
import Desarrolladores from "./Desarrolladores";
import Footer from "./Footer";
import Login from "./Login";
import Registro from "./Registro";

const tituloSoftware = "MootMate";
const Home = () => {
    
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

        <Footer nombre={tituloSoftware}/>
        </div>
    );
};

export default Home;