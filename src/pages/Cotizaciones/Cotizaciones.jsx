// src/pages/Cotizaciones.jsx
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Cotizaciones = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow bg-gray-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-[#FF007F] sm:text-5xl">
                            Solicita tu Cotización
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Cuéntanos sobre tu evento y te enviaremos una propuesta de postres personalizada.
                        </p>
                    </div>
                    <div className="mx-auto mt-12 max-w-xl">
                        {/* Formulario de Cotización */}
                        <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
                            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                        Nombre completo
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            autoComplete="name"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF007F] focus:ring-[#FF007F] sm:text-sm p-2"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                        Teléfono
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="tel"
                                            name="telefono"
                                            id="telefono"
                                            autoComplete="tel"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF007F] focus:ring-[#FF007F] sm:text-sm p-2"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF007F] focus:ring-[#FF007F] sm:text-sm p-2"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="tipoEvento" className="block text-sm font-medium text-gray-700">
                                        Tipo de Evento
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="tipoEvento"
                                            name="tipoEvento"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF007F] focus:ring-[#FF007F] sm:text-sm p-2"
                                        >
                                            <option>Cumpleaños</option>
                                            <option>Boda</option>
                                            <option>Fiesta Infantil</option>
                                            <option>Evento Corporativo</option>
                                            <option>Otro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                        Detalles del pedido (número de personas, tipo de postres, etc.)
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="descripcion"
                                            name="descripcion"
                                            rows={4}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF007F] focus:ring-[#FF007F] sm:text-sm p-2"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-[#FF007F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6df17c] focus:ring-offset-2"
                                    >
                                        Enviar Solicitud
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cotizaciones;