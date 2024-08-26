import { useEffect, useReducer, useRef, useState } from "react";
import useFetch from "./useFetch";

const ACTIONS = {
    LOADING_MESSAGES: "LOADING_MESSAGES",
    MESSAGES_FAILURE: "MESSAGES_FAILURE",
    MESSAGES_SUCCESS: "MESSAGES_SUCCESS",
};

const getDateWithZone = (date) => {
    const dateTime = new Date(date);
    const dateTimeISO = dateTime.toISOString();
    const dateWithTimeZone = `${dateTimeISO.slice(0, -1)}-03:00`;

    return  dateWithTimeZone;
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOADING_MESSAGES:
            return {
                isLoadMessagesError: false,
                isLoadingMessages: true,
            };
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
    console.log(`Channel ID en useMessages: ${channelID}`);
    const [state, dispatch] = useReducer(reducer, {
        messagesData: null,
        isLoadMessagesError: false,
        isLoadingMessages: true,
    });
    const [page, setPage] = useState(1);
    const max_page = useRef(1);
    const dateMin = useRef(new Date());
    const dateInit = useRef(new Date());
    const dateMax = useRef(null);
    const allMessagesLoaded = useRef([]);

    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&page=${page}&ordering=-created_at&page_size=10`,
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
            max_page.current = Math.ceil(data.count / 10);
            console.log(`pagina max: ${max_page.current}`);
            allMessagesLoaded.current = data.results;
            dispatch({
                type: ACTIONS.MESSAGES_SUCCESS,
                payload: { messagesData: allMessagesLoaded.current }
            });

        } else if (isError && !isLoading) {
            dispatch({type: ACTIONS.MESSAGES_FAILURE});
        }
    },[data, isError, isLoading]);



    // new_messages
    const pageLastMessages = useRef(1);
    const [triggerLoadNewMessages, setTriggerLoadNewMessages] = useState(false);
    const prevList= useRef([]);
    const [urlLastMessages, setUrlLastMessages] = useState(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&ordering=-created_at&created_at_min=${getDateWithZone(dateMin.current)}&page_size=10`);

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
        dateMax.current = new Date();
        setTriggerLoadNewMessages(true);
    };

    useEffect(() => {
        if(triggerLoadNewMessages && !isLoadingLastMessages) dispatch({ type: ACTIONS.LOADING_MESSAGES });
    },[triggerLoadNewMessages, isLoadingLastMessages]);
    
    useEffect(() => {
        if (dataLastMessages && !isLoadLastMessagesError && !isLoadingLastMessages) {
            prevList.current = [...prevList.current, ...dataLastMessages.results];
            if (dataLastMessages.next) {
                pageLastMessages.current += 1;
                setUrlLastMessages(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&ordering=-created_at&created_at_min=${getDateWithZone(dateMin.current)}&created_at_max=${getDateWithZone(dateMax.current)}&page_size=10&page=${pageLastMessages.current}`);
            } else {
                allMessagesLoaded.current = [...prevList.current, ...allMessagesLoaded.current];
                dispatch({
                    type: ACTIONS.MESSAGES_SUCCESS,
                    payload: { messagesData: allMessagesLoaded.current }
                });
                dateMin.current = dateMax.current;
                setTriggerLoadNewMessages(false);
                pageLastMessages.current = 1;
                prevList.current = [];
                setUrlLastMessages(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&ordering=-created_at&created_at_min=${getDateWithZone(dateMax.current)}&page_size=10`);
            }
        } else if (isLoadLastMessagesError && !isLoadingLastMessages) {
            dispatch({ type: ACTIONS.MESSAGES_FAILURE});
        }
    },[dataLastMessages, isLoadLastMessagesError, isLoadingLastMessages, channelID]);

    // old_messages
    const [triggerLoadOldMessages, setTriggerLoadOldMessages] = useState(false);
    const [urlOldMessages, setUrlOldMessages] = useState('');
    const { data: dataOldMessages, isError: isLoadOldMessagesError, isLoading: isLoadingOldMessages} = useFetch(
        urlOldMessages,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        triggerLoadOldMessages,
    );

    const loadOldMessages = () => {
        if(page < max_page) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        if(page != 1) {
            dispatch({type: ACTIONS.LOADING_MESSAGES});
            setUrlOldMessages(`${import.meta.env.VITE_MESSAGES_API_URL}?channel=${channelID}&page=${page}&ordering=-created_at&created_at_max=${getDateWithZone(dateInit.current)}&page_size=10`);
        }
    },[page]);

    useEffect(() => {
        if(!triggerLoadOldMessages) setTriggerLoadOldMessages(true);
    },[urlOldMessages]);

    useEffect(() => {
        if(dataOldMessages && !isLoadOldMessagesError && !isLoadingOldMessages) {
            allMessagesLoaded.current = [...allMessagesLoaded.current, ...dataOldMessages.results];
            dispatch({
                type: ACTIONS.MESSAGES_SUCCESS,
                payload: { messagesData: allMessagesLoaded.current }
            });
        } else if (isLoadOldMessagesError && !isLoadingOldMessages) {
            dispatch({ type: ACTIONS.MESSAGES_FAILURE});
        }
        setTriggerLoadOldMessages(false);
    }, [dataOldMessages, isLoadOldMessagesError, isLoadingOldMessages]);
    
    return { ...state, loadNewMessages, loadOldMessages};
}

export default useMessages;