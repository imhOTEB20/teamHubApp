import "../styles/Miembros.css";
import nuevoUsuario from "../assets/img/new-usuario.png";

const ModalInvitarUsuario = () => {
    return (
        <section className="modal fade" id="invitarMiembro" tabIndex="-1" aria-labelledby="invitarMiembro" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id="invitarMiembro">Invitar Miembro</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form id="form-invitar-miembro">
                            <div className="mb-3">
                                <label htmlFor="email-invitar-miembro" className="form-label fw-bolder">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-input"
                                    id="email-invitar-miembro"
                                    aria-describedby="emailHelp"
                                    placeholder="Ingrese el email"
                                    minLength="5"
                                    maxLength="254"
                                    name="Email"
                                    autoComplete="username"
                                    required
                                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                />
                                <div id="emailErrorInvitarMiembro"></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Ingresar">
                                    Invitar
                                </button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" aria-label="Cancelar">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InvitarMiembros = () => {
    return (
        <section className="invitar-a-miembros" data-aos="fade-up">
            <img src={nuevoUsuario} alt="nuevo-usuario"/>
            <p>¿Quieres enviar una invitación a un nuevo miembro?</p>
            <button type="button" className="btn btn-personalized-1 btn-invitar-usuario fw-bold" data-bs-toggle="modal" data-bs-target="#invitarMiembro"><i className="fa-solid fa-user-plus" aria-label="Invitar Usuario"></i> Invitar Usuario</button>
            <ModalInvitarUsuario/>
        </section>
    )
}

const BuscarMiembro = () => {
    return(
        <section className="buscador" data-aos="fade-up">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" name="" id="" placeholder="Buscar..."/>
        </section>
    );
}

const ModalPrivilegiosMiembro = ({ idModal }) => {
    return (
        <div className="modal fade" id={`editarPrivilegios${idModal}`} tabIndex="-1" aria-labelledby={`editarPrivilegiosLabel${idModal}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id={`editarPrivilegiosLabel${idModal}`}>Editar Servidor</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form>
                            <div className="mb-3">
                                <label className="form-label fw-bolder w-100">Privilegios</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name={`editarPrivilegioRadioOptions${idModal}`} id={`privilegioRadio1${idModal}`} value="admin" />
                                    <label className="form-check-label" htmlFor={`privilegioRadio1${idModal}`}><i className="fa-solid fa-users-rectangle"></i> Admin.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name={`editarPrivilegioRadioOptions${idModal}`} id={`privilegioRadio2${idModal}`} value="moderador" />
                                    <label className="form-check-label" htmlFor={`privilegioRadio2${idModal}`}><i className="fa-solid fa-users-viewfinder"></i> Moderador</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name={`editarPrivilegioRadioOptions${idModal}`} id={`privilegioRadio3${idModal}`} value="comun" />
                                    <label className="form-check-label" htmlFor={`privilegioRadio3${idModal}`}><i className="fa-solid fa-users"></i> Común</label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Guardar Cambios">Guardar cambios</button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Miembro = ({id}) =>{
    const silenciarMiembro = () =>{
        Swal.fire({
            title: "Silenciar Miembro",
            text: "¿Estás seguro de silenciar miembro?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, silenciar",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Exito!",
                    text: "Miembro silenciado",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    const banearMiembro = () =>{
        Swal.fire({
            title: "Banear Miembro",
            text: "¿Estás seguro de banear miembro?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, banear",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Exito!",
                    text: "Miembro baneado",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    return(
        <article className="card-miembro" data-aos="fade-up">
            <img src={nuevoUsuario} alt="logo-miembro"/>
            <div className="descripcion-miembro">
                <h2>Celeste Severich</h2>
                <p>celeste@gmail.com</p>
            </div>
            <div className="botones-miembro">
                <button type="button" className="btn-miembro btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    id="boton-editar-servidor"
                    data-bs-toggle="modal"
                    data-bs-target={`#editarPrivilegios${id}`}><i className="fa-solid fa-user-gear"></i> Privilegios</button>
                <ModalPrivilegiosMiembro idModal={id} />
                <button className='btn-miembro btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0' onClick={silenciarMiembro}><i className="fa-solid fa-comment-slash"></i> Silenciar</button>
                <button className='btn-miembro btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0' onClick={banearMiembro}><i className="fa-solid fa-ban"></i> Banear</button>
            </div>
        </article>
    );
}

const Miembros = () => {
    return (
        <>
        <section className="cambio-de-color">
            <section className="bienvenidad-miembros">
                <h1>Miembros del servidor Radio Garka</h1>
            </section>
            <InvitarMiembros/>
            <BuscarMiembro/>
        </section>
        <section className="tus-miembros">
            <Miembro id={1}/>
            <Miembro id={2}/>
            <Miembro id={3}/>
            <Miembro id={4}/>
            <Miembro id={5}/>
            <Miembro id={6}/>
            <Miembro id={7}/>
        </section>
        </>
    );
}

export default Miembros;
