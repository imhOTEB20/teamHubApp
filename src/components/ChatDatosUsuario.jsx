import '../styles/Chat.css';
import noImg from '../assets/img/usuario.png';
import useAuth from '../hooks/useAuth';

const ChatDatosUsuario = () => {
    const { profileData } = useAuth();
    return (
        <section className="header-nav">
            <img src={ profileData.image || noImg } alt="logo-user"/>
            <article className="usuario-nombre">
                <p className="usuario texto">{`${profileData.first_name} ${profileData.last_name}`}</p>
            </article>
        </section>
    );
}

export default ChatDatosUsuario;
