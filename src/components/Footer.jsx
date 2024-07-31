import "../styles/Footer.css";
const Footer = (props) => {
    return (
        <footer>
            <section className="section-footer">
                <h3>¿Por qué {props.nombre}?</h3>
                <a href="#">Misión</a>
                <a href="#">Visión</a>
                <a href="#">Descripción</a>
                <a href="#">A cerca de...</a>
            </section>
            <section className="section-footer">
                <h3>Desarrolladores</h3>
                <p>Cristian Geronimo</p>
                <p>Maximiliano Soriano</p>
            </section>
            <section className="section-footer">
                <h3>Recursos</h3>
                <a href="#"><i className="lab la-github"></i> Front End</a>
                <a href="#"><i className="lab la-github"></i> {props.nombre}</a>
                <a href="#">Institución UPATECO</a>
            </section>
            <section className="section-footer">
                <h3>{props.nombre}</h3>
                <a href="#">Conócenos</a>
                <a href="#">Noticias</a>
                <a href="#">Ayuda</a>
                <p>{props.nombre}@gmail.com</p>
            </section>
        </footer>
    );
}

export default Footer;