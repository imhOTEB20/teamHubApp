import '../styles/Chat.css';
import ChatModalEditarMensaje from "./ChatModalEditarMensaje";
import maxiSoriano from '../assets/img/maxi-soriano.jpg';

const ChatMensaje = ({idMensaje}) => {
    return (
        <article className="mensaje">
            <div className="mensaje-header">
                <div className="usuario-mensaje">
                    <img src={maxiSoriano} alt="usuario"/>
                    <h3>Mia Khalifa</h3>
                </div>
                <div className="btns-mensaje">
                    <button type="button" className="btn-mensaje btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    id="boton-editar-canal"
                    data-bs-toggle="modal"
                    data-bs-target={`#editarMesajeModal${idMensaje}`}><i className="fa-solid fa-pen-to-square"></i></button>
                    <ChatModalEditarMensaje idMensaje={idMensaje}/>
                    <button type="button" className="btn-mensaje btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    ><i className="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda impedit harum architecto, eius inventore amet sed beatae deleniti voluptatem a! In labore neque illo exercitationem. Fugiat repellendus in quo optio!
            </p>
        </article>
    );
}

export default ChatMensaje;
