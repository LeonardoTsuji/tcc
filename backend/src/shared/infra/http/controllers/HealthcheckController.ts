import { Request, Response } from 'express';

import { HealthStatus } from '@shared/utils/HealthStatus';
import { getConnection } from 'typeorm';

export default class HealthcheckController {
  public async create(request: Request, response: Response): Promise<Response> {
    const health: HealthStatus = {
      status: 'Healthy',
      results: {
        postgreSQL: {
          status: 'Healthy',
        },
      },
    };

    try {
      const databaseConnection = getConnection();
      await databaseConnection.query(
        'SELECT id FROM frotistas ORDER BY id DESC LIMIT 1',
      );
    } catch (error) {
      health.results.postgreSQL.status = 'Unhealthy';
      health.results.postgreSQL.description = error.message;
      health.status = 'Unhealthy';
    }

    if (health.status === 'Unhealthy') {
      return response.status(503).json(health);
    }

    return response.json(health);
  }
}
