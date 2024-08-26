import PropTypes from 'prop-types';

import '../styles/Chat.css';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';

const ChatCanal = ({ channelData }) => {
    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelData.id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
    );
    const [notify, setNotify] = useState(0);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/canales/${channelData.id}`);
    }

    useEffect(() => {
        if (data && !isError && !isLoading) {
            setNotify(data.count);
        }
    },[data, isError, isLoading]);
    return (
        <article className="canal-chat" onClick={handleClick}>
            <p className="texto">{channelData.name}</p><span className="notificacion">{notify}</span>
        </article>
    );
};

ChatCanal.propTypes = {
    channelData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null]),
        ]),
        server: PropTypes.number.isRequired,
        creator: PropTypes.number.isRequired,
    })
};

export default ChatCanal;
