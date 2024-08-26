import { useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import ChatMain from "../components/ChatMain";
import Loading from "../components/Loading";
import '../styles/Chat.css';
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Error404Main from "../components/Error404Main";

const ChatPage = () => {
    const channelParam = useParams();
    const [channelNotFound, setChannelNotFound] = useState(false);
    const { data: channelData, isError: isChannelLoadError, isLoading: isChannelLoading} = useFetch(
        `${import.meta.env.VITE_CHANNELS_API_URL}${channelParam.id}/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
    );

    useEffect(() => {
        if (isChannelLoadError && !isChannelLoading) {
            setChannelNotFound(true);
        }
    },[channelData, isChannelLoadError, isChannelLoading]);

    if (!channelNotFound) {
        if (channelData) {
            return (
                <div className="chat-mensaje">
                    <ChatHeader channelData={ channelData }/>
                    <ChatMain channelData={ channelData }/>
                </div>
            );
        } else return (<Loading title="Cargando Canal"/>);
    } else return (
        <Error404Main title={ `Canal ${channelParam.id} no encontrado`} link="/servidores/" titleLink="Ir a servidores"/>
    );
}

export default ChatPage;
