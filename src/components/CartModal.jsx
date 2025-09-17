// src/components/CartModal.jsx
import React, { forwardRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';

const CartModal = forwardRef(({ onClose }, ref) => {
    const { cartItems, cartTotalPrice, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

    return (
        <div ref={ref} className="cart-modal fixed inset-0 z-50 flex items-center justify-end p-4 bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm h-full max-h-[90vh] flex flex-col">
                {/* Header del Modal */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-[#4ead9f]">Mi Carrito</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido del Carrito */}
                <div className="p-6 flex-grow overflow-y-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id + item.opcionSeleccionada.id} className="flex items-center space-x-4">
                                    <img src={item.imagenUrl} alt={item.nombre} className="h-16 w-16 rounded-md object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                                        <p className="text-xs text-gray-500">{item.opcionSeleccionada.nombre}</p>
                                        <p className="text-sm font-bold text-[#FF007F] mt-1">${(item.precioFinal * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => decrementQuantity(item.id, item.opcionSeleccionada.id)} className="text-gray-500 hover:text-gray-900">-</button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <button onClick={() => incrementQuantity(item.id, item.opcionSeleccionada.id)} className="text-gray-500 hover:text-gray-900">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id, item.opcionSeleccionada.id)} className="text-gray-400 hover:text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer del Modal con el precio total */}
                <div className="p-6 border-t border-gray-200">
                    <div className="flex text-black justify-between items-center font-bold text-lg mb-4">
                        <span>Total:</span>
                        <span>${cartTotalPrice.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" onClick={onClose} className="block w-full text-center rounded-md border border-transparent bg-[#FF007F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300">
                        Pagar
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default CartModal;