
import Bienvenido from '../components/Bienvenido'
import CardSistema from '../components/CardSistema';

const tituloSoftware = "MootMate 2.0";

const Bienvenida = () => {
    return (
    <>
        <Bienvenido/>
        <CardSistema nombre={tituloSoftware}/>
    </>
    )
}

export default Bienvenida;
