// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log('Intento de inicio de sesión con:', { email, password });
        // Por ahora, solo muestra los datos en la consola
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
                <h1 className="text-3xl font-bold tracking-tight text-[#4ead9f] sm:text-4xl mb-6">
                    Iniciar sesión
                </h1>
                <p className="text-gray-600 mb-6">
                    Introduce tus datos para acceder a tu cuenta.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-[#FF007F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <p className="text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/registro" className="font-medium text-[#FF007F] hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;