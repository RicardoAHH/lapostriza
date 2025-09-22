import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item =>
                item.id === product.id && item.opcionSeleccionada.id === product.opcionSeleccionada.id
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.opcionSeleccionada.id === product.opcionSeleccionada.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
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
        // Se añade la función clearCart al objeto value para que sea accesible
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
