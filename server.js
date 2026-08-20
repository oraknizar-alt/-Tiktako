const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const DB_FILE = './licenses.json';

app.get('/api/check-license', (req, res) => {
    const deviceId = req.query.device_id;
    if (!deviceId) return res.json({ status: 'error' });

    if (!fs.existsSync(DB_FILE)) return res.json({ status: 'inactive' });

    const licenses = JSON.parse(fs.readFileSync(DB_FILE));
    const license = licenses[deviceId];

    if (!license) return res.json({ status: 'inactive' });

    const now = new Date();
    const expireDate = new Date(license.expireDate);

    if (now > expireDate) {
        return res.json({ status: 'expired' });
    }

    res.json({ status: 'active', expireDate: license.expireDate });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API sunucusu ${PORT} portunda çalışıyor...`);
});
