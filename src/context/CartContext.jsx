// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Buscamos si ya existe un item con el mismo ID y la misma OPCIÓN
            const existingItem = prevItems.find(item =>
                item.id === product.id && item.opcionSeleccionada.id === product.opcionSeleccionada.id
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.opcionSeleccionada.id === product.opcionSeleccionada.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: quantity }];
            }
        });
    };

    // El resto de las funciones (removeFromCart, incrementQuantity, etc.)
    // también deben ajustarse para manejar la identificación por opción.
    const removeFromCart = (productId, optionId) => {
        setCartItems(prevItems => prevItems.filter(item =>
            !(item.id === productId && item.opcionSeleccionada.id === optionId)
        ));
    };

    const incrementQuantity = (productId, optionId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId && item.opcionSeleccionada.id === optionId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (productId, optionId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId && item.opcionSeleccionada.id === optionId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    // La función del precio total debe usar el precio final del producto
    const cartTotalPrice = cartItems.reduce((total, item) => total + item.precioFinal * item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cartItemCount: cartItems.reduce((total, item) => total + item.quantity, 0),
        cartTotalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};