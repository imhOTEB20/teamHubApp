import { useEffect, useReducer, useRef, useState } from "react";
import useFetch from "./useFetch";

const ACTIONS = {
    LOADING_MESSAGES: "LOADING_MESSAGES",
    NEW_MESSAGES_SUCCESS: "NEW_MESSAGES_SUCCESS",
    MESSAGES_FAILURE: "MESSAGES_FAILURE",
    MESSAGES_SUCCESS: "MESSAGES_SUCCESS",
};

const getDateWithZone = (date) => {
    const dateTime = new Date(date);
    dateTime.setHours(dateTime.getHours() - 3);
    const dateTimeISO = dateTime.toISOString();
    const dateWithTimeZone = `${dateTimeISO.slice(0, -1)}-03:00`;
    console.log(dateWithTimeZone);

    return  dateWithTimeZone;
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOADING_MESSAGES:
            return {
                isLoadMessagesError: false,
                isLoadingMessages: true,
            };
        case ACTIONS.NEW_MESSAGES_SUCCESS:
            return {
                newMessagesData: action.payload.newMessagesData,
                isLoadLastMessagesError: false,
                isLoadingMessages: false,
            }
        case ACTIONS.MESSAGES_SUCCESS:
            return {
                messagesData: action.payload.messagesData,
                isLoadMessagesError: false,
                isLoadingMessages: false,
            };
        case ACTIONS.MESSAGES_FAILURE:
            return {
                isLoadMessagesError: true,
                isLoadingMessages: false,
            };
        default:
            return state;
    }
}

function useMessages(channelID) {
    //first_load
    const [state, dispatch] = useReducer(reducer, {
        messagesData: null,
        newMessagesData: null,
        isLoadMessagesError: false,
        isLoadingMessages: true,
    });
    const page = useRef(1);
    const dateMin = useRef(new Date());
    const allMessagesLoaded = useRef({});
    const [url, setUrl] = useState(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&page=${page.current}&ordering=created_at&page_size=20&created_at_max=${getDateWithZone(dateMin.current)}`);

    const { data, isError, isLoading } = useFetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
    );

    useEffect(() => {
        if(data && !isError && !isLoading) {
            data.results.forEach((message) => {
                allMessagesLoaded[message.id] = message;
            });
            if(data.next) {
                page.current = page.current + 1;
                setUrl(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&page=${page.current}&ordering=created_at&page_size=20&created_at_max=${getDateWithZone(dateMin.current)}`);
            } else {
                delete allMessagesLoaded.current;
                dispatch({
                    type: ACTIONS.MESSAGES_SUCCESS,
                    payload: { messagesData: allMessagesLoaded }
                });
            }
        } else if (isError && !isLoading) {
            dispatch({type: ACTIONS.MESSAGES_FAILURE});
        }
    },[data, isError, isLoading]);



    // new_messages
    const [triggerLoadNewMessages, setTriggerLoadNewMessages] = useState(false);
    const [urlLastMessages, setUrlLastMessages] = useState(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&ordering=created_at&page_size=10&created_at_min=${getDateWithZone(dateMin.current)}`);
    const newMessagesLoaded = useRef({});
    const { data: dataLastMessages, isError: isLoadLastMessagesError, isLoading: isLoadingLastMessages} = useFetch(
        urlLastMessages,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        triggerLoadNewMessages,
    );

    const loadNewMessages = () => {
        setUrlLastMessages(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&ordering=created_at&page_size=10&created_at_min=${getDateWithZone(dateMin.current)}`);
        setTriggerLoadNewMessages(true);
    };

    useEffect(() => {
        if(triggerLoadNewMessages && !isLoadingLastMessages) dispatch({ type: ACTIONS.LOADING_MESSAGES });
    },[triggerLoadNewMessages, isLoadingLastMessages]);
    
    useEffect(() => {
        if (dataLastMessages && !isLoadLastMessagesError && !isLoadingLastMessages) {
            console.log(dataLastMessages.results);
            dataLastMessages.results.forEach((message) => {
                newMessagesLoaded[message.id] = message;
            });
            delete newMessagesLoaded.current;
            console.log(dateMin.current);
            setTriggerLoadNewMessages(false);
            dispatch({
                type: ACTIONS.NEW_MESSAGES_SUCCESS,
                payload: { newMessagesData: newMessagesLoaded }
            });
        } else if (isLoadLastMessagesError && !isLoadingLastMessages) {
            dispatch({ type: ACTIONS.MESSAGES_FAILURE});
        }
    },[dataLastMessages, isLoadLastMessagesError, isLoadingLastMessages, channelID]);
    
    return { ...state, loadNewMessages };
}

export default useMessages;