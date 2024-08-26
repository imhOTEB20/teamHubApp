import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Chat.css';
import ChatDatosUsuario from './ChatDatosUsuario';
import ChatCanal from './ChatCanal';
import ChatFooter from './ChatFooter';
import useFetch from '../hooks/useFetch';
import errorImg from '../assets/img/error.png';
import sinCanales from '../assets/img/no-chatear.png';

const EstadoChatCanales = ({ title, img }) => {
    return (
        <article className="canal-chat">
            <img className="icono" src={ img } alt=""/><p className="texto">{ title }</p><span className="notificacion"></span>
        </article>
    );
};

EstadoChatCanales.propTypes = {
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

const ServerChannels = ({ isError, channels }) => {
    if (!isError) {
        if (Object.keys(channels).length !== 0)
            return (
                <section className="canales-chat">
                    {Object.entries(channels)
                        .map(([clave, valor]) => (
                            <ChatCanal key={clave} channelData={valor} ></ChatCanal>
                        ))}
                </section>
            );
        else {
            return (
                <section className="canales-chat">
                    <EstadoChatCanales img={sinCanales} txt={"¡El servidor no tiene canales!"} />
                </section>
            );
        }
    } else {
            return (
                <section className="canales-chat">
                    <EstadoChatCanales img={errorImg} title={"¡Se produjo un error al cargar los canales!"} />
                </section>
            );
    }
};

ServerChannels.propTypes = {
    isError: PropTypes.bool.isRequired,
    channels: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.oneOf([null]),
            ]),
            server: PropTypes.number.isRequired,
            creator: PropTypes.number.isRequired,
        })
    ).isRequired,
};

const ChatHeader = ( { channelData } ) => {
    const [channels, setChannels] = useState(null);
    const pag = useRef(1);
    const loadedChannel = useRef({});
    const [reloadChannels, setReloadChannels] = useState(0);
    const [url, setUrl] = useState(`${import.meta.env.VITE_CHANNELS_API_URL}?server=${channelData.server}`);
    const {data, isError, isLoading} = useFetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        true,
        reloadChannels
    );
    useEffect(() => {
        if (data && !isError && !isLoading) {
            data.results.forEach(channel => {
                loadedChannel[channel.id] = channel;
            });
            if(data.next) {
                pag.current += 1;
                setUrl(`${import.meta.env.VITE_CHANNELS_API_URL}?server=${channelData.server}&page=${pag.current}`);
            } else {
                delete loadedChannel.current;
                setChannels(loadedChannel);
            }
        }
    }, [data, isError, isLoading])
    
    const refreshChannels = () => {
        setReloadChannels(prevReloadChannels => prevReloadChannels + 1);
    }

    if (channelData) {
        return (
            <header className='header-chat'>
                <ChatDatosUsuario/>
                <section className="canales-chat">
                    {channels ? (<ServerChannels isError={isError} channels={channels} />) : (<h3>LOADING</h3>)}
                </section>
                <ChatFooter addChannel={refreshChannels} serverID={channelData.server}/>
            </header>
        )
    }
    else {
        return (
            <section className='canales-chat'>
                <EstadoChatCanales title='Error al cargar el servidor de los canales' img={errorImg} />
            </section>
        );
    }
}
ChatHeader.propTypes = {
    channelData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null]),
        ]),
        server: PropTypes.number.isRequired,
        creator: PropTypes.number.isRequired,
    })
};
export default ChatHeader;

