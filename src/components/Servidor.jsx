import radioGarka from '../assets/img/radio-garka.jpg'
import cdt from '../assets/img/cdt.jpg'
import ModalEditarServidor from './ModalEditarServidor';

const Servidor = ({id}) =>{
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

    return(
        <article className="card-servidor" data-aos="fade-up">
            <img src={radioGarka} alt="logo-server"/>
            <div className="descripcion-servidor">
                <h2>Radio Garka</h2>
                <p>69 miembros <a href="/miembros">mostrar <i className="fa-solid fa-eye"></i></a></p>
                <p>2 canales <a href="/canales">mostrar <i className="fa-solid fa-comments"></i></a></p>
                <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarServidor}><i className="fa-solid fa-trash"></i> Eliminar</button>
            </div>
            <div className="botones-servidor">
                <a className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ingresar <i className="fa-solid fa-comments"></i></a>
                <button type="button" className="btn-servidor btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    id="boton-editar-servidor"
                    data-bs-toggle="modal"
                    data-bs-target={`#editarServidorModal${id}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                <ModalEditarServidor idModal={id} />
                <button className='btn-servidor btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0' onClick={salirDelServidor}><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
            </div>
            <div className="me-encanta-lokita">
                <label className="label-me-encanta"><i className="fa-regular fa-heart"></i></label>
            </div>
        </article>
    );
}

export default Servidor;