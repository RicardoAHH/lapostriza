import React, { useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// =========================================================================
// Lógica principal del componente Cotizaciones
// =========================================================================

const Cotizaciones = () => {
    // Inicialización de Firebase (con la verificación para evitar duplicados)
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        tipoEvento: 'Cumpleaños', // Valor por defecto
        descripcion: ''
    });

    // Estado para el mensaje de respuesta al usuario
    const [submissionMessage, setSubmissionMessage] = useState('');

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionMessage('Enviando...');

        try {
            // Añade un nuevo documento a la colección 'cotizaciones'
            await addDoc(collection(db, 'cotizaciones'), {
                ...formData,
                fechaEnvio: new Date()
            });

            // Muestra un mensaje de éxito y limpia el formulario
            setSubmissionMessage('¡Tu cotización ha sido enviada con éxito!');
            setFormData({
                nombre: '',
                telefono: '',
                email: '',
                tipoEvento: 'Cumpleaños',
                descripcion: ''
            });

        } catch (error) {
            console.error("Error al añadir el documento: ", error);
            setSubmissionMessage('Hubo un error al enviar tu cotización. Por favor, inténtalo de nuevo.');
        }
    };

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
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
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
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
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
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
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
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
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
                                            value={formData.tipoEvento}
                                            onChange={handleChange}
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
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF007F] focus:ring-[#FF007F] sm:text-sm p-2"
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
                            {submissionMessage && (
                                <p className="mt-4 text-center text-sm font-medium">
                                    {submissionMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cotizaciones;