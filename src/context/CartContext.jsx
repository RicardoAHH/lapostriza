// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => { // Eliminado el parámetro "quantity" con valor predeterminado
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item =>
                item.id === product.id && item.opcionSeleccionada.id === product.opcionSeleccionada.id
            );

            if (existingItem) {
                // Si el producto ya existe, se suma la cantidad del producto entrante
                return prevItems.map(item =>
                    item.id === product.id && item.opcionSeleccionada.id === product.opcionSeleccionada.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                // Si es un producto nuevo, se añade con su cantidad
                return [...prevItems, { ...product }];
            }
        });
    };

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