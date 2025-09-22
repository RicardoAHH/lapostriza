import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { db, auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, setLogLevel } from 'firebase/firestore';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Habilitar logging para debug
    setLogLevel('debug');

    useEffect(() => {
        // Redirigir si el usuario no está autenticado
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            }
        });

        // Configurar el listener de Firestore para pedidos en tiempo real
        const q = query(collection(db, 'pedidos'), orderBy('fechaPedido', 'desc'));
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
            setLoading(false);
        }, (error) => {
            console.error("Error al obtener los pedidos:", error);
            setLoading(false);
        });

        // Limpiar los listeners al desmontar el componente
        return () => {
            unsubscribeAuth();
            unsubscribeFirestore();
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Reemplazar alert() con una UI de mensaje
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const orderDocRef = doc(db, 'pedidos', orderId);
            await updateDoc(orderDocRef, { status: newStatus });
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const renderOrderDetails = () => {
        if (!selectedOrder) {
            return null;
        }

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
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
                        <p><strong>Fecha:</strong> {selectedOrder.fechaPedido?.toDate().toLocaleString()}</p>
                        <p><strong>Estado:</strong> <span className={`font-semibold ${selectedOrder.status === 'Completado' ? 'text-green-600' : 'text-orange-500'}`}>{selectedOrder.status}</span></p>
                        <p><strong>Total:</strong> ${selectedOrder.totalFinal.toFixed(2)}</p>
                        <hr className="my-2" />
                        <h4 className="text-xl font-semibold mb-2">Artículos:</h4>
                        <ul className="list-disc list-inside space-y-2">
                            {selectedOrder.items.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <img src={item.imagenUrl} alt={item.nombre} className="w-12 h-12 rounded-md mr-4 object-cover" />
                                    <div>
                                        <p><strong>{item.nombre}</strong></p>
                                        <p className="text-sm text-gray-600">Opción: {item.opcionSeleccionada.nombre}</p>
                                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Precio: ${(item.precioFinal * item.quantity).toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
                            disabled={selectedOrder.status === 'Completado'}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                        >
                            Marcar como 'Completado'
                        </button>
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

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pedidos Recientes</h2>
                {loading ? (
                    <p className="text-gray-500 text-center">Cargando pedidos...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500 text-center">No hay pedidos aún.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleOrderClick(order)}>
                                <div className="flex flex-col mb-2 sm:mb-0">
                                    <span className="font-semibold text-gray-900">Pedido de {order.nombre}</span>
                                    <span className="text-sm text-gray-500">
                                        Fecha: {order.fechaPedido?.toDate().toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="font-bold text-lg text-[#FF007F]">
                                        ${order.totalFinal.toFixed(2)}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Pendiente' ? 'bg-orange-100 text-orange-800' : order.status === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {renderOrderDetails()}
        </div>
    );
};

export default AdminDashboard;
