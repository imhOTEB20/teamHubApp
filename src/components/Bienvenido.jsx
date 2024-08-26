import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ModalCrearServidor from './ModalCrearServidor';
import Servidor from './Servidor';
import EstadoServidores from './EstadoServidores';
import useServers from '../hooks/useServers';
import useAuth from '../hooks/useAuth';

import '../styles/Bienvenido.css';
import nuevoServidor from '../assets/img/new-server.png';
import buscarServidor from '../assets/img/new-server-1.png';
import sinServidores from '../assets/img/no-chatear.png';
import error404 from '../assets/img/error.png';
import loading from '../assets/animations/girar.gif';
import useFetch from '../hooks/useFetch';

const AgregarServidor = ({ agregarServidor }) => {
    return(
        <section className="agregar-servidor" data-aos="fade-down">
            <img src={nuevoServidor} alt="nuevo-servidor"/>
            <p>¿Quieres usar MootMate con un nuevo equipo?</p>
            <button type="button" className="btn btn-personalized-1 btn-agregar-servidor fw-bold" data-bs-toggle="modal" data-bs-target="#agregarServidorModal"><i className="fa-solid fa-circle-plus" aria-label="Agregar Servidor"></i> Crear Servidor</button>
            <ModalCrearServidor agregarServidor={ agregarServidor }/>
        </section>
    );
}

const BuscarServidor = () =>{
    return(
        <section className="unirme-a-servidores" data-aos="fade-down">
            <img src={buscarServidor} alt="buscar-servidor"/>
            <p>¿Quieres buscar un nuevo equipo en MootMate?</p>
            <a className="btn btn-personalized-1 fw-bold .link-unirme-servidor" href="/servidores/">Servidores</a>
        </section>
    );
};

const TusServidores = ({ isError, servers, onDelete, onEdit}) => {
    if (!isError) {
        if (Object.keys(servers).length !== 0)
            return (
                <section className='tus-servidores'>
                    {Object.entries(servers)
                        .map(([clave, valor]) => (
                            <Servidor key={clave} serverData={valor} onDelete={onDelete} onExit={onDelete} onEdit={onEdit}></Servidor>
                        ))}
                </section>
                );
        else {
            return (
                <section className='tus-servidores'>
                    <EstadoServidores img={sinServidores} txt={"¡No perteneces a ningun servidor!"} />
                </section>
            );
        }
    } else {
        return (
            <EstadoServidores img={error404} txt={"¡Se produjo un error al cargar los servidores!"} />
        );
    }
}

const Bienvenido = () => {
    const { profileData } = useAuth();

    const firstName = profileData.first_name;
    const lastName = profileData.last_name;
    const userId = profileData.user__id;
    
    const [triggerLoadServer, setTriggerLoadServer] = useState(false);
    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_SERVER_API_URL}?members=${userId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        triggerLoadServer
    );
    const storedServer = localStorage.getItem('myServers');
    console.log(JSON.parse(storedServer));
    const [servers, setServers] = useState(storedServer ? JSON.parse(storedServer) : null);

    useEffect(() => {
        if(localStorage.getItem('myServers') === null) {
            setTriggerLoadServer(true);
        }
    }, []);
    
    useEffect(() => {
        if(data && !isError && !isLoading) {
            const loadedServers = {};
            data.results.forEach(server => {
                loadedServers[server.id] = server;
            });
            localStorage.setItem('myServers', JSON.stringify(loadedServers));
            setServers(loadedServers);
        }
    },[data, isError, isLoading]);

    const deleteServers = (idServer) => {
        const loadedServers = { ...servers };
        delete loadedServers[idServer];
        setServers(loadedServers);
    }
    
    const addServer = (server) => {
        const loadedServers = { ...servers };
        loadedServers[server.id] = server;
        setServers(loadedServers);
    }

    const editServers = (serverData) => {
        const loadedServers = { ...servers };
        loadedServers[serverData.id]["name"] = serverData.name;
        loadedServers[serverData.id]["description"] = serverData.description;
        loadedServers[serverData.id]["icon"] = serverData.icon;

        setServers(loadedServers);
    }
    
    return(
        <section className="cambio-de-color">
            <section className="bienvenida-usuario" data-aos="fade-down">
                <h1 id="bienvenida">{`${firstName} ${lastName}`}</h1>
            </section>
            <AgregarServidor agregarServidor={ addServer }/>
            <BuscarServidor/>
            <section className="titulo-tus-servidores">
                <h2>¡Tus servidores!</h2>
            </section>
            {servers !== null ? (<TusServidores isError={isError} servers={servers} onDelete={deleteServers} onEdit={editServers}/>) : (<EstadoServidores img={loading} txt={"Cargando tus servidores"}/>)}
        </section>
    );
};

AgregarServidor.propTypes = {
    agregarServidor: PropTypes.func.isRequired,
};

TusServidores.propTypes = {
    isError: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    servers: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.oneOf([null])
            ]),
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.oneOf([null])
            ]),
            owner: PropTypes.number.isRequired,
            members: PropTypes.array.isRequired
        })
    ).isRequired
};

export default Bienvenido;