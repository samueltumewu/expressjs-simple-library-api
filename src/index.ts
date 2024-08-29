import express from 'express';
import dotenv from 'dotenv';
import libraryRoute from './routes/libraryRoute';
import baseRoute from './routes/baseRoute';

// App properties
dotenv.config({path: ['.env']});

const app = express();
app.use(express.json());

//routes
app.use('/', baseRoute);
app.use('/api/library', libraryRoute);

const APP_PORT = process.env.port || 3001;

app.listen(APP_PORT, () => {
    console.log(`Server is running on port: ${APP_PORT} `);
})