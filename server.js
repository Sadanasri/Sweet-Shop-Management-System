require('dotenv').config();
const app = require('./app');

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Keep process alive
setInterval(() => {}, 1000);

