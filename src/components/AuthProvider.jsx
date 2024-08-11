import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useFetch from '../hooks/useFetch';
import AuthContext from '../contexts/AuthContext';

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [profileData, setProfileData] = useState(localStorage.getItem('profileData'));
    const userID = JSON.parse(profileData).user__id;
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
        if (data && !isError && !isLoading) {
            setProfileData(data);
            localStorage.setItem('profileData', data);
            setIsLoggedIn(true);
        }
    },[data]);
    
    const login = (token) => {
        localStorage.setItem('token', token);
        setTriggerFetch(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setProfileData(null);
    };

    return (
        <AuthContext.Provider value={{ userID, isLoggedIn, profileData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}