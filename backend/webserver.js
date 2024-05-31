// נייבא את כל המודולים שאני צריך
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors')
const bodyParser = require('body-parser');

// נייבא את כל הנתיבים שלנו
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const getRoutes = require('./routes/getRoutes');

// ניצור אובייקט של השרת זמן אמת שלנו
const wss = new WebSocket.Server({ port: 8080 });

// נקבע אירוע חיבור לכל לקוח
wss.on('connection', function connection(ws) {

    // נקבע אירוע התקבלה של הודעה מלקוח
    ws.on('message', function incoming(message) {
        // נשלח את ההודעה לכל הלקוחות שמחוברים לשרת
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log('Realtime Websocket online at ws://localhost:8080');

// ניצור אובייקט של השרת שלנו
const app = express();
const port = 3001;

// Connect to DB. If the database specified in the connection string doesn't exist, MongoDB will create it.
mongoose.connect('mongodb://localhost:27017/posts_db')
    .then(r => console.log('Connected to DB'))
    .catch(e => console.log(e))

// נגדיר את השרת שלנו
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.wss = wss;
    next();
})
app.use('/api', authRoutes);
app.use('/api', postRoutes);
app.use('/api', getRoutes);

// נתחיל להאזין לבקשות מצד הלקוח
app.listen(port, () => console.log(`Backend listening to ${port}`));
