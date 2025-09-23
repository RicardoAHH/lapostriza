import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { db, auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot, doc, updateDoc, setLogLevel } from 'firebase/firestore';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [activeTab, setActiveTab] = useState('pedidos');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

    setLogLevel('debug');

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            }
        });

        const qOrders = query(collection(db, 'pedidos'));
        const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })).sort((a, b) => b.fechaPedido?.toDate() - a.fechaPedido?.toDate());
            setOrders(ordersData);
            setLoading(false);
        }, (error) => {
            console.error("Error al obtener los pedidos:", error);
            setLoading(false);
        });

        const qQuotes = query(collection(db, 'cotizaciones'));
        const unsubscribeQuotes = onSnapshot(qQuotes, (snapshot) => {
            const quotesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })).sort((a, b) => b.fechaEnvio?.toDate() - a.fechaEnvio?.toDate());
            setQuotes(quotesData);
        }, (error) => {
            console.error("Error al obtener las cotizaciones:", error);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeOrders();
            unsubscribeQuotes();
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleOpenCancelModal = (order) => {
        setOrderToCancel(order);
        setShowCancelModal(true);
    };

    const handleCloseCancelModal = () => {
        setOrderToCancel(null);
        setShowCancelModal(false);
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const orderDocRef = doc(db, 'pedidos', orderId);
            await updateDoc(orderDocRef, { status: newStatus });
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };

    const handleCancelOrder = async () => {
        if (!orderToCancel) return;
        try {
            const orderDocRef = doc(db, 'pedidos', orderToCancel.id);
            await updateDoc(orderDocRef, { status: 'Cancelado' });
            setSelectedOrder(null);
            setOrderToCancel(null);
            setShowCancelModal(false);
        } catch (error) {
            console.error('Error al cancelar el pedido:', error);
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleQuoteClick = (quote) => {
        setSelectedQuote(quote);
    };

    const renderOrderDetails = () => {
        if (!selectedOrder) {
            return null;
        }

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        &times;
                    </button>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Detalles del Pedido #{selectedOrder.id}</h3>
                    <div className="space-y-4">
                        <p><strong>Nombre:</strong> {selectedOrder.nombre}</p>
                        <p><strong>Correo:</strong> {selectedOrder.email}</p>
                        <p><strong>Teléfono:</strong> {selectedOrder.telefono}</p>
                        <p><strong>Fecha:</strong> {selectedOrder.fechaPedido?.toDate().toLocaleString()}</p>
                        <p>
                            <strong>Estado:</strong>{' '}
                            <span
                                className={`font-semibold ${selectedOrder.status === 'Completado' ? 'text-green-600' : selectedOrder.status === 'Cancelado' ? 'text-red-600' : 'text-orange-500'}`}
                            >
                                {selectedOrder.status}
                            </span>
                        </p>
                        <hr className="my-2" />
                        <h4 className="text-xl font-semibold mb-2">Información de Envío:</h4>
                        <p><strong>Opción de Envío:</strong> {selectedOrder.opcionEnvio === 'domicilio' ? 'Envío a Domicilio' : 'Recoger en Tienda'}</p>
                        {selectedOrder.opcionEnvio === 'domicilio' && (
                            <>
                                <p><strong>Dirección:</strong> {selectedOrder.direccion}</p>
                                <p><strong>Referencia:</strong> {selectedOrder.referencia}</p>
                                <p><strong>Costo de Envío:</strong> ${selectedOrder.costoEnvio?.toFixed(2)}</p>
                            </>
                        )}
                        <hr className="my-2" />
                        <h4 className="text-xl font-semibold mb-2">Artículos:</h4>
                        <ul className="list-disc list-inside space-y-2">
                            {selectedOrder.items?.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <img src={item.imagenUrl} alt={item.nombre} className="w-12 h-12 rounded-md mr-4 object-cover" />
                                    <div>
                                        <p><strong>{item.nombre}</strong></p>
                                        <p className="text-sm text-gray-600">Opción: {item.opcionSeleccionada?.nombre}</p>
                                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Precio: ${(item.precioFinal * item.quantity).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr className="my-2" />
                        <p className="text-lg font-bold">Total: ${selectedOrder.totalFinal?.toFixed(2)}</p>
                    </div>
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={() => handleUpdateStatus(selectedOrder.id, 'En Proceso')}
                            disabled={selectedOrder.status !== 'Pendiente'}
                            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
                        >
                            Marcar como 'En Proceso'
                        </button>
                        <button
                            onClick={() => handleUpdateStatus(selectedOrder.id, 'Completado')}
                            disabled={selectedOrder.status === 'Completado' || selectedOrder.status === 'Cancelado'}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                        >
                            Marcar como 'Completado'
                        </button>
                        <button
                            onClick={() => handleOpenCancelModal(selectedOrder)}
                            disabled={selectedOrder.status === 'Completado' || selectedOrder.status === 'Cancelado'}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 transition-colors"
                        >
                            Cancelar Pedido
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderCancelModal = () => {
        if (!showCancelModal || !orderToCancel) return null;

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                    <h3 className="text-xl font-bold text-red-600 mb-4">Confirmar Cancelación</h3>
                    <p className="mb-6 text-gray-700">¿Estás seguro que deseas cancelar el pedido #<strong>{orderToCancel.id}</strong>? Esta acción no se puede deshacer.</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleCloseCancelModal}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            No, volver
                        </button>
                        <button
                            onClick={handleCancelOrder}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Sí, Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderQuoteDetails = () => {
        if (!selectedQuote) {
            return null;
        }

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
                    <button
                        onClick={() => setSelectedQuote(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                    >
                        &times;
                    </button>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Detalles de Cotización #{selectedQuote.id}</h3>
                    <div className="space-y-4">
                        <p><strong>Nombre:</strong> {selectedQuote.nombre}</p>
                        <p><strong>Correo:</strong> {selectedQuote.email}</p>
                        <p><strong>Teléfono:</strong> {selectedQuote.telefono}</p>
                        <p><strong>Fecha:</strong> {selectedQuote.fechaEnvio?.toDate().toLocaleString()}</p>
                        <p><strong>Tipo de Evento:</strong> {selectedQuote.tipoEvento}</p>
                        <p><strong>Descripción:</strong> {selectedQuote.descripcion}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-[#1d3660]">Panel de Administración</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="mb-6 flex space-x-4 border-b border-gray-300">
                <button
                    onClick={() => setActiveTab('pedidos')}
                    className={`pb-2 px-4 font-semibold text-lg transition-colors duration-200 ${activeTab === 'pedidos' ? 'border-b-4 border-[#1d3660] text-[#1d3660]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Pedidos
                </button>
                <button
                    onClick={() => setActiveTab('cotizaciones')}
                    className={`pb-2 px-4 font-semibold text-lg transition-colors duration-200 ${activeTab === 'cotizaciones' ? 'border-b-4 border-[#FF007F] text-[#FF007F]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Cotizaciones
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {activeTab === 'pedidos' && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pedidos Recientes</h2>
                        {loading ? (
                            <p className="text-gray-500 text-center">Cargando pedidos...</p>
                        ) : orders.length === 0 ? (
                            <p className="text-gray-500 text-center">No hay pedidos aún.</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleOrderClick(order)}
                                    >
                                        <div className="flex flex-col mb-2 sm:mb-0">
                                            <span className="font-semibold text-gray-900">Pedido de {order.nombre}</span>
                                            <span className="text-sm text-gray-500">
                                                Fecha: {order.fechaPedido?.toDate().toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-bold text-lg text-[#FF007F]">
                                                ${order.totalFinal?.toFixed(2)}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Pendiente' ? 'bg-orange-100 text-orange-800' : order.status === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                {activeTab === 'cotizaciones' && (
                    <>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cotizaciones Recientes</h2>
                        {loading ? (
                            <p className="text-gray-500 text-center">Cargando cotizaciones...</p>
                        ) : quotes.length === 0 ? (
                            <p className="text-gray-500 text-center">No hay cotizaciones aún.</p>
                        ) : (
                            <div className="space-y-4">
                                {quotes.map((quote) => (
                                    <div
                                        key={quote.id}
                                        className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleQuoteClick(quote)}
                                    >
                                        <div className="flex flex-col mb-2 sm:mb-0">
                                            <span className="font-semibold text-gray-900">Cotización de {quote.nombre}</span>
                                            <span className="text-sm text-gray-500">
                                                Fecha: {quote.fechaEnvio?.toDate().toLocaleString()}
                                            </span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800`}>
                                            Nueva Solicitud
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            {renderOrderDetails()}
            {renderQuoteDetails()}
            {renderCancelModal()}
        </div>
    );
};

export default AdminDashboard;