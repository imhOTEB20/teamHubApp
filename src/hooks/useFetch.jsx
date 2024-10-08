import { useEffect, useReducer } from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                isError: false,
                isLoading: true,
            };
        case ACTIONS.FETCH_SUCCESS:
            return {
                data: action.payload.data,
                isError: false,
                isLoading: false,
            };
        case ACTIONS.FETCH_FAILURE:
            return {
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

function useFetch(url, options = {}, trigger = true, reload = 0) {
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        isError: false,
        isLoading: true,
    });

    useEffect(() => {
        if (trigger) {
            dispatch({ type: ACTIONS.FETCH_INIT });

            fetch(url, { ...options })
                .then((response) => {
                    if (response.ok && response.status !== 204) {
                        return response.json();
                    }
                    else if(response.status === 204) {
                        return null;
                    }
                    throw Error("Error al relizar la petición. " + response.statusText);
                })
                .then((data) => {
                    dispatch({
                        type: ACTIONS.FETCH_SUCCESS,
                        payload: { data },
                    });
                })
                .catch((e) => {
                    dispatch({ type: ACTIONS.FETCH_FAILURE });
                    console.log(e);
                });
        }
    }, [url, trigger, reload]);

    return state;
}

export default useFetch;