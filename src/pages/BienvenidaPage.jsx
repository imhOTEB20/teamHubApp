
import Bienvenido from '../components/Bienvenido'
import CardSistema from '../components/CardSistema';
import ModalEditarPerfil from '../components/ModalEditarPerfil';

const tituloSoftware = "MootMate 2.0";

const Bienvenida = () => {
    return (
    <>
        <Bienvenido/>
        <CardSistema nombre={tituloSoftware}/>
        <ModalEditarPerfil/>
    </>
    )
}

export default Bienvenida;
