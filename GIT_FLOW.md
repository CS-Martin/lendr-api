# Git Flow & Deployment Operations

This document outlines the Git workflow, CI/CD pipeline, and operational procedures for the Lendr API project.

## 🎯 Git Branching Strategy

We follow a simplified Git Flow with the following branches:

### Main Branches
- **`main`** - Production-ready code, automatically deploys to staging
- **`develop`** - Integration branch for features (if needed)

### Supporting Branches
- **`feature/*`** - Feature branches (e.g., `feature/user-authentication`)
- **`bugfix/*`** - Bug fix branches (e.g., `bugfix/api-validation`)
- **`hotfix/*`** - Emergency fixes for production (e.g., `hotfix/security-patch`)

## 🔄 CI/CD Pipeline Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────────┐    ┌─────────────┐
│   Feature   │ => │ Pull Request│ => │     Staging     │ => │  Production │
│   Branch    │    │   Review    │    │   Deployment    │    │  Deployment │
└─────────────┘    └─────────────┘    └─────────────────┘    └─────────────┘
     ↑                    ↑                    │                      │
     │                    │                    ↓                      ↓
     └────────────────────┼───────────── Auto Deploy ──────── Tag Release
                          │
                    Manual Review
```

### Environments

| Environment | Branch/Trigger | Image Tag | URL | Purpose |
|-------------|---------------|-----------|-----|---------|
| **Development** | Local | N/A | `localhost:3000` | Local development |
| **Staging** | `main` push | `lendrapi/lendr-api:staging` | `localhost:3001` | Pre-production testing |
| **Production** | Tag `v*` | `lendrapi/lendr-api:latest`<br>`lendrapi/lendr-api:v1.2.0` | Production server | Live application |

## 🚀 Development Workflow

### 1. Starting New Work

```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Make changes, commit regularly
git add .
git commit -m "feat: add user authentication"

