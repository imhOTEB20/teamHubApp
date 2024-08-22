import '../styles/Chat.css';

const ChatEscribirMensaje = () => {
    return (
        <section className="contenedor-chat">
            <form action="#">
                <i className="fa-solid fa-keyboard"></i>
                <input className="escribir-mensaje" type="text" name="" id=""/>
                <button className="btn-enviar" type="submit">Enviar</button>
            </form>
        </section>
    );
}

export default ChatEscribirMensaje;
