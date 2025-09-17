// src/components/CotizacionCTA.jsx
import React from 'react';
import { Link } from 'react-router';

const CotizacionCTA = () => {
    return (
        <div className="bg-[#4ead9f] py-16 md:py-24 text-white text-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#FF007F]">
                    ¿Te gustó alguno de nuestros Postres para tu Evento?
                </h2>
                <p className="mt-4 text-lg leading-8 max-w-2xl mx-auto">
                    Con gusto te apoyamos en tu fiesta, reunión o evento especial.
                </p>
                <div className="mt-10 flex justify-center">
                    <Link
                        to="/cotizaciones" // Reemplaza con la ruta de tu página de cotizaciones
                        className="inline-block rounded-md border border-transparent bg-[#FF007F] px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                    >
                        Solicitar Cotización
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CotizacionCTA;