import "../styles/Footer.css";
const FooterMootMate = () => {
    return (
        <footer>
            <section className="section-footer">
                <h3>¿Por qué MootMate?</h3>
                <a href="#">Misión</a>
                <a href="#">Visión</a>
                <a href="#">Descripción</a>
                <a href="#">A cerca de...</a>
            </section>
            <section className="section-footer">
                <h3>Desarrolladores</h3>
                <a href="/desarrolladores">Cristian Geronimo</a>
                <a href="/desarrolladores">Maximiliano Soriano</a>
            </section>
            <section className="section-footer">
                <h3>Recursos</h3>
                <a href="#"><i className="lab la-github"></i> Front End</a>
                <a href="#"><i className="lab la-github"></i> MootMate</a>
                <a href="#">Institución UPATECO</a>
            </section>
            <section className="section-footer">
                <h3>MootMate</h3>
                <a href="#">Conócenos</a>
                <a href="#">Noticias</a>
                <a href="#">Ayuda</a>
                <p>MootMate@gmail.com</p>
            </section>
        </footer>
    );
}

export default FooterMootMate;