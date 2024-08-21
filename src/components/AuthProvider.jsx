import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../hooks/useFetch';
import AuthContext from '../contexts/AuthContext';

export default function AuthProvider({ children }) {
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem('profileData')));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const { data, isError, isLoading} = useFetch(
        import.meta.env.VITE_AUTHENTICATED_USER_DATA_API_URL,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        triggerFetch
    );

    useEffect(() => {
        if(profileData != null) {
            setIsLoggedIn(true);
        }
    }, [profileData]);

    useEffect(() => {
        if (data && !isError && !isLoading) {
            localStorage.setItem('profileData', JSON.stringify(data));
            setProfileData(data);
        } else if (isError) {
            console.log("SE PRODUJO UN ERROR AL INTENTAR LOGUEARSE.");
        }
    },[data, isError, isLoading]);
    
    const login = (token) => {
        localStorage.setItem('token', token);
        setTriggerFetch(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profileData');
        setIsLoggedIn(false);
        setProfileData(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, profileData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}