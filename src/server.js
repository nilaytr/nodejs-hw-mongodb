import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use((req, res, next) => {
        res.status(400).json({
            message: 'Not found',
        });
    });

};
