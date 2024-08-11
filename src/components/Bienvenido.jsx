import '../styles/Bienvenido.css';
import nuevoServidor from '../assets/img/new-server.png';
import buscarServidor from '../assets/img/new-server-1.png';
import sinServidores from '../assets/img/no-chatear.png';
import error404 from '../assets/img/error.png';
import ModalCrearServidor from './ModalCrearServidor';
import Servidor from './Servidor';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';


const AgregarServidor = () => {
    return(
        <section className="agregar-servidor" data-aos="fade-down">
            <img src={nuevoServidor} alt="nuevo-servidor"/>
            <p>¿Quieres usar MootMate con un nuevo equipo?</p>
            <button type="button" className="btn btn-personalized-1 btn-agregar-servidor fw-bold" data-bs-toggle="modal" data-bs-target="#agregarServidorModal"><i className="fa-solid fa-circle-plus" aria-label="Agregar Servidor"></i> Agregar Servidor</button>
            <ModalCrearServidor/>
        </section>
    );
}

const BuscarServidor = () =>{
    return(
        <section className="unirme-a-servidores" data-aos="fade-down">
            <img src={buscarServidor} alt="buscar-servidor"/>
            <p>¿Quieres buscar un nuevo equipo en MootMate?</p>
            <a className="btn btn-personalized-1 fw-bold .link-unirme-servidor" href="#">Servidores</a>
        </section>
    );
}

const NoHayServidores = () =>{
    return(
        <section className="ningun-servidor" id="vacio" data-aos="flip-left">
            <img src={sinServidores} alt="no-perteneces-a-ningun-server"/>
            <h3>¡No perteneces a ningun servidor!</h3>
        </section>
    );
}

const ErrorAlCargarServidores = () =>{
    return(
        <section className="ningun-servidor" id="vacio" data-aos="flip-left">
            <img src={error404} alt="no-perteneces-a-ningun-server"/>
            <h3>¡Se produjo un error al cargar los servidores!</h3>
        </section>
    );
}

const Servidores = ({ servers, onDelete }) => {
    if (Object.keys(servers).length !== 0)
        return (
            <section className='tus-servidores'>
                {Object.entries(servers)
                    .map(([clave, valor]) => (
                        <Servidor key={clave} idServidor={clave} dataServer={valor} onDelete={onDelete}></Servidor>
                    ))}
            </section>
            );
    else {
        return (
            <section className='tus-servidores'>
                <NoHayServidores />
            </section>
        );
    }
}

const Bienvenido = () => {
    const { profileData } = useAuth();
    const parsedData = JSON.parse(profileData);

    const firstName = parsedData.first_name;
    const lastName = parsedData.last_name;
    const userId = parsedData.user__id;
    
    const [servers, setServers] = useState({});
    const { data, isError, isLoading} = useFetch(
        import.meta.env.VITE_SERVER_API_URL,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
    );

    useEffect(() => {
        if(data && !isError && !isLoading) {
            const loadedServers = {};
            data.results.forEach(server => {
                if(server.owner === userId || server.members.includes(userId)) {
                    loadedServers[server.id] = server;
                }
            });
            setServers(loadedServers);
        }
    },[data]);

    const deleteServer = (idServer) => {
        const loadedServers = { ...servers };
        delete loadedServers[idServer];
        setServers(loadedServers);
    } 

    if(data) {
        return(
            <section className="cambio-de-color">
                <section className="bienvenida-usuario" data-aos="fade-down">
                    <h1 id="bienvenida">{`${firstName} ${lastName}`}</h1>
                </section>
                <AgregarServidor/>
                <BuscarServidor/>
                <section className="titulo-tus-servidores">
                    <h2>¡Tus servidores!</h2>
                </section>
                <Servidores servers={servers} onDelete={deleteServer}/>
            </section>
        );
    }
}

export default Bienvenido;