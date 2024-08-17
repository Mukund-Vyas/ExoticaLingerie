import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <ProfileContext.Provider value={{ profileOpen, toggleProfile, cartOpen, toggleCart }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
