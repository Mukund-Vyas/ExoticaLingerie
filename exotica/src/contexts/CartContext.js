import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.cart.findIndex(item => item._id === action.payload._id && item.size === action.payload.size && item.color === action.payload.color);
            if (existingItemIndex > -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
                return { ...state, cart: updatedCart };
            }
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        }
        case 'REMOVE_FROM_CART': {
            const updatedCart = state.cart.filter(item => item._id !== action.payload._id || item.size !== action.payload.size || item.color !== action.payload.color);
            const updatedSelectedItems = state.selectedItems.filter(item => item._id !== action.payload._id || item.size !== action.payload.size || item.color !== action.payload.color);
            return { ...state, cart: updatedCart, selectedItems: updatedSelectedItems };
        }
        case 'UPDATE_QUANTITY': {
            const updatedCart = state.cart.map(item =>
                item._id === action.payload._id && item.size === action.payload.size
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            const updatedSelectedItems = state.selectedItems.map(item =>
                item._id === action.payload._id && item.size === action.payload.size
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return { ...state, cart: updatedCart, selectedItems: updatedSelectedItems };
        }
        case 'SET_CART':
            return { ...state, cart: action.payload };
        case 'SET_SELECTED_ITEMS':
            return { ...state, selectedItems: action.payload };
        case 'SELECT_ITEM': {
            const exists = state.selectedItems.find(i => i._id === action.payload._id && i.size === action.payload.size && i.color === action.payload.color);
            if (exists) {
                return { ...state, selectedItems: state.selectedItems.filter(i => !(i._id === action.payload._id && i.size === action.payload.size && i.color === action.payload.color)) };
            }
            return { ...state, selectedItems: [...state.selectedItems, action.payload] };
        }
        case 'SELECT_ALL_ITEMS':
            if (state.selectedItems.length === state.cart.length) {
                return { ...state, selectedItems: [] };
            }
            return { ...state, selectedItems: state.cart };
        default:
            return state;
    }
};


const initializeCart = () => {
    if (typeof window !== 'undefined') {
        const localCart = localStorage.getItem('cart');
        const localSelectedItems = localStorage.getItem('selectedItems');
        return {
            cart: localCart ? JSON.parse(localCart) : [],   
            selectedItems: localSelectedItems ? JSON.parse(localSelectedItems) : [],
        };
    }
    return { cart: [], selectedItems: [] };
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], selectedItems: [] }, initializeCart);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems));
        }
    }, [state.cart, state.selectedItems]);

    const value = useMemo(() => ({ state, dispatch }), [state]);

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