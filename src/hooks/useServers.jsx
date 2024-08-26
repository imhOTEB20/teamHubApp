import { useEffect, useReducer, useRef, useState } from "react";
import useFetch from "./useFetch";

const ACTIONS = {
    LOADING_SERVERS: "LOADING_SERVERS",
    SERVERS_FAILURE: "SERVERS_FAILURE",
    SERVERS_SUCCESS: "SERVERS_SUCCESS"
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOADING_SERVERS:
            return {
                isErrorServers: false,
                isLoadingServers: true,
            };
        case ACTIONS.SERVERS_SUCCESS:
            return {
                serversData: action.payload.serversData,
                isErrorServers: false,
                isLoadingServers: false,
            };
        case ACTIONS.SERVERS_FAILURE:
            return {
                isErrorServers: true,
                isLoadingServers: false,
            };
        default:
            return state;
    }
}

function useServers(trigger = false) {
    const [state, dispatch] = useReducer(reducer, {
        serversData: null,
        isErrorServers: false,
        isLoadingServers: true,
    });

    const [url, setUrl] = useState(import.meta.env.VITE_SERVER_API_URL);
    const page = useRef(1);
    const serversData = useRef({});
    const { data, isError, isLoading} = useFetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        trigger
    );

    useEffect(() => {
        page.current += 1;
    },[url])

    useEffect(() => {
        if(trigger) dispatch({ type: ACTIONS.LOADING_SERVERS });
    },[trigger]);

    useEffect(() => {
        if(data && !isError && !isLoading) {
            data.results.forEach(server => {
                serversData[server.id] = server;
            });
            if (data.next) {
                setUrl(`${import.meta.env.VITE_SERVER_API_URL}?page=${page.current}`);
            } else {
                delete serversData.current;
                dispatch({
                    type: ACTIONS.SERVERS_SUCCESS,
                    payload: { serversData },
                });
            }
        } else if (isError && !isLoading) {
            dispatch({ type: ACTIONS.SERVERS_FAILURE});
        }
    },[data, isError, isLoading]);
    
    return state;
}

export default useServers;