import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.findIndex(item => item._id === action.payload._id && item.size === action.payload.size  && item.color === action.payload.color);
            if (existingItemIndex > -1) {
                const updatedState = [...state];
                updatedState[existingItemIndex] = {
                    ...updatedState[existingItemIndex],
                    quantity: updatedState[existingItemIndex].quantity + 1
                };
                return updatedState;
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_FROM_CART':
            return state.filter(item => item._id !== action.payload._id || item.size !== action.payload.size);
        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item._id === action.payload._id && item.size === action.payload.size
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        case 'SET_CART':
            return action.payload;
        default:
            return state;
    }
};

const initializeCart = () => {
    if (typeof window !== 'undefined') {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    }
    return [];
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], initializeCart);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const value = useMemo(() => ({ cart, dispatch }), [cart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);