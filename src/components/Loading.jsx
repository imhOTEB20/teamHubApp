import PropTypes from 'prop-types';
import loading from '../assets/animations/girar.gif';

export default function Loading({ title }) {
    return (
        <section className="error">
            <article className="mensaje-error">
                <h1>{title}</h1>
            </article>
            <img src={loading} alt="LOADING" style={{ width: '300px', height: '300px' }}/>
        </section>
    );
}

Loading.propTypes = {
    title: PropTypes.string.isRequired,
};