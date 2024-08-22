import PropTypes from 'prop-types';

export default function EstadoCanales({ img, txt}) {
    return (
        <article className="card-canal" data-aos="fade-up">
        <img src={img} alt="logo-miembro"/>
        <div className="descripcion-canal">
            <h2>{txt}</h2>
        </div>
      </article>
    );
}

EstadoCanales.propTypes = {
    img: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired,
};