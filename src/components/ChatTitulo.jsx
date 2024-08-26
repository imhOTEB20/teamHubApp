import PropTypes from 'prop-types';
import '../styles/Chat.css';

const ChatTitulo = ({ channelName }) => {
    return (
        <section className="nombre-de-canal">
            <h2>Canal: <span className="nombre-canal"> { channelName } </span></h2>
        </section>
    );
};

ChatTitulo.propTypes = {
    channelName: PropTypes.string.isRequired
};

export default ChatTitulo;
