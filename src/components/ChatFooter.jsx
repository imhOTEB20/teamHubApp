import '../styles/Chat.css';

const ChatFooter = () => {
    return (
        <section className="footer-header">
            <article className="canal-chat">
                <a href="#"><i className="fa-solid fa-door-open"></i><p className="texto">Servidores</p></a>
            </article>
            <article className="modo">
                <div className="oscuro">
                    <i className="fa-solid fa-moon"></i><p className="texto">Oscuro</p>
                </div>
                <div className="claro">
                    <i className="fa-solid fa-sun"></i><p className="texto">Claro</p>
                </div>
                <div className="toggle-switch">
                    <span className="switch">

                    </span>
                </div>
            </article>
        </section>
    );
}

export default ChatFooter;
