// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const menuRef = useRef(null);
    const cartButtonRef = useRef(null);
    const cartModalRef = useRef(null); // Nueva referencia para el modal
    const { cartItemCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Lógica para cerrar el menú de navegación
            if (menuRef.current && !menuRef.current.contains(event.target) && event.target.id !== 'hamburger-button') {
                setIsMenuOpen(false);
            }

            // Lógica para cerrar el modal del carrito
            if (isCartOpen && cartModalRef.current && !cartModalRef.current.contains(event.target) && cartButtonRef.current && !cartButtonRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, isCartOpen]);

    return (
        <header className="flex justify-between items-center p-4 md:p-6 bg-[#4ead9f] text-white shadow-lg sticky top-0 z-50">
            {/* ... (código del logo y menú sin cambios) ... */}
            <Link to="/">
                <div className="flex-1">
                    <img src="/logoverde.png" alt="Logo" className="h-15 w-auto" />
                </div>
            </Link>

            <div className="flex-1 flex justify-center items-center relative">
                <button
                    id="hamburger-button"
                    onClick={toggleMenu}
                    className="md:hidden text-3xl text-black focus:outline-none"
                    aria-label="Abrir menú"
                >
                    ☰
                </button>
                <nav
                    ref={menuRef}
                    className={`
                        absolute top-full left-0 w-40 bg-[#FF007F] rounded-lg md:bg-transparent
                        md:static md:w-auto md:flex transition-all duration-300
                        ${isMenuOpen ? 'block' : 'hidden'} md:block
                    `}
                >
                    <ul className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
                        <li className="p-4 md:p-0">
                            <Link to="/" onClick={toggleMenu} className="lg:text-black lg:hover:text-[#FF3366] hover:text-[#6df17c] hover:font-extrabold text-lg font-semibold block transition-colors duration-300">
                                Inicio
                            </Link>
                        </li>
                        <li className="p-4 md:p-0">
                            <Link to="/nosotros" onClick={toggleMenu} className="lg:text-black lg:hover:text-[#FF3366] hover:text-[#6df17c] hover:font-extrabold text-lg font-semibold block transition-colors duration-300">
                                Nosotros
                            </Link>
                        </li>
                        <li className="p-4 md:p-0">
                            <Link to="/ordenar" onClick={toggleMenu} className="lg:text-black lg:hover:text-[#FF3366] hover:text-[#6df17c] hover:font-extrabold text-lg font-semibold block transition-colors duration-300">
                                Ordenar
                            </Link>
                        </li>
                        <li className="p-4 md:p-0">
                            <Link to="/cotizaciones" onClick={toggleMenu} className="lg:text-black lg:hover:text-[#FF3366] hover:text-[#6df17c] hover:font-extrabold text-lg font-semibold block transition-colors duration-300">
                                Cotizaciones
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Contenedor Derecho: Botón de Carrito con Contador */}
            <div className="flex-1 flex justify-end space-x-4">
                <button
                    onClick={toggleCart}
                    ref={cartButtonRef}
                    className="flex items-center text-black hover:text-white transition-colors duration-300 relative"
                >
                    <img src="/cart-26.svg" alt="Carrito" className="h-8 w-8 md:h-7 md:w-7" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-[#FF007F] text-white text-xs font-bold">
                            {cartItemCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Renderizado condicional del modal. Se le pasa la referencia */}
            {isCartOpen && <CartModal ref={cartModalRef} onClose={toggleCart} />}
        </header>
    );
};

export default Header;