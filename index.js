const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const connectToDb = require('./db/db');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


const startServer = async () => {
    try {
        await connectToDb();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server: ", error);
        process.exit(1); // Exit with a failure code
    }
};

startServer();