# Push to remote
git push origin feature/your-feature-name
```

### 2. Creating a Pull Request

1. **Push your branch** to GitHub
2. **Create a Pull Request** from `feature/*` to `main`
3. **Add reviewers** and wait for approval
4. **Merge** using "Squash and merge" to keep history clean

### 3. Pull Request Requirements

- [ ] **Tests pass** - All CI checks green
- [ ] **Code reviewed** - At least 1 approval
- [ ] **No merge conflicts** - Branch up to date with main
- [ ] **Documentation updated** - If API changes
- [ ] **Environment variables** - Added to deployment docs

## 🔧 CI/CD Workflows

### Staging Deployment (Automatic)

**Trigger**: Push to `main` branch
**Workflow**: `.github/workflows/deploy.yml`

```yaml
# What happens automatically:
1. Checkout code
2. Login to Docker Hub
3. Build image: lendrapi/lendr-api:staging
4. Push to Docker Hub
5. Ready for docker-compose up
```

### Production Deployment (Manual)

**Trigger**: Git tag creation (e.g., `v1.2.0`)
**Workflow**: `.github/workflows/production-deploy.yml`

```yaml
# What happens automatically:
1. Checkout code
2. Login to Docker Hub
3. Extract tag name
4. Build TWO images:
   - lendrapi/lendr-api:latest
   - lendrapi/lendr-api:v1.2.0
5. Push both to Docker Hub
```

## 📦 Release Process

### Creating a Release

```bash
# 1. Ensure you're on main and up to date
git checkout main
git pull origin main

# 2. Create version tag (semantic versioning)
git tag v1.2.0

# 3. Push tag to trigger production deployment
git push origin v1.2.0
```

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH** (e.g., `v1.2.3`)
- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Release Checklist

- [ ] **Code freeze** - No new features during release
- [ ] **Testing complete** - Staging thoroughly tested
- [ ] **Documentation updated** - README, API docs
- [ ] **Migration scripts** - If database changes
- [ ] **Rollback plan** - Documented recovery steps
- [ ] **Tag created** - Semantic version (v1.2.0)
- [ ] **Monitor deployment** - Check logs and health endpoints

## 🐳 Docker Operations

### Local Development

```bash
# Start staging environment
docker-compose up lendr-api-staging

# Start production environment
docker-compose up lendr-api

# View logs
docker-compose logs -f lendr-api
docker-compose logs -f lendr-api-staging
```

### Production Server Setup

```bash
# 1. SSH to production server
ssh user@production-server

# 2. Pull latest images
docker pull lendrapi/lendr-api:latest

# 3. Update docker-compose.yml with new image
# (Already configured to use latest tag)

# 4. Deploy
docker-compose up -d lendr-api

# 5. Check health
curl http://localhost:3000/health
```

### Watchtower Auto-Updates

The production setup includes Watchtower for automatic updates:

```bash
# Watchtower will automatically update containers when new images are pushed
# No manual intervention needed for patch deployments
```

## 📊 Monitoring & Health Checks

### Health Endpoints

- **Health Check**: `GET /health` - Application status
- **Readiness Check**: `GET /ready` - Dependency status

### Docker Health Checks

```bash
# Check container health
docker ps

# View health status
docker inspect lendr-api-container | grep -A 10 "Health"
```

### Logs

```bash
# Application logs
docker-compose logs -f lendr-api

# System logs
docker logs watchtower
```

## 🚨 Incident Response

### Rollback Procedures

#### Immediate Rollback (Last Working Version)

```bash
# 1. Stop current container
docker-compose stop lendr-api

# 2. Update docker-compose.yml to use previous tag
# Change: image: lendrapi/lendr-api:v1.1.9

# 3. Restart with previous version
docker-compose up -d lendr-api

# 4. Verify health
curl http://localhost:3000/health
```

#### Emergency Hotfix

```bash
# 1. Create hotfix branch from main
git checkout -b hotfix/critical-security-fix main

# 2. Make minimal fix
# 3. Test and commit
# 4. Push and create PR to main
# 5. Merge and tag new version
```

### Communication

1. **Internal**: Slack/Discord notification
2. **External**: Status page update
3. **Customers**: Email notification for major incidents

## 🔐 Security & Secrets

### Environment Variables

Required secrets stored in `.env`:

```bash
# Production secrets
RPC_URL_AMOY=https://polygon-amoy.g.alchemy.com/v2/YOUR_KEY
RELAYER_PRIVATE_KEY=your_private_key_without_0x_prefix

# GitHub Secrets (for CI/CD)
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PASSWORD=your_dockerhub_password
```

### Security Best Practices

- [ ] **No secrets in code** - Use environment variables
- [ ] **Regular dependency updates** - Automated via Watchtower
- [ ] **Access control** - Limited Docker Hub access
- [ ] **Network security** - Internal networks only
- [ ] **Regular security audits** - Monthly dependency checks

## 📈 Performance & Scaling

### Monitoring Metrics

- **Response times** - API endpoint performance
- **Error rates** - Application errors and exceptions
- **Resource usage** - CPU, memory, disk
- **Health checks** - Container and application health

### Scaling Strategies

```bash
# Horizontal scaling
docker-compose up --scale lendr-api=3 -d

# Vertical scaling (increase resources)
# Update docker-compose.yml with higher limits
```

## 🔄 Maintenance Tasks

### Weekly
- [ ] **Log review** - Check for errors and warnings
- [ ] **Performance monitoring** - Review metrics and alerts
- [ ] **Security updates** - Update dependencies

### Monthly
- [ ] **Full backup verification** - Test backup restoration
- [ ] **Load testing** - Simulate traffic spikes
- [ ] **Security audit** - Review access and permissions

### Quarterly
- [ ] **Infrastructure review** - Assess scaling needs
- [ ] **Documentation update** - Keep runbooks current
- [ ] **Disaster recovery test** - Full failover simulation

## 📚 Resources

- [Git Flow Documentation](https://nvie.com/posts/a-successful-git-branching-model/)
- [Semantic Versioning](https://semver.org/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Watchtower Documentation](https://containrrr.dev/watchtower/)


