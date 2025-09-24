// api/pushbullet-notify.js

export default async function handler(req, res) {
    // Esta es la configuración principal para solucionar el error de CORS.
    // Permite peticiones desde cualquier origen ('*'). Para mayor seguridad,
    // podrías especificar tu dominio 'https://lapostriza.vercel.app'.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // El navegador envía una petición de "preflight" (OPTIONS) para verificar las cabeceras
    // antes de la petición real (POST). Si el método es OPTIONS, respondemos con 200 OK.
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Comprueba que el método de la petición es POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { title, body } = req.body;

    // Asegúrate de tener tu token de Pushbullet en las variables de entorno de Vercel
    const PUSHBULLET_TOKEN = process.env.PUSHBULLET_TOKEN;
    const pushbulletApiUrl = 'https://api.pushbullet.com/v2/pushes';

    try {
        const pushbulletResponse = await fetch(pushbulletApiUrl, {
            method: 'POST',
            headers: {
                'Access-Token': PUSHBULLET_TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'note',
                title: title || 'Nuevo Pedido',
                body: body || 'Hay un nuevo pedido en La Postriza.',
            }),
        });

        if (pushbulletResponse.ok) {
            return res.status(200).json({ message: 'Notification sent successfully' });
        } else {
            const errorData = await pushbulletResponse.json();
            return res.status(pushbulletResponse.status).json({
                message: 'Failed to send notification to Pushbullet',
                details: errorData,
            });
        }
    } catch (error) {
        console.error('Error sending notification:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
