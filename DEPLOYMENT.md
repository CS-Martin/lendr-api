# Lendr API Deployment Guide

This guide covers various deployment options for the Lendr API, a NestJS application that interacts with blockchain smart contracts on Polygon Amoy testnet.

## Prerequisites

- **Bun** (package manager) - [Install Bun](https://bun.sh/docs/installation)
- **Docker** (for containerized deployment) - [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js 20+** (if not using Docker)

## Environment Setup

### 1. Environment Variables

Create a `.env` file for development or `.env.production` for production:

```bash
# Environment Configuration
NODE_ENV=production
PORT=3000

# Blockchain Configuration
RPC_URL_AMOY=https://polygon-amoy.g.alchemy.com/v2/<your-alchemy-key>
RELAYER_PRIVATE_KEY=your_private_key_without_0x_prefix

# Optional: Additional RPC URLs
RPC_URL_POLYGON=https://polygon-mainnet.g.alchemy.com/v2/<your-alchemy-key>
RPC_URL_ETHEREUM=https://eth-mainnet.g.alchemy.com/v2/<your-alchemy-key>
```

### 2. Install Dependencies

```bash
bun install
```

## Deployment Options

### Option 1: Local Development

```bash
# Start in development mode with hot reload
bun run start:dev

# Or start in production mode
bun run build
bun run start:prod
```

### Option 2: Docker Deployment

#### Quick Start with Docker Compose

```bash
# Development environment
bun run docker:dev

# Production environment
bun run docker:prod
```

#### Manual Docker Commands

```bash
# Build the Docker image
bun run docker:build

# Run the container
bun run docker:run
```

#### Custom Docker Deployment

```bash
# Build image
docker build -t lendr-api .

# Run with environment file
docker run -d \
  --name lendr-api-container \
  --env-file .env.production \
  -p 3000:3000 \
  --restart unless-stopped \
  lendr-api
```

### Option 3: Automated Deployment Script

```bash
# Make the script executable (Linux/macOS)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The deployment script will:

- Build the Docker image
- Stop any existing containers
- Start a new container
- Perform health checks
- Clean up old images

## Production Considerations

### 1. Security

- Use environment variables for sensitive data
- Run containers as non-root user (already configured)
- Use HTTPS in production (configure nginx with SSL)
- Implement rate limiting (nginx configuration included)

### 2. Monitoring

The application includes health check endpoints:

- **Health Check**: `GET /health` - Basic application health
- **Readiness Check**: `GET /ready` - Application readiness status

### 3. Reverse Proxy (Nginx)

A production-ready nginx configuration is included in `nginx.conf` with:

- Rate limiting
- Security headers
- Load balancing
- SSL termination (uncomment HTTPS section)

### 4. Scaling

For horizontal scaling:

```bash
# Scale the application
docker-compose up --scale lendr-api=3 -d
```

Update nginx configuration to load balance between multiple instances.

## Cloud Deployment

### AWS ECS/Fargate

1. Push your Docker image to ECR
2. Create an ECS task definition
3. Set up environment variables in ECS
4. Configure load balancer

### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/lendr-api

# Deploy to Cloud Run
gcloud run deploy lendr-api \
  --image gcr.io/PROJECT-ID/lendr-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Railway

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Heroku

```bash
# Install Heroku CLI and login
heroku create lendr-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set RPC_URL_AMOY=your_rpc_url
heroku config:set RELAYER_PRIVATE_KEY=your_private_key

# Deploy
git push heroku main
```

## Health Monitoring

### Health Check Endpoints

- `GET /health` - Returns application status, uptime, and version
- `GET /ready` - Returns readiness status with dependency checks

### Docker Health Checks

The Dockerfile includes built-in health checks that monitor the application every 30 seconds.

### Monitoring with External Tools

- **Prometheus + Grafana**: Add metrics endpoints
- **Sentry**: Add error tracking
- **DataDog**: Add APM monitoring

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Find and kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Docker build fails**

   ```bash
   # Clean Docker cache
   docker system prune -a
   ```

3. **Environment variables not loaded**
   - Ensure `.env.production` exists
   - Check file permissions
   - Verify variable names match code

### Logs

```bash
# View application logs
docker logs lendr-api-container

# Follow logs in real-time
docker logs -f lendr-api-container
```

### Debug Mode

```bash
# Run in debug mode
bun run start:debug

# Or with Docker
docker run -p 3000:3000 --env-file .env lendr-api bun run start:debug
```

## API Documentation

Once deployed, access the interactive API documentation at:

- **Swagger UI**: `http://your-domain/api`
- **Health Check**: `http://your-domain/health`

## Support

For deployment issues:

1. Check the logs: `docker logs lendr-api-container`
2. Verify environment variables
3. Test health endpoints
4. Review nginx configuration if using reverse proxy
