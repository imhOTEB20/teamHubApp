import BannerPrincipal from '../components/BannerPrincipal'
import Descripcion from '../components/Descripcion'
import CardSistema from '../components/CardSistema'
import Desarrolladores from '../components/Desarrolladores'
import Login from '../components/Login'
import Registro from '../components/Registro'
import ModalEditarPerfil from '../components/ModalEditarPerfil'

const tituloSoftware = "MootMate 2.0";

const HomePage = () => {
    return (
    <>
        <BannerPrincipal nombre={tituloSoftware}/>
        <Descripcion/>
        <CardSistema nombre={tituloSoftware}/>
        <Desarrolladores/>
        <Login/>
        <Registro/>
        <ModalEditarPerfil/>
    </>
    )
}

export default HomePage
