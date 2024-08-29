import PropTypes from 'prop-types';

export default function ChatEstadoMensaje ({ img, txt, detail }) {
    return (
        <article className="mensaje">
            <div className="mensaje-header">
                <div className="usuario-mensaje">
                    <img src={img} alt={txt}/>
                    <h3>{txt}</h3>
                </div>
            </div>
            <p>
                {detail}
            </p>
        </article>
    );
}

ChatEstadoMensaje.propTypes = {
    img: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
}