import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  getReadiness() {
    // Add any readiness checks here (database connections, external services, etc.)
    const checks = {
      application: true,
      // Add more checks as needed:
      // database: this.checkDatabaseConnection(),
      // blockchain: this.checkBlockchainConnection(),
    };

    const isReady = Object.values(checks).every((check) => check === true);

    return {
      status: isReady ? 'ready' : 'not ready',
      timestamp: new Date().toISOString(),
      checks,
    };
  }
}
