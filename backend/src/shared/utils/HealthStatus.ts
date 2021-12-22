export interface HealthStatus {
  status: 'Healthy' | 'Unhealthy';
  results: {
    postgreSQL: {
      status: 'Healthy' | 'Unhealthy';
      description?: string;
      /* eslint-disable @typescript-eslint/no-explicit-any */
      data?: any;
    };
  };
}
