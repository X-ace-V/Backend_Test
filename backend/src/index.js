import express from 'express';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from './config/db.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

export default app; //for testing

export const startServer = async () => {
    await connect();
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Only start the server if NOT in test environment
if (process.env.NODE_ENV!== 'test') {  // CRUCIAL
    startServer();
}

