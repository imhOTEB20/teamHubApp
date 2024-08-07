import { useReducer, useEffect } from "react";

const ACTIONS = {
    SET_EMAIL: "SET_EMAIL",
    SET_PASSWORD: "SET_PASSWORD",
    SET_VALIDITY: "SET_VALIDITY",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_EMAIL:
            return {
                ...state,
                email: action.payload,
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

function useValidateLogin(validateEmail, validatePassword) {
    const [state, dispatch] = useReducer(reducer, {
        email: "",
        password: "",
        isValid: false,
    });

    useEffect(() => {
        const isValid = validateEmail(state.email) && validatePassword(state.password);
        dispatch({ type: ACTIONS.SET_VALIDITY, payload: isValid });
    }, [state.email, state.password, validateEmail, validatePassword]);

    const setEmail = (email) => {
        dispatch({ type: ACTIONS.SET_EMAIL, payload: email });
    };

    const setPassword = (password) => {
        dispatch({ type: ACTIONS.SET_PASSWORD, payload: password });
    };

    return {
        email: state.email,
        password: state.password,
        isValid: state.isValid,
        setEmail,
        setPassword,
    };
}

export default useValidateLogin;
