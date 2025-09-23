// src/pages/Confirmacion.jsx
import React from 'react';
// Asegúrate de que importas `Link` y `useLocation` de 'react-router-dom'
import { Link, useLocation } from 'react-router';
const contactInfo = {
    phone: '+52 55 3205 9945',
    email: 'tesla.asesorias.hxq@gmail.com',
    address: 'Av. México #87, Dos Rios, Huixquilucan, México',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470.4904231650919!2d-99.3428100551266!3d19.372469799054933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d207b182c27c2b%3A0xca56e46de85e1295!2sTesla%20Asesor%C3%ADas!5e0!3m2!1ses!2smx!4v1752695247652!5m2!1ses!2smx' // ¡REEMPLAZA ESTA URL CON LA DE TU UBICACIÓN REAL!
};

const Confirmacion = () => {
    const location = useLocation();
    const { opcionEnvio } = location.state || {}; // Desestructura la opción de envío, con un fallback si no existe.

    const mensajeDeConfirmacion = opcionEnvio === 'recoger'
        ? "Tu pedido ha sido recibido. Te avisaremos cuando esté listo para recoger en nuestra tienda. ¡Gracias por tu compra!"
        : "Tu pedido ha sido recibido. En un momento nos comunicaremos contigo para confirmar tu dirección y darte un tiempo estimado de entrega.";

    const direccionTienda = "Calle Falsa 123, Colonia Ejemplo, Ciudad de México"; // 📍 Reemplaza con tu dirección real

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#4ead9f] sm:text-5xl mb-4">
                    ¡Gracias por tu pedido!
                </h1>
                <p className="text-lg leading-8 text-gray-600 mb-6">
                    {mensajeDeConfirmacion}
                </p>
                {opcionEnvio === 'recoger' && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                        <p className="text-sm font-semibold text-gray-800">Dirección de la tienda:</p>

                        <div>

                            <p className="text-lg text-gray-800">{contactInfo.address}</p>
                            {/* Opcional: Botón para abrir en Google Maps */}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center text-[#1d3660] hover:text-blue-700 font-semibold transition-colors duration-200"
                            >
                                Ver en Google Maps
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] w-full">
                            <iframe
                                src={contactInfo.googleMapsEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de Asesorías Académicas"
                            ></iframe>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            (Por favor, no te presentes a recoger hasta que te notifiquemos que tu pedido está listo).
                        </p>
                    </div>
                )}
                <div className="mt-8">
                    <Link
                        to="/ordenar"
                        className="inline-block rounded-md border border-transparent bg-[#FF007F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                    >
                        Volver al menú
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Confirmacion;