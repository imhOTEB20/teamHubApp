import '../styles/Desarrolladores.css';
import cristianGeronimo from '../assets/img/desarrollador.jpg';
import maxiSoriano from '../assets/img/maxi-soriano.jpg';

const Desarrolladores = () => {
    return (
        <>
        <section className="titulo-desarrolladores">
            <h3>Desarrolladores de MootMate</h3>
        </section>
        <section id="Desarrolladores" className="card-desarroladores">
            <article className="card-desarrolador" data-aos="flip-up">
                <div className="head">
                    <div className="circulo"></div>
                    <div className="contenedor-img">
                        <img src={cristianGeronimo} alt="perfil-1"/>
                    </div>
                </div>
                <div className="descripcion">
                    <h3>Cristian Geronimo</h3>
                    <h4>Developer Python Flask</h4>
                    <p>
                        Herramientas: Pyhton, Mysql, JavaScript
                    </p>
                </div>
                <div className="redes">
                    <a href=""><i className="fa-brands fa-github"></i></a>
                    <a href=""><i className="fa-brands fa-linkedin"></i></a>
                    <a href=""><i className="fa-solid fa-envelope"></i></a>
                </div>
            </article>
            <article className="card-desarrolador" data-aos="flip-up">
                <div className="head">
                    <div className="circulo"></div>
                    <div className="contenedor-img">
                        <img src={maxiSoriano} alt="perfil-1"/>
                    </div>
                </div>
                <div className="descripcion">
                    <h3>Maximiliano Soriano</h3>
                    <h4>Developer Full Stack</h4>
                    <p>Herramientas: html, css, js, python, php, mysql and flutter.</p>
                </div>
                <div className="redes">
                    <a href=""><i className="fa-brands fa-github"></i></a>
                    <a href=""><i className="fa-brands fa-linkedin"></i></a>
                    <a href=""><i className="fa-solid fa-envelope"></i></a>
                </div>
            </article>
        </section>
        </>
    );
}

export default Desarrolladores;