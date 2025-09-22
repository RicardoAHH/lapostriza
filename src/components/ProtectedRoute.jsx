// src/components/ProtectedRoute.jsx

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // El usuario está autenticado
                setIsAuthenticated(true);
            } else {
                // No hay usuario autenticado
                setIsAuthenticated(false);
            }
        });

        // Limpia la suscripción cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        // Muestra un estado de carga mientras verifica la autenticación
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    // Si el usuario está autenticado, renderiza la ruta anidada, de lo contrario, redirige al login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;