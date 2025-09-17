// src/pages/Confirmacion.jsx
import React from 'react';
import { Link } from 'react-router';

const Confirmacion = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#4ead9f] sm:text-5xl mb-4">
                    ¡Gracias por tu pedido!
                </h1>
                <p className="text-lg leading-8 text-gray-600 mb-6">
                    Tu pedido ha sido recibido. En un momento nos comunicaremos contigo para confirmar tu dirección y darte un tiempo estimado de entrega.
                </p>
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