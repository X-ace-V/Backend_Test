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

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
    console.log('MongoDB connected');
});
