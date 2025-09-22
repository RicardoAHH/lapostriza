// src/pages/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Importa la instancia de Firestore
import { doc, setDoc } from 'firebase/firestore'; // Importa las funciones de Firestore

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 1. Guarda el documento del nuevo usuario en Firestore con el rol 'customer'
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'customer'
            });

            // 2. Redirige al usuario a la página de login
            navigate('/login');
        } catch (err) {
            console.error(err.code, err.message);
            if (err.code === 'auth/email-already-in-use') {
                setError('El correo electrónico ya está en uso. Por favor, inicia sesión o usa otro correo.');
            } else if (err.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (err.code === 'auth/invalid-email') {
                setError('El formato del correo electrónico es inválido.');
            } else {
                setError('Ocurrió un error. Intenta de nuevo.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
                <h1 className="text-3xl font-bold tracking-tight text-[#4ead9f] sm:text-4xl mb-6">
                    Regístrate
                </h1>
                <p className="text-gray-600 mb-6">
                    Crea una cuenta y recibe acceso a promociones exclusivas.
                </p>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
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
                        Crear cuenta
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <p className="text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-medium text-[#FF007F] hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;