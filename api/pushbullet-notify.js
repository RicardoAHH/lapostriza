// Archivo: api/pushbullet-notify.js

// Importa las dependencias necesarias.
// Necesitas instalar la librería de Pushbullet: npm install pushbullet
const Pushbullet = require('pushbullet');

// La función principal que Vercel ejecutará
// Se exporta usando la sintaxis de CommonJS (module.exports)
module.exports = async (req, res) => {
    // Solo permite peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { title, body } = req.body;

        // Accede a la clave de Pushbullet desde las variables de entorno de Vercel
        const pushbulletKey = process.env.PUSHBULLET_API_KEY;

        if (!pushbulletKey) {
            console.error("Error: La API key de Pushbullet no se encontró en las variables de entorno de Vercel.");
            return res.status(500).json({ error: 'API key no encontrada en la configuración.' });
        }

        const pusher = new Pushbullet(pushbulletKey);

        // Envía la notificación
        await new Promise((resolve, reject) => {
            pusher.note(null, title, body, (error, response) => {
                if (error) {
                    console.error("Error al enviar la notificación:", error);
                    reject(error);
                } else {
                    console.log("Notificación de Pushbullet enviada con éxito:", response);
                    resolve();
                }
            });
        });

        res.status(200).json({ success: true, message: 'Notificación enviada con éxito.' });

    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};