import ModalEditarServidor from './ModalEditarServidor';

const Servidor = ({id, data}) =>{
    const alertEliminarServidor = () =>{
        Swal.fire({
            title: "Eliminar Servidor",
            text: "¿Estás seguro de eliminar servidor?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, eliminar",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "Servidor eliminado correctamente",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    const salirDelServidor = () =>{
        Swal.fire({
            title: "Salir Servidor",
            text: "¿Estás seguro de salir servidor?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, salir",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "Abandonaste el servidor correctamente",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }
    const icon = JSON.parse(data).icon;
    const serverName = JSON.parse(data).name;
    const members = JSON.parse(data).members;
    //const canales = realizar consulta en members filtrado por servidor
    return(
        <article key={id} className="card-servidor" data-aos="fade-up">
            <img src={icon} alt="logo-server"/>
            <div className="descripcion-servidor">
                <h2>{serverName}</h2>
                <p> {members.length} <a href="/miembros">mostrar <i className="fa-solid fa-eye"></i></a></p>
                <p>falta implementar <a href="/canales">mostrar <i className="fa-solid fa-comments"></i></a></p>
                <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarServidor}><i className="fa-solid fa-trash"></i> Eliminar</button>
            </div>
            <div className="botones-servidor">
                <a className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ingresar <i className="fa-solid fa-comments"></i></a>
                <button type="button" className="btn-servidor btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    id="boton-editar-servidor"
                    data-bs-toggle="modal"
                    data-bs-target={`#editarServidorModal${id}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                <ModalEditarServidor idModal={id} />
                <button className='btn-servidor btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0' onClick={salirDelServidor}><i className="fa-solid fa-right-from-bracket"></i> Salir</button>
            </div>
            <div className="me-encanta-lokita">
                <label className="label-me-encanta"><i className="fa-regular fa-heart"></i></label>
            </div>
        </article>
    );
}

export default Servidor;