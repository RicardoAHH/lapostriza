// src/components/Ordenar/ModalPersonalizacion.jsx
import React, { useState, useEffect } from 'react';

const ModalPersonalizacion = ({ postre, onClose, onAddToCar }) => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const [precioFinal, setPrecioFinal] = useState(0);
    const [cantidad, setCantidad] = useState(1); // Nuevo estado para la cantidad

    useEffect(() => {
        if (postre) {
            const primeraOpcion = postre.opciones[0];
            setOpcionSeleccionada(primeraOpcion);
            setPrecioFinal(postre.precioBase + primeraOpcion.costoExtra);
        }
    }, [postre]);

    const handleOpcionClick = (opcion) => {
        setOpcionSeleccionada(opcion);
        setPrecioFinal(postre.precioBase + opcion.costoExtra);
    };

    const handleConfirmAdd = () => {
        // Se pasa la cantidad al hacer clic en "Añadir al Carrito"
        onAddToCar({
            ...postre,
            opcionSeleccionada,
            precioFinal,
            quantity: cantidad // Se incluye la cantidad
        });
    };

    // Funciones para manejar la cantidad
    const handleIncrement = () => {
        setCantidad(prevCantidad => prevCantidad + 1);
    };

    const handleDecrement = () => {
        setCantidad(prevCantidad => (prevCantidad > 1 ? prevCantidad - 1 : 1));
    };

    if (!postre) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
                <div className="text-center mb-4">
                    <img
                        src={postre.imagenUrl}
                        alt={postre.nombre}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-900">{postre.nombre}</h3>
                </div>
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Elige tu opción:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {postre.opciones.map((opcion) => (
                            <button
                                key={opcion.id}
                                onClick={() => handleOpcionClick(opcion)}
                                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300 ${opcionSeleccionada && opcionSeleccionada.id === opcion.id
                                        ? 'bg-[#FF007F] text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {opcion.nombre} (+${opcion.costoExtra.toFixed(2)})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sección para la cantidad */}
                <div className="flex items-center justify-center mb-6">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        className="px-4 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        -
                    </button>
                    <span className="px-6 py-2 border-t border-b border-gray-300 text-lg font-semibold text-gray-900">
                        {cantidad}
                    </span>
                    <button
                        type="button"
                        onClick={handleIncrement}
                        className="px-4 py-2 rounded-r-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        +
                    </button>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <p className="text-xl font-bold text-[#4ead9f]">
                        Total: ${(precioFinal * cantidad).toFixed(2)} {/* El total ahora se calcula con la cantidad */}
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmAdd}
                            className="px-4 py-2 rounded-md bg-[#FF007F] text-white hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                        >
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPersonalizacion;