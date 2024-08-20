import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import Servidor from "../components/Servidor";
import EstadoServidores from "../components/EstadoServidores";

import useServers from "../hooks/useServers";

import sinServidores from '../assets/img/no-chatear.png';
import error404 from '../assets/img/error.png';
import loading from '../assets/animations/girar.gif';

const AllServers = ({ isError, servers, onDelete, onEdit}) => {
    if (!isError) {
        if (Object.keys(servers).length !== 0)
            return (
                <section className='tus-servidores'>
                    {Object.entries(servers)
                        .map(([clave, valor]) => (
                            <Servidor key={clave} idServidor={clave} serverData={valor} onDelete={onDelete} onEdit={onEdit}></Servidor>
                        ))}
                </section>
                );
        else {
            return (
                <section className='tus-servidores'>
                    <EstadoServidores img={sinServidores} txt={"No existen servidores, crea uno!!!"} />
                </section>
            );
        }
    } else {
        return (
            <EstadoServidores img={error404} txt={"Error al cargar los servidores"} />
        );
    }
};

const TodosLosServidores = () => {
    const { serversData, isErrorServers, isLoadingServers } = useServers(true);
    const [servers, setServers] = useState(null);

    useEffect(() => {
        if(serversData && !isErrorServers && !isLoadingServers) {
            localStorage.setItem('allServers', JSON.stringify(serversData));
            setServers(serversData);
        }
    },[serversData]);

    const deleteServers = (idServer) => {
        const loadedServers = { ...servers };
        delete loadedServers[idServer];
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
            <section className="titulo-tus-servidores">
                <h2>¡Todos los servidores!</h2>
            </section>
            {servers !== null ? (<AllServers isError={isErrorServers} servers={servers} onDelete={deleteServers} onEdit={editServers}/>) : (<EstadoServidores img={loading} txt={"Cargando todos Servidores"} />)}
        </section>
    );
};

export default TodosLosServidores;

AllServers.propTypes = {
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
    ).isRequired,
};