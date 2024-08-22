
import Bienvenido from '../components/Bienvenido'
import CardSistema from '../components/CardSistema';
import ModalEditarPerfil from '../components/ModalEditarPerfil';
import NavMootMate from '../components/NavMootMate';
import FooterMootMate from '../components/FooterMootMate';

const tituloSoftware = "MootMate 2.0";

const Bienvenida = () => {
    return (
    <>
        <NavMootMate nombre={tituloSoftware}/>
        <Bienvenido/>
        <CardSistema nombre={tituloSoftware}/>
        <ModalEditarPerfil/>
        <FooterMootMate nombre={tituloSoftware}/>
    </>
    )
}

export default Bienvenida;
