import React from 'react'

const ModalEditarCanal = ({idModal}) => {
    return (
        <div className="modal fade" id={`editarCanalModal${idModal}`} tabIndex="-1" aria-labelledby={`editarCanalModalLabel${idModal}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id={`editarCanalModalLabel${idModal}`}>Editar Canal</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form>
                            <div className="mb-3">
                                <label htmlFor={`editarNombreCanal${idModal}`} className="form-label fw-bolder">Nombre</label>
                                <input type="text" className="form-control bg-input" id={`editarNombreCanal${idModal}`} placeholder="Ingrese nombre"
                                    minLength="3" maxLength="25" name="Nombre" required />
                                <div id={`editarNombreErrorCanal${idModal}`}></div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control bg-input" placeholder="Ingrese descripción" id={`descripcion${idModal}`} style={{ height: '100px' }}></textarea>
                                    <label htmlFor={`descripcion${idModal}`}>Descripción</label>
                                </div>
                                <div id={`editarDescripcionErrorCanal${idModal}`}></div>
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
    )
}

export default ModalEditarCanal
