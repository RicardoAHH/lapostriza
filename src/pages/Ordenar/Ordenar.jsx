import ModalPersonalizacion from "../../components/Ordenar/ModalPersonalizacion";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

// Datos de ejemplo para los postres. En una aplicación real, esto vendría de una API.
const postresData = [
    {
        id: 1,
        nombre: 'Pastel imposible',
        precioBase: 45.00,
        imagenUrl: '/PastelImposible.jpg',
        opciones: [
            { id: 1, nombre: 'Sin relleno', costoExtra: 0.00 },
            { id: 2, nombre: 'Dulce de leche', costoExtra: 5.00 },
        ],
    },
    {
        id: 2,
        nombre: 'Cheesecake',
        precioBase: 50.00,
        imagenUrl: '/Cheescake.jpg',
        opciones: [
            { id: 1, nombre: 'Cajeta', costoExtra: 0.00 },
            { id: 2, nombre: 'Fresa', costoExtra: 5.00 },
            { id: 3, nombre: 'Zarzamora', costoExtra: 8.00 },
        ],
    },
    {
        id: 3,
        nombre: 'Pastel selva negra',
        precioBase: 60.00,
        imagenUrl: '/pastelselvanegra.jpg',
        opciones: [
            { id: 1, nombre: 'Sin decoración', costoExtra: 0.00 },
            { id: 2, nombre: 'Con cerezas', costoExtra: 10.00 },
        ],
    },
    // ... (rest of your postresData with similar structure)
    {
        id: 4,
        nombre: 'Fresas con crema',
        precioBase: 40.00,
        imagenUrl: '/FresasConCrema.jpg',
        opciones: [
            { id: 1, nombre: 'Sin topping', costoExtra: 0.00 },
            { id: 2, nombre: 'Chocolate derretido', costoExtra: 5.00 },
        ],
    },
    {
        id: 5,
        nombre: 'Tarta fria de limón',
        precioBase: 65.00,
        imagenUrl: 'TartaLimon.webp',
        opciones: [
            { id: 1, nombre: 'Sin adición', costoExtra: 0.00 },
            { id: 2, nombre: 'Merengue', costoExtra: 7.00 },
        ],
    },
    {
        id: 6,
        nombre: 'Tarta de queso frutal',
        precioBase: 55.00,
        imagenUrl: 'TartaQuesoFrutal.jpg',
        opciones: [
            { id: 1, nombre: 'Sin fruta', costoExtra: 0.00 },
            { id: 2, nombre: 'Con frutas de temporada', costoExtra: 10.00 },
        ],
    },
];

const Ordenar = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [postreSeleccionado, setPostreSeleccionado] = useState(null);
    const { addToCart } = useCart();

    const handleOpenModal = (postre) => {
        setPostreSeleccionado(postre);
        setModalAbierto(true);
    };

    const handleCloseModal = () => {
        setModalAbierto(false);
        setPostreSeleccionado(null);
    };

    const handleAddToCar = (postrePersonalizado) => {
        addToCart(postrePersonalizado); // Llama a la función addToCart con el postre personalizado
        handleCloseModal();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow bg-gray-50 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-[#FF007F] sm:text-5xl">
                            Nuestro Menú
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Elige tu postre favorito y personalízalo a tu gusto.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postresData.map((postre) => (
                            <div
                                key={postre.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={postre.imagenUrl}
                                    alt={postre.nombre}
                                    className="w-full h-35 object-cover"
                                />
                                <div className="p-4 flex flex-col items-center text-center">
                                    <h3 className="text-xl font-semibold text-gray-900">{postre.nombre}</h3>
                                    {/* Mostrar el precio como un rango */}
                                    <p className="mt-2 text-2xl font-bold text-[#4ead9f]">
                                        Desde ${postre.precioBase.toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-100 border-t border-gray-200">
                                    <button
                                        onClick={() => handleOpenModal(postre)}
                                        className="w-full rounded-md border border-transparent bg-[#FF007F] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6df17c] focus:ring-offset-2"
                                    >
                                        Personalízalo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {modalAbierto && postreSeleccionado && (
                <ModalPersonalizacion
                    postre={postreSeleccionado}
                    opciones={postreSeleccionado.opciones} // Ahora se pasan las opciones del postre
                    onClose={handleCloseModal}
                    onAddToCar={handleAddToCar}
                />
            )}
        </div>
    );
};

export default Ordenar;