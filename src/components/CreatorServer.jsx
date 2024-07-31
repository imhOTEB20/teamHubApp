
import '../styles/CreatorServer.css';
import PropTypes from 'prop-types';
function CreatorServer({ isOpen, onClose}) {
    if (!isOpen) return null;

    return (
        <section className="contenedor-modal-crear">
            <article className="contenido-modal">
                <div className="header-modal">
                    <h2>Crear servidor</h2>
                    <label htmlFor="btn-modal-crear"><i className="las la-times-circle" onClick={onClose}></i></label>
                </div>
                <form action="">
                    <div className="cuerpo-de-modal">
                        <div className="input-servidor">
                            <label htmlFor="">Imagen</label>
                            <input className="input-principales" type="file" name="" id=""/>
                        </div>
                        <div className="input-servidor">
                            <label htmlFor="">Nombre</label>
                            <input className="input-principales input-style" type="text" name="" id=""/>
                        </div>
                        <div className="input-servidor">
                            <label htmlFor="">Descripción</label>
                            <textarea className="input-style" name="" id="" cols="30" rows="4"></textarea>
                        </div>
                        <div className="input-servidor">
                            <label>Chat General</label>
                            <div className="input-radio">
                                <input type="radio" name="chat" value="administradores" id="admin"/>
                                <label htmlFor="admin">Administradores.</label>
                            </div>
                            <div className="input-radio">
                                <input type="radio" name="chat" value="moderadores" id="modera"/>
                                <label htmlFor="modera">Adm. y moderadores.</label>
                            </div>
                            <div className="input-radio">
                                <input type="radio" name="chat" value="todos" id="todos-users"/>
                                <label htmlFor="todos-users">Todos.</label>
                            </div>
                        </div>
                    </div>
                    <div className="btns">
                        <button className="agregar" type="submit">Agregar</button>
                        <button className="resetear" type="reset" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </article>
            <label htmlFor="btn-modal-crear" className="cerrar-modal"></label>
        </section>
    );
}

CreatorServer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
export default CreatorServer;