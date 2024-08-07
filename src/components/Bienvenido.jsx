import '../styles/Bienvenido.css';
import nuevoServidor from '../assets/img/new-server.png';
import buscarServidor from '../assets/img/new-server-1.png';
import sinServidores from '../assets/img/no-chatear.png';
import error404 from '../assets/img/error.png';
import ModalCrearServidor from './ModalCrearServidor';
import Servidor from './Servidor';


const AgregarServidor = () => {
    return(
        <section className="agregar-servidor" data-aos="fade-down">
            <img src={nuevoServidor} alt="nuevo-servidor"/>
            <p>¿Quieres usar MootMate con un nuevo equipo?</p>
            <button type="button" className="btn btn-personalized-1 btn-agregar-servidor fw-bold" data-bs-toggle="modal" data-bs-target="#agregarServidorModal"><i className="fa-solid fa-circle-plus" aria-label="Agregar Servidor"></i> Agregar Servidor</button>
            <ModalCrearServidor/>
        </section>
    );
}

const BuscarServidor = () =>{
    return(
        <section className="unirme-a-servidores" data-aos="fade-down">
            <img src={buscarServidor} alt="buscar-servidor"/>
            <p>¿Quieres buscar un nuevo equipo en MootMate?</p>
            <a className="btn btn-personalized-1 fw-bold .link-unirme-servidor" href="#">Servidores</a>
        </section>
    );
}

const NoHayServidores = () =>{
    return(
        <section className="ningun-servidor" id="vacio" data-aos="flip-left">
            <img src={sinServidores} alt="no-perteneces-a-ningun-server"/>
            <h3>¡No perteneces a ningun servidor!</h3>
        </section>
    );
}

const ErrorAlCargarServidores = () =>{
    return(
        <section className="ningun-servidor" id="vacio" data-aos="flip-left">
            <img src={error404} alt="no-perteneces-a-ningun-server"/>
            <h3>¡Se produjo un error al cargar los servidores!</h3>
        </section>
    );
}

const Servidores = () =>{
    return(
        <section className="tus-servidores">
            <Servidor id={1}/>
            <Servidor id={2}/>
            <Servidor id={3}/>
        </section>
    );
}

const Bienvenido = () => {
    return(
        <section className="cambio-de-color">
            <section className="bienvenida-usuario" data-aos="fade-down">
                <h1 id="bienvenida">¡Bienvenido Eric Cartman!</h1>
            </section>
            <AgregarServidor/>
            <BuscarServidor/>
            <section className="titulo-tus-servidores">
                <h2>¡Tus servidores!</h2>
            </section>
            <ErrorAlCargarServidores/>
            <Servidores/>
        </section>
    );
}

export default Bienvenido;