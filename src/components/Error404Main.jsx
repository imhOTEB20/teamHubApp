import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import error404 from '../assets/img/error-404.png';
import error4042 from '../assets/img/error-404-nave.png';

export default function Error404Main({ title, titleLink, link }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(link);
    };

    return (
        <section className="error">
            <article className="mensaje-error">
                <h1>{title}</h1><img src={error404} alt="error-404" />
            </article>
            <img src={error4042} alt="error-404-nave" style={{ width: '300px', height: '300px' }}/>
            <a className="btn-volver-index" onClick={handleClick}> {titleLink}</a>
        </section>
    );
}

Error404Main.propTypes = {
    title: PropTypes.string.isRequired,
    titleLink: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};