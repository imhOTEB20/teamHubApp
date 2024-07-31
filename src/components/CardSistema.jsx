import '../styles/CardSistema.css';
import imagen1 from '../assets/img/card-1.jpeg';
import imagen2 from '../assets/img/card-2.jpeg';
import imagen3 from '../assets/img/card-3.jpeg';
import imagen4 from '../assets/img/card-4.jpeg';

const CardSistema = (props) => {
    return (
        <section id="Sistema" className="cards-sistemas">
            <article className="card-s" data-aos="flip-left">
                <img src={imagen1} alt="img-card-1"/>
                <h4>Funciones</h4>
                <p>¡Descubre lo que puedes hacer en {props.nombre}!</p>
                <a href="#" className="btn btn-personalized-1 fw-bold">Ver más</a>
            </article>
            <article className="card-s" data-aos="flip-left">
                <img src={imagen2} alt="img-card-2"/>
                <h4>Clientes</h4>
                <p>Conoce las opiniones de diferentes usuarios</p>
                <a href="#" className="btn btn-personalized-1 fw-bold">Ver más</a>
            </article>
            <article className="card-s" data-aos="flip-left">
                <img src={imagen3} alt="img-card-3"/>
                <h4>Soluciones</h4>
                <p>Descubre cómo funciona {props.nombre} y sus servicios</p>
                <a href="#" className="btn btn-personalized-1 fw-bold">Ver más</a>
            </article>
            <article className="card-s" data-aos="flip-left">
                <img src={imagen4} alt="img-card-4"/>
                <h4>Cómo</h4>
                <p>Introducete en {props.nombre} con el pie derecho</p>
                <a href="#" className="btn btn-personalized-1 fw-bold">Ver más</a>
            </article>
        </section>
    );
}

export default CardSistema;
