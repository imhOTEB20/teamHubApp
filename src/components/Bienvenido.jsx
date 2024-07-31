import '../styles/Bienvenido.css';
import nuevoServidor from '../assets/img/new-server.png';
import buscarServidor from '../assets/img/new-server-1.png'
import sinServidores from '../assets/img/no-chatear.png'
import radioGarka from '../assets/img/radio-garka.jpg'
import cdt from '../assets/img/cdt.jpg'
import ModalCrearServidor from './ModalCrearServidor';


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

const Servidores = () =>{
    return(
        <section className="tus-servidores">
                <article className="card-servidor" data-aos="fade-up">
                    <img src={radioGarka} alt="logo-server"/>
                    <div className="descripcion-servidor">
                        <h2>Radio Garka</h2>
                        <p>69 miembros <a href="miembros.html">mostrar <i className="fa-solid fa-eye"></i></a></p>
                        <p>2 canales <a href="canales.html">mostrar <i className="fa-solid fa-comments"></i></a></p>
                        <button className="btn-servidor btn btn-personalized-3 fw-bold"><i className="fa-solid fa-trash"></i> Eliminar</button>
                    </div>
                    <div className="botones-servidor">
                        <a className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ingresar <i className="fa-solid fa-comments"></i></a>
                        <button className="btn-servidor btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                        <button className='btn-servidor btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0'><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
                    </div>
                    <div className="me-encanta-lokita">
                        <label className="label-me-encanta"><i className="fa-regular fa-heart"></i></label>
                    </div>
                </article>
                <article className="card-servidor" data-aos="fade-up">
                    <img src={cdt} alt="logo-server"/>
                    <div className="descripcion-servidor">
                        <h2>Radio Garka</h2>
                        <p>69 miembros <a href="#">mostrar <i className="las la-eye"></i></a></p>
                        <p>2 canales <a href="#">mostrar <i className="las la-comment-dots"></i></a></p>
                    </div>
                    <div className="botones-servidor">
                    <a className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ingresar <i className="fa-solid fa-comments"></i></a>
                        <button className='btn-servidor btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0'><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
                    </div>
                    <div className="me-encanta-lokita">
                        <label className="label-me-encanta lbl-mg-1" for="btn-me-encanta-1"><i className="fa-regular fa-heart"></i></label>
                    </div>
                </article>
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
            <NoHayServidores/>
            <Servidores/>
        </section>
    );
}

export default Bienvenido;