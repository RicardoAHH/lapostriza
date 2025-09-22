import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc, setDoc, setLogLevel } from 'firebase/firestore';
import { useNavigate } from 'react-router';

const CustomerDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState({ nombre: '', telefono: '', direccion: '' });
    const [profileMessage, setProfileMessage] = useState('');
    const navigate = useNavigate();

    // Habilitar logging para debug
    setLogLevel('debug');

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Configurar listener para los pedidos del usuario
                const q = query(collection(db, 'pedidos'), where('userId', '==', currentUser.uid));
                const unsubscribeOrders = onSnapshot(q, (snapshot) => {
                    const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setOrders(ordersData);
                    setLoading(false);
                }, (error) => {
                    console.error("Error al obtener los pedidos:", error);
                    setLoading(false);
                });

                // Obtener el perfil del usuario si existe
                const docRef = doc(db, 'profiles', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                }

                return () => unsubscribeOrders();
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribeAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Reemplazar alert()
            setProfileMessage('No se pudo cerrar la sesión.');
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                await setDoc(doc(db, 'profiles', user.uid), {
                    nombre: profile.nombre,
                    telefono: profile.telefono,
                    direccion: profile.direccion,
                    email: user.email,
                });
                setProfileMessage('¡Datos guardados con éxito!');
            } catch (error) {
                console.error("Error al guardar el perfil:", error);
                setProfileMessage('Error al guardar los datos.');
            }
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
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-[#1d3660]">Mi Cuenta</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mi Perfil</h2>
                <form onSubmit={saveProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={profile.nombre}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={profile.telefono}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={profile.direccion}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#6df17c] focus:border-[#6df17c]"
                        />
                    </div>
                    {profileMessage && <p className="text-sm text-green-600 font-semibold">{profileMessage}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#FF007F] text-white px-4 py-2 rounded-md hover:bg-[#6df17c] hover:text-black transition-colors"
                    >
                        Guardar Perfil
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mis Pedidos Anteriores</h2>
                {orders.length === 0 ? (
                    <p className="text-gray-500 text-center">No has realizado ningún pedido aún.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-900">Pedido #{order.id.substring(0, 8)}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Pendiente' ? 'bg-orange-100 text-orange-800' : order.status === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">Fecha: {order.fechaPedido?.toDate().toLocaleString()}</p>
                                <p className="font-bold text-lg text-[#FF007F]">Total: ${order.totalFinal.toFixed(2)}</p>
                                <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.quantity} x {item.nombre} ({item.opcionSeleccionada.nombre})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
