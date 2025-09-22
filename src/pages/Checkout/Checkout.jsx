import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { db, auth } from '../../firebase';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
const Checkout = () => {
    const { cartItems, cartTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    // Estado local para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [referencia, setReferencia] = useState('');
    const [opcionEnvio, setOpcionEnvio] = useState('domicilio');
    const [loading, setLoading] = useState(true); // Estado de carga inicial
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    // Cargar los datos del perfil del usuario si está autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Si hay un usuario logueado
                setUser(currentUser);
                setEmail(currentUser.email); // Precargar el email del usuario
                const profileDocRef = doc(db, 'profiles', currentUser.uid);
                const profileSnap = await getDoc(profileDocRef);
                if (profileSnap.exists()) {
                    const profileData = profileSnap.data();
                    setNombre(profileData.nombre || '');
                    setTelefono(profileData.telefono || '');
                    setDireccion(profileData.direccion || '');
                }
            } else {
                // No hay usuario logueado, es un invitado
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const costoEnvio = opcionEnvio === 'domicilio' && cartTotalPrice < 200 ? 15 : 0;
    const totalFinal = cartTotalPrice + costoEnvio;
    const handleOpcionEnvioChange = (event) => {
        setOpcionEnvio(event.target.value);
    };
    const handleOrder = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        // Determinar el ID del usuario. Si está logueado, usar su UID. Si no, generar un ID de invitado.
        const userId = user ? user.uid : `guest_${crypto.randomUUID()}`;
        const orderData = {
            nombre,
            telefono,
            email, // Usar el email del estado, que puede ser del usuario logueado o del invitado
            opcionEnvio,
            direccion: opcionEnvio === 'domicilio' ? direccion : 'N/A',
            referencia: opcionEnvio === 'domicilio' ? referencia : 'N/A',
            items: cartItems,
            subtotal: cartTotalPrice,
            costoEnvio: costoEnvio,
            totalFinal: totalFinal,
            fechaPedido: serverTimestamp(),
            status: 'Pendiente',
            userId: userId,
        };
        try {
            await addDoc(collection(db, 'pedidos'), orderData);
            clearCart();
            navigate('/confirmacion');
        } catch (err) {
            console.error("Error al guardar el pedido:", err);
            setError("Ocurrió un error al procesar tu pedido. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Cargando...</p>
            </div>
        );
    }
    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#FF007F] sm:text-4xl text-center mb-12">
                    Finalizar Pedido
                </h1>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Resumen del Pedido */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de tu Pedido</h2>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden divide-y divide-gray-200">
                            {cartItems.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    <p>Tu carrito está vacío. <Link to="/ordenar" className="text-[#FF007F] font-semibold hover:underline">¡Añade algunos productos!</Link></p>
                                </div>
                            ) : (
                                <ul role="list" className="p-6">
                                    {cartItems.map((item) => (
                                        <li key={`${item.id}-${item.opcionSeleccionada.id}`} className="flex py-6">
                                            <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                                <img
                                                    src={item.imagenUrl}
                                                    alt={item.nombre}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        {item.nombre}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.opcionSeleccionada.nombre}
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-[#FF007F]">
                                                        ${(item.precioFinal * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-700">Cantidad: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {/* Totales y Costo de Envío */}
                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <div className="flex justify-between font-medium text-lg text-gray-900 mb-2">
                                <span>Subtotal:</span>
                                <span>${cartTotalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg text-gray-900 mb-4">
                                <span>Costo de Envío:</span>
                                <span>${costoEnvio.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl text-gray-900 border-t border-gray-200 pt-4">
                                <span>Total del Pedido:</span>
                                <span>${totalFinal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    {/* Formulario de Envío */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos de Envío</h2>
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                <p>{error}</p>
                            </div>
                        )}
                        <form onSubmit={handleOrder} className="bg-white rounded-lg shadow-lg p-6">
                            {/* Opciones de envío */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Método de entrega</h3>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="envioOption"
                                            value="domicilio"
                                            checked={opcionEnvio === 'domicilio'}
                                            onChange={handleOpcionEnvioChange}
                                            className="form-radio text-[#FF007F] h-4 w-4"
                                        />
                                        <span className="ml-2 text-gray-700">Envío a domicilio</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="envioOption"
                                            value="recoger"
                                            checked={opcionEnvio === 'recoger'}
                                            onChange={handleOpcionEnvioChange}
                                            className="form-radio text-[#FF007F] h-4 w-4"
                                        />
                                        <span className="ml-2 text-gray-700">Recoger en tienda</span>
                                    </label>
                                </div>
                            </div>
                            {/* Campos del formulario */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="nombreApellido" className="block text-sm font-medium text-gray-700">
                                        Nombre y Apellido
                                    </label>
                                    <input
                                        type="text"
                                        id="nombreApellido"
                                        name="nombreApellido"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                        required
                                        disabled={user !== null} // Deshabilitar si el usuario está logueado para que no lo cambie
                                    />
                                </div>
                                {/* Dirección y Referencias solo si la opción es "domicilio" */}
                                {opcionEnvio === 'domicilio' && (
                                    <>
                                        <div>
                                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                                                Dirección
                                            </label>
                                            <input
                                                type="text"
                                                id="direccion"
                                                name="direccion"
                                                value={direccion}
                                                onChange={(e) => setDireccion(e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="referencia" className="block text-sm font-medium text-gray-700">
                                                Referencias
                                            </label>
                                            <textarea
                                                id="referencia"
                                                name="referencia"
                                                value={referencia}
                                                onChange={(e) => setReferencia(e.target.value)}
                                                rows="3"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                                            ></textarea>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-md border border-transparent bg-[#FF007F] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#6df17c] hover:text-black transition-colors duration-300"
                                >
                                    {loading ? 'Confirmando...' : 'Confirmar pedido'}
                                </button>
                                {/* El botón de "Iniciar sesión" solo se muestra si el usuario no está logueado */}
                                {!user && (
                                    <Link
                                        to="/login"
                                        className="mt-4 block w-full text-center rounded-md border border-[#FF007F] px-6 py-3 text-base font-medium text-[#FF007F] shadow-sm hover:bg-[#FF007F] hover:text-white transition-colors duration-300"
                                    >
                                        Iniciar sesión
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Checkout;