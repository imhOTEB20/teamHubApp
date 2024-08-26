import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import ModalCrearCanal from './ModalCrearCanal';
import '../styles/Chat.css';

const ChatFooter = ({ addChannel, serverID }) => {
    const navigate = useNavigate();
    const handleClickServers = () => {
        navigate('/servidores/')
    };

    return (
        <section className="footer-header">
            <article type="button" className="canal-chat" data-bs-toggle="modal" data-bs-target="#agregarCanalModal">
                <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <i className="fa-solid fa-plus"></i>
                    <p className="texto" style={{ margin: '0px 0px 0px 10px'}}>Nuevo Canal</p>
                </a>
            </article>
            <ModalCrearCanal addChannel={addChannel} serverID={serverID}/>
            <article className="canal-chat" onClick={handleClickServers}>
                <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <i className="fa-solid fa-door-open"></i>
                    <p className="texto" style={{ margin: '0px 0px 0px 10px'}}>Servidores</p>
                </a>
            </article>
        </section>
    );
}

ChatFooter.propTypes = {
    addChannel: PropTypes.func.isRequired,
    serverID: PropTypes.number.isRequired,
};

export default ChatFooter;
