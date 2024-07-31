import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Welcome.css'

import addServer from '../assets/crear_servidor.png'
import joinServer from '../assets/unirse_servidor.png'
import CreatorServer from './CreatorServer';
import Footer from './Footer';
import MainHeader from './MainHeader';

function Welcome({ name }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
        <MainHeader />
        <main>
            <section className="cambio-de-color">
                <section className="bienvenida-usuario">
                    <h1>¡Bienvenido {name}!</h1>
                </section>
                <section className="agregar-servidor">
                    <img src={addServer} alt="nuevo-servidor"/>
                    <p>¿Quieres usar TeamHub con un nuevo equipo?</p>
                    <label className="btn-agregar-servidor" htmlFor="btn-modal-crear" onClick={openModal}>Crear nuevo servidor</label>
                </section>
                <CreatorServer isOpen={isModalOpen} onClose={closeModal} />
                <section className="unirme-a-servidores">
                    <img src={joinServer} alt="nuevo-servidor"/>
                    <p>¿Quieres buscar un nuevo equipo en TeamHub?</p>
                    <a className="btn-agregar-servidor" href="servidores.html">Servidores</a>
                </section>
                <section className="titulo-tus-servidores">
                    <h2>¡Tus servidores!</h2>
                </section>
            </section>
        </main>
        <Footer/>
        </>
    );
}

Welcome.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Welcome;