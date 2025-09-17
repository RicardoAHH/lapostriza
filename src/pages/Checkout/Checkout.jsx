// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router'; // Importa useNavigate

const Checkout = () => {
    const { cartItems, cartTotalPrice } = useCart();
    const [opcionEnvio, setOpcionEnvio] = useState('domicilio');
    const navigate = useNavigate(); // Inicializa el hook

    const costoEnvio = opcionEnvio === 'domicilio' && cartTotalPrice < 200 ? 15 : 0;
    const totalFinal = cartTotalPrice + costoEnvio;

    const handleOpcionEnvioChange = (event) => {
        setOpcionEnvio(event.target.value);
    };

    // Función para manejar el "envío" del pedido
    const handleOrder = (event) => {
        event.preventDefault(); // Evita que la página se recargue

        // Aquí iría la lógica para enviar los datos del pedido
        // Por ahora, solo simularemos el proceso
        const formData = new FormData(event.target);
        const orderData = {
            nombre: formData.get('nombreApellido'),
            opcion: opcionEnvio,
            direccion: opcionEnvio === 'domicilio' ? formData.get('direccion') : 'N/A',
            referencia: opcionEnvio === 'domicilio' ? formData.get('referencia') : 'N/A',
            items: cartItems,
            total: totalFinal,
        };

        console.log("Pedido confirmado:", orderData);

        // Redirigir al usuario a la página de confirmación
        navigate('/confirmacion');
    };

    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#FF007F] sm:text-4xl text-center mb-12">
                    Finalizar Pedido
                </h1>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Resumen del Pedido */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de tu Pedido</h2>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden divide-y divide-gray-200">
                            {cartItems.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    <p>Tu carrito está vacío. <Link to="/ordenar" className="text-[#FF007F] font-semibold hover:underline">¡Añade algunos productos!</Link></p>
                                </div>
                            ) : (
                                <ul role="list" className="p-6">
                                    {cartItems.map((item) => (
                                        <li key={`${item.id}-${item.opcionSeleccionada.id}`} className="flex py-6">
                                            <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                                <img
                                                    src={item.imagenUrl}
                                                    alt={item.nombre}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        {item.nombre}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.opcionSeleccionada.nombre}
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-[#FF007F]">
                                                        ${(item.precioFinal * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-700">Cantidad: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Totales y Costo de Envío */}
                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <div className="flex justify-between font-medium text-lg text-gray-900 mb-2">
                                <span>Subtotal:</span>
                                <span>${cartTotalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg text-gray-900 mb-4">
                                <span>Costo de Envío:</span>
                                <span>${costoEnvio.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl text-gray-900 border-t border-gray-200 pt-4">
                                <span>Total del Pedido:</span>
                                <span>${totalFinal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de Envío */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos de Envío</h2>
                        <form onSubmit={handleOrder} className="bg-white rounded-lg shadow-lg p-6">
                            {/* Opciones de envío */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Método de entrega</h3>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="envioOption"
                                            value="domicilio"
                                            checked={opcionEnvio === 'domicilio'}
                                            onChange={handleOpcionEnvioChange}
                                            className="form-radio text-[#FF007F] h-4 w-4"
                                        />
                                        <span className="ml-2 text-gray-700">Envío a domicilio</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="envioOption"
                                            value="recoger"
                                            checked={opcionEnvio === 'recoger'}
                                            onChange={handleOpcionEnvioChange}
                                            className="form-radio text-[#FF007F] h-4 w-4"
                                        />
                                        <span className="ml-2 text-gray-700">Recoger en tienda</span>
                                    </label>
                                </div>
                            </div>

                            {/* Campos del formulario: Nombre siempre visible */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="nombreApellido" className="block text-sm font-medium text-gray-700">
                                        Nombre y Apellido
                                    </label>
                                    <input
                                        type="text"
                                        id="nombreApellido"
                                        name="nombreApellido"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                        required
                                    />
                                </div>

                                {/* Dirección y Referencias solo si la opción es "domicilio" */}
                                {opcionEnvio === 'domicilio' && (
                                    <>
                                        <div>
                                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                                                Dirección
                                            </label>
                                            <input
                                                type="text"
                                                id="direccion"
                                                name="direccion"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="referencia" className="block text-sm font-medium text-gray-700">
                                                Referencias
                                            </label>
                                            <textarea
                                                id="referencia"
                                                name="referencia"
                                                rows="3"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                            ></textarea>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-[#FF007F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                                >
                                    Confirmar pedido
                                </button>
                                <Link
                                    to="/login"
                                    className="mt-4 block w-full text-center rounded-md border border-[#FF007F] px-6 py-3 text-base font-medium text-[#FF007F] shadow-sm hover:bg-[#FF007F] hover:text-white transition-colors duration-300"
                                >
                                    Iniciar sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;