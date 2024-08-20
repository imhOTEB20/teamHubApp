import Swal from 'sweetalert2';
import radioGarka from '../assets/img/cdt.jpg'
import ModalEditarCanal from "./ModalEditarCanal";
import { useState } from 'react';
import useFetch from '../hooks/useFetch';

const Canal = ({ channelData, onDelete, onEdit }) =>{
    const alertEliminarCanal = () =>{
        Swal.fire({
            title: "Eliminar Canal",
            text: "¿Estás seguro de eliminar canal?",
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
                    text: "Canal eliminado correctamente",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    return(
      <article className="card-canal" data-aos="fade-up">
        <div className="descripcion-canal">
            <h2>{channelData.name}</h2>
            <p>{channelData.description}</p>
            <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarCanal}><i className="fa-solid fa-trash"></i> Eliminar</button>
        </div>
        <div className="botones-canales">
          <button type="button" className="btn-canal btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
              id="boton-editar-canal"
              data-bs-toggle="modal"
              data-bs-target={`#editarCanalModal${channelData.id}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
          <ModalEditarCanal idModal={channelData.id}/>
          <a className="btn-canal btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ir al canal <i className="fa-solid fa-comments"></i></a>
        </div>
      </article>
    );
}

export default Canal;