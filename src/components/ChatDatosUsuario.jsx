import '../styles/Chat.css';
import maxiSoriano from '../assets/img/maxi-soriano.jpg';

const ChatDatosUsuario = () => {
    return (
        <section className="header-nav">
            <img src={maxiSoriano} alt="logo-user"/>
            <article className="usuario-nombre">
                <p className="usuario texto">Mia_Khalifa_69</p>
                <p className="nombre texto">Mia Khalifa</p>
            </article>
        </section>
    );
}

export default ChatDatosUsuario;
