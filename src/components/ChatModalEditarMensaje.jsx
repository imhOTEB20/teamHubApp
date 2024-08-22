import '../styles/Chat.css';

const ChatModalEditarMensaje = ({idMensaje}) => {
    return (
        <div className="modal fade" id={`editarMesajeModal${idMensaje}`} tabIndex="-1" aria-labelledby={`editarMesajeModalLabel${idMensaje}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id={`editarMesajeModalLabel${idMensaje}`}>Editar Mensaje</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control bg-input" placeholder="Mensaje" id="Mensaje" style={{ height: '100px' }}></textarea>
                                    <label htmlFor="Mensaje">Mensaje</label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Agregar">Guardar cambios</button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatModalEditarMensaje;
