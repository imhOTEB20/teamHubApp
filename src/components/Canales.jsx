import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import canalAgregar from '../assets/img/canal.png'
import "../styles/Canales.css";
import ModalCrearCanal from './ModalCrearCanal';
import Canal from './Canal';
import useAuth from '../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import useServers from '../hooks/useServers';

import errorNave404 from '../assets/img/error-404-nave.png';
import error404 from '../assets/img/error-404.png';
import cargandoServidor from '../assets/animations/girar.gif';
import sinCanales from '../assets/img/no-chatear.png';
import loading from '../assets/animations/girar.gif';

import '../styles/error.css';
import useFetch from '../hooks/useFetch';
import EstadoCanales from './EstadoCanales';

const AgregarCanal = ({ addChannel, serverData }) => {

  return (
    <>
    <button
      type="button"
      className="btn btn-personalized-1 btn-agregar-canal fw-bold"
      data-bs-toggle="modal"
      data-bs-target="#agregarCanalModal"
    >
      <i className="fa-solid fa-circle-plus" aria-label="Agregar Canal"></i>
      Agregar Canal
    </button>
    {serverData!=null ? (<ModalCrearCanal addChannel={addChannel} serverID={serverData.id}/>) : null}
    </>
  );
};

const ServerChannels = ({ isError, serverOwner, channels, onDelete, onEdit }) => {
  if (!isError) {
    if (Object.keys(channels).length !== 0)
        return (
            <section className='tus-canales'>
                {Object.entries(channels)
                    .map(([clave, valor]) => (
                        <Canal key={clave} serverOwner={serverOwner} channelData={valor} onDelete={onDelete} onEdit={onEdit}></Canal>
                    ))}
            </section>
            );
    else {
        return (
            <section className='tus-servidores'>
                <EstadoCanales img={sinCanales} txt={"¡El servidor no tiene canales!"} />
            </section>
        );
    }
  } else {
    return (
        <EstadoCanales img={error404} txt={"¡Se produjo un error al cargar los canales!"} />
    );
  }
};

const ServidorNoEncontrado = () => {
  const navigate = useNavigate();
  return (
    <section className="error">
      <article className="mensaje-error">
        <h1>Servidor no encontrado</h1>
      </article>
        <img src={errorNave404} alt="error-404-nave" style={{width: '300px', height: '300px'}} />
        <a className="btn-volver-index" onClick={() => {navigate("/servidores/")}}> Volver al menu servidores</a>
    </section>
  );
};

const CargandoServidor = () => {
  return (
    <section className="error">
      <article className="mensaje-error">
        <h1>Cargando</h1>
      </article>
        <img src={cargandoServidor} alt="error-404-nave" style={{width: '300px', height: '300px'}} />
    </section>
  );
};

const Canales = () => {
  const paramServerID = useParams().id;
  const allServers = useRef(JSON.parse(localStorage.getItem('allServers')));
  const [serverData, setServerData] = useState(allServers.current[paramServerID] !== undefined ? allServers.current[paramServerID] : null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [triggerLoadServer, setTriggerLoadServer] = useState(false);
  const {serversData, isErrorServers, isLoadingServers} = useServers(triggerLoadServer);
  const [loadChannels, setLoadChannels] = useState(false);
  const [channels, setChannels] = useState(null);
  const [reload, setReload] = useState(0);
  const { data, isError, isLoading } = useFetch(
    `${import.meta.env.VITE_CHANNELS_API_URL}?server=${serverData.id}`,
    {
      method: 'GET',
      headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
      }
    },
    loadChannels,
    reload
  );

  useEffect(() => {
    if (serverData === null) {
      setTriggerLoadServer(true);
    } else {
      setLoadChannels(true);
    }
  },[]);

  useEffect(() => {
    if (serversData && !isErrorServers && !isLoadingServers) {
      allServers.current = serversData;
      localStorage.setItem('allServers', JSON.stringify(serversData));
      if (allServers.current[paramServerID] !== undefined) {
        setServerData(allServers.current[paramServerID]);
        setLoadChannels(true);
      } else {
        setIsNotFound(true);
      }
    }
  },[serversData, isErrorServers, isLoadingServers]);

  useEffect(() => {
    if(data && !isError && !isLoading) {
      const loadedChannels = {};
      data.results.forEach((channel => {
        loadedChannels[channel.id] = channel;
      }));
      setChannels(loadedChannels);
    }
  },[data, isError, isLoading]);

  const handleEditChannel = (channelData) => {
    const loadedChannels = { ...channels };
    loadedChannels[channelData.id]["name"] = channelData.name;
    loadedChannels[channelData.id]["description"] = channelData.description;

    setChannels(loadedChannels);
  }

  const handleAddOrDeleteChannel = () => {
    setReload(reload + 1);
  }

  if (!isNotFound) {
    if (serverData !== null) {
      return (
        <>
        <section className="cambio-de-color">
          <section className="bienvenida-canales">
            <h1>{serverData != null ? `Canales del servidor ${serverData.name}` : "LOADING"}</h1>
          </section>
          <section className="agregar-canal">
            <img src={canalAgregar} alt="nuevo-canal"/>
            <p>{serverData != null ? `¿Quieres crear un nuevo canal en ${serverData.name}?` : "LOADING"}</p>
            {serverData !== null ? (<AgregarCanal addChannel={handleAddOrDeleteChannel} serverData={serverData} />) : (<></>)}
          </section>
        </section>
        { channels !== null ? (<ServerChannels isError={isError} serverOwner={serverData.owner} channels={channels} onDelete={handleAddOrDeleteChannel} onEdit={handleEditChannel}/>) : (<EstadoCanales img={loading} txt={'Cargando Canales'} />)}
        </>
      );
    } else {
      return (
        <CargandoServidor />
      );
    }
  } else {
    return (
      <ServidorNoEncontrado />
    );
  }
};

AgregarCanal.propTypes = {
  serverName: PropTypes.string.isRequired,
  serverID: PropTypes.string.isRequired,
  addChannel: PropTypes.func.isRequired,
};

Canales.propTypes = {
  serverName: PropTypes.string.isRequired,
}

ServerChannels.propTypes = {
  isError: PropTypes.bool.isRequired,
  channels: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      server: PropTypes.number.isRequired,
      creator: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Canales;