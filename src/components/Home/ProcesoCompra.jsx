// src/components/ProcesoCompra.jsx
import React from 'react';
import { Link } from 'react-router';

const ProcesoCompra = () => {
    return (
        <div className="bg-gray-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#4ead9f] sm:text-4xl">
                        Así de Fácil es Comprar
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Disfruta de tus postres favoritos en 3 simples pasos.
                    </p>
                </div>

                <div className="mt-12 flex flex-col items-center">
                    {/* Paso 1 */}
                    <div className="flex items-center space-x-4 mb-8">
                        <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#FF007F] text-white font-bold">1</span>
                        <p className="text-xl font-semibold text-gray-900">Elige tu Postre</p>
                    </div>

                    {/* Línea divisora */}
                    <div className="h-12 w-px bg-gray-300"></div>

                    {/* Paso 2 */}
                    <div className="flex items-center space-x-4 my-8">
                        <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#6df17c] text-white font-bold">2</span>
                        <p className="text-xl font-semibold text-gray-900">Personalízalo</p>
                    </div>

                    {/* Línea divisora */}
                    <div className="h-12 w-px bg-gray-300"></div>

                    {/* Paso 3 */}
                    <div className="flex items-center space-x-4 mt-8">
                        <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#4ead9f] text-white font-bold">3</span>
                        <p className="text-xl font-semibold text-gray-900">Te lo Llevamos</p>
                    </div>
                </div>

                {/* Botón de Llamada a la Acción */}
                <div className="mt-12 text-center">
                    <Link
                        to="/ordenar"
                        className="inline-block rounded-md border border-transparent bg-[#FF007F] px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                    >
                        Ordena Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProcesoCompra;