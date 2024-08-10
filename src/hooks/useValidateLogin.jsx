import { useReducer, useEffect } from "react";

const ACTIONS = {
    SET_USERNAME: "SET_USERNAME",
    SET_PASSWORD: "SET_PASSWORD",
    SET_VALIDITY: "SET_VALIDITY",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        case ACTIONS.SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case ACTIONS.SET_VALIDITY:
            return {
                ...state,
                isValid: action.payload,
            };
        default:
            return state;
    }
}

function useValidateLogin(validateUsername, validatePassword) {
    const [state, dispatch] = useReducer(reducer, {
        username: "",
        password: "",
        isValid: false,
    });

    useEffect(() => {
        const isValid = validateUsername(state.username) && validatePassword(state.password);
        dispatch({ type: ACTIONS.SET_VALIDITY, payload: isValid });
    }, [state.username, state.password]);

    const setUsername = (username) => {
        dispatch({ type: ACTIONS.SET_USERNAME, payload: username });
    };

    const setPassword = (password) => {
        dispatch({ type: ACTIONS.SET_PASSWORD, payload: password });
    };

    return {
        username: state.username,
        password: state.password,
        isValid: state.isValid,
        setUsername,
        setPassword,
    };
}

export default useValidateLogin;
