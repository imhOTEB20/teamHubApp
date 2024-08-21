import canalAgregar from '../assets/img/canal.png'
import radioGarka from '../assets/img/cdt.jpg'
import "../styles/Canales.css";
import ModalCrearCanal from './ModalCrearCanal';
import ModalEditarCanal from "./ModalEditarCanal";

const AgregarCanal = () => {
  return (
    <section className="agregar-canal">
        <img src={canalAgregar} alt="nuevo-canal"/>
        <p>¿Quieres crear un nuevo canal en Radio Garka?</p>
        <button type="button" className="btn btn-personalized-1 btn-agregar-canal fw-bold" data-bs-toggle="modal" data-bs-target="#agregarCanalModal"><i className="fa-solid fa-circle-plus" aria-label="Agregar Canal"></i> Agregar Canal</button>
        <ModalCrearCanal/>
    </section>
  )
}

const BuscarCanal = () => {
  return(
      <section className="buscador" data-aos="fade-up">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="search" name="" id="" placeholder="Buscar..."/>
      </section>
  );
}

const CanalGeneral = () =>{
  return(
    <article className="card-canal" data-aos="fade-up">
      <i className="fa-solid fa-hashtag"></i>
      <div className="descripcion-canal">
          <h2>General</h2>
          <p>Chat general de Radio Garka</p>
      </div>
      <div className="botones-canales">
        <button type="button" className="btn-canal btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
            id="boton-editar-canal"
            data-bs-toggle="modal"
            data-bs-target={`#editarCanalModal${"ChatGeneral"}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
        <ModalEditarCanal idModal={"ChatGeneral"}/>
        <a className="btn-canal btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ir a servidor <i className="fa-solid fa-comments"></i></a>
      </div>
      <div className="me-encanta-lokita">
          <label className="label-me-encanta"><i className="fa-solid fa-heart"></i></label>
      </div>
  </article>
  );
}

const Canal = ({idCanal}) =>{
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
      <img src={radioGarka} alt="logo-miembro"/>
      <div className="descripcion-canal">
          <h2>Cosas de Trolazo</h2>
          <p>Canal echo para realizar aportes al CDT y debatir sobre los ya existentes.</p>
          <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarCanal}><i className="fa-solid fa-trash"></i> Eliminar</button>
      </div>
      <div className="botones-canales">
        <button type="button" className="btn-canal btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
            id="boton-editar-canal"
            data-bs-toggle="modal"
            data-bs-target={`#editarCanalModal${idCanal}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
        <ModalEditarCanal idModal={idCanal}/>
        <a className="btn-canal btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ir a servidor <i className="fa-solid fa-comments"></i></a>
      </div>
      <div className="me-encanta-lokita">
          <label className="label-me-encanta"><i className="fa-solid fa-heart"></i></label>
      </div>
    </article>
  );
}


const Canales = () => {
  return (
    <>
    <section className="cambio-de-color">
        <section className="bienvenida-canales">
            <h1>Canales del servidor Radio Garka</h1>
        </section>
        <AgregarCanal/>
        <BuscarCanal/>
    </section>
    <section className="tus-canales">
      <CanalGeneral/>
      <Canal idCanal={1}/>
      <Canal idCanal={2}/>
      <Canal idCanal={3}/>

    </section>
    </>
  )
}

export default Canales;
