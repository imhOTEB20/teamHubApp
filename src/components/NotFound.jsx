import Header from "./Header";
import Footer from "./Footer";
import errorNave404 from '../assets/img/error-404-nave.png'
import error404 from '../assets/img/error-404.png'
const NotFound = () => {
    return  (
        <>
        <Header nombre="MootMate"/>
        <main>
        <section className="error">
            <article className="mensaje-error">
                <h1>Error</h1><img src={error404} alt="error-404" />
            </article>
            <img src={errorNave404} alt="error-404-nave" />
            <a className="btn-volver-index" href="/"> Volver al inicio</a>
        </section>
        </main>
        <Footer/>
        </>
    );
}

export default NotFound;