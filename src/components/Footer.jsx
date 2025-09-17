// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Columna 1: Información de Contacto */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#4ead9f]">Contacto</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="mailto:contacto@tupagina.com" className="hover:text-white transition-colors duration-300">
                                    contacto@tupagina.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+525512345678" className="hover:text-white transition-colors duration-300">
                                    +52 55 1234 5678
                                </a>
                            </li>
                            <li>123 Calle de los Postres, Ciudad Dulce</li>
                        </ul>
                    </div>

                    {/* Columna 2: Navegación del Sitio */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#4ead9f]">Navegación</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="/" className="hover:text-[#6df17c] transition-colors duration-300">
                                    Inicio
                                </a>
                            </li>
                            <li>
                                <a href="/nosotros" className="hover:text-[#6df17c] transition-colors duration-300">
                                    Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="/ordenar" className="hover:text-[#6df17c] transition-colors duration-300">
                                    Ordenar
                                </a>
                            </li>
                            <li>
                                <a href="/cotizaciones" className="hover:text-[#6df17c] transition-colors duration-300">
                                    Cotizaciones
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Síguenos en Redes Sociales */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#4ead9f]">Síguenos</h3>
                        <div className="mt-4 flex justify-center md:justify-start space-x-4">
                            {/* Botón de Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FF007F] hover:text-[#6df17c] transition-colors duration-300 transform hover:scale-110"
                                aria-label="Síguenos en Facebook"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-8 w-8"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.875v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>

                            {/* Botón de Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FF007F] hover:text-[#6df17c] transition-colors duration-300 transform hover:scale-110"
                                aria-label="Síguenos en Instagram"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-8 w-8"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.015 3.985.066 1.562.204 2.457.942 2.952 1.769.5.827.643 1.958.643 4.205v1.839c0 4.246-.015 4.599-.067 5.799-.203 1.562-.942 2.457-1.769 2.952-.827.5-1.958.643-4.205.643h-1.84c-4.246 0-4.599.015-5.799-.067-1.562-.203-2.457-.942-2.952-1.769-.5-.827-.643-1.958-.643-4.205v-1.84c0-4.246.015-4.599.067-5.799.203-1.562.942-2.457 1.769-2.952.827-.5 1.958-.643 4.205-.643h1.841zM14.53 10a.5.5 0 100 1h-5a.5.5 0 100-1h5zm-2.25 1.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0-3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Nombre de tu Postrería. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;