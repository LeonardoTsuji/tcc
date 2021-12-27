import 'reflect-metadata';
import '@shared/container';
import http from 'http';

import Debug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errors } from 'celebrate';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';

import AppError from '@shared/errors/AppError';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import '@shared/infra/typeorm';
import swaggerFile from '../../../../swagger.json';

const log = Debug('api:main');
log(`environment ${process.env.NODE_ENV}`);
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    console.log(error, 'error');
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

const server = http.createServer(app);

server.listen(process.env.PORT || 3333, () => {
  log(`Server Started on Port ${process.env.PORT || 3333}!`);
});
