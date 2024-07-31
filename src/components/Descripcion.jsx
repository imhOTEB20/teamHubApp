import '../styles/Descripcion.css';

const Descripcion = () => {
    return (
        <>
        <section id="Nosotros" className="descripcion-app-1">
            <artlcle className="imagen-descripcion" data-aos="fade-left">
            </artlcle>
            <artlcle className="descripcion" data-aos="fade-right">
                <h2>Crea un lugar solo para tus miembros en el que encajes</h2>
                <p>Este espacio es tuyo para explorar tus intereses, compartir tus pasiones y conectar con personas que comparten tus mismos gustos. Únete a conversaciones animadas, participa en eventos emocionantes y forma parte de una comunidad vibrante y acogedora.</p>
            </artlcle>
        </section>
        <section className="descripcion-app-2">
            <artlcle className="descripcion" data-aos="fade-left">
                <h2>Descubre un rincón exclusivo para nuestros miembros</h2>
                <p>Sumérgete en una experiencia única y forma parte de una comunidad donde tu voz y tus intereses importan.</p>
            </artlcle>
            <artlcle className="imagen-descripcion" data-aos="fade-right">
            </artlcle>
        </section>
        <section className="descripcion-app-3">
            <artlcle className="imagen-descripcion" data-aos="fade-left">
            </artlcle>
            <artlcle className="descripcion" data-aos="fade-right">
                <h2>Adéntrate en un rincón exclusivo para nuestros miembros</h2>
                <p>Donde tus pasiones se unen con personas afines. ¡Únete y forma parte de esta comunidad única!</p>
            </artlcle>
        </section>
        </>
    );
}

export default Descripcion;