import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    return (
        <ProfileContext.Provider value={{ profileOpen, toggleProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
