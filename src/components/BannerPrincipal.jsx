import '../styles/BannerPrincipal.css';

const BannerPrincipal = (props) =>{
    return (
        <section className="banner">
            <article>
                <h1>Bienvenid@ a {props.nombre}</h1>
                <h2>Diseñada para realizar reuniones online</h2>
                <p> ¡Bienvenido a nuestra plataforma de comunicación! Estamos emocionados de tenerte aquí. Este es tu espacio para conectarte, colaborar y compartir con amigos, colegas o comunidades afines. ¡Prepárate para una experiencia de comunicación única! Explore los canales, comparta sus ideas y manténgase conectado con las personas que le importan. ¡Gracias por unirse a nosotros y esperamos que disfrutes de tu tiempo aquí!
                </p>
                <div className="contenedor-boton-registrarse">
                    <button
                        type="button"
                        id="boton-registrarse"
                        className="btn btn-personalized-1 fw-bold"
                        aria-label="Registarse" data-bs-toggle="modal"
                        data-bs-target="#registrarseModal"
                        >
                        Registrarse
                    </button>
                </div>
            </article>
        </section>
    );
}

export default BannerPrincipal;