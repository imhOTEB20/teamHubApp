import '../styles/Chat.css';

const ChatOpcionesUsuario = () => {
    return (
        <section className="usuario-estado">
            <span className="icono">
                <i className="fa-solid fa-user"></i>
            </span>
            <article className="contendor-radio">
                <div className="input-radio-1">
                    <input type="radio" id="conectado" name="estado" value="conectado"/>
                    <label className="texto" for="conectado">Conectado</label>
                </div>
                <div className="input-radio-2">
                    <input type="radio" id="Oculto" name="estado" value="Oculto"/>
                    <label className="texto" for="Oculto">Oculto</label>
                </div>
                <div className="input-radio-3">
                    <input type="radio" id="noMolestar" name="estado" value="noMolestar"/>
                <label className="texto" for="noMolestar">No molestar</label>
                </div>
            </article>
        </section>
    );
}

export default ChatOpcionesUsuario;
