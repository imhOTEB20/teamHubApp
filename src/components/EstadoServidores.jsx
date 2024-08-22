import PropTypes from 'prop-types';

export default function EstadoServidores({ img, txt}) {
    return(
        <section className="ningun-servidor" id="vacio" data-aos="flip-left">
            <img src={img} alt="no-perteneces-a-ningun-server"/>
            <h3>{txt}</h3>
        </section>
    );
}

EstadoServidores.propTypes = {
    img: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired,
};