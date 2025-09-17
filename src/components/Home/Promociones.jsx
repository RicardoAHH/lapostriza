// src/components/Promociones.jsx
import React from 'react';
import { promociones } from '../../data/Promocionesdata';

const Promociones = ({ promocionesData }) => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Promociones Exclusivas 🍩
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        ¡Disfruta de ofertas especiales solo para ti!
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {promocionesData.map((promocion) => (
                        <article key={promocion.id} className="flex flex-col items-start justify-between rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="relative w-full">
                                <img
                                    src={promocion.imagenUrl}
                                    alt={promocion.titulo}
                                    className="w-full object-cover aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="p-6 flex flex-col items-start">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                        {promocion.categoria}
                                    </span>
                                </div>
                                <div className="relative mt-3">
                                    <h3 className="text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={promocion.enlace}>
                                            <span className="absolute inset-0" />
                                            {promocion.titulo}
                                        </a>
                                    </h3>
                                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{promocion.descripcion}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Promociones;