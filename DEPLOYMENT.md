# \ud83d\ude80 SkillZone Deployment Guide

This guide covers deploying SkillZone to Vercel (recommended) and other platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Vercel Deployment](#vercel-deployment)
3. [Environment Configuration](#environment-configuration)
4. [Post-Deployment](#post-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- \u2705 Git repository set up
- \u2705 All dependencies installed (`npm install`)
- \u2705 Project builds successfully (`npm run build`)
- \u2705 Tests pass (if applicable)
- \u2705 Environment variables configured

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/klymori/SkillZone.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project settings:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Add Environment Variables** (if needed)
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add any required variables

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

### Automatic Deployments

Vercel automatically deploys:
- **Production:** Commits to `main` branch
- **Preview:** Pull requests and other branches

---

## Environment Configuration

### Production Environment Variables

Create environment variables in Vercel dashboard:

```bash
# API Configuration (if using backend)
VITE_API_URL=https://api.skillzone.com

# App Configuration
VITE_APP_NAME=SkillZone
VITE_APP_VERSION=1.1.0

# Formspree (Contact Form)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mrbyywny

# Analytics (optional)
VITE_GA_ID=your-google-analytics-id
```

### vercel.json Configuration

The project includes a `vercel.json` file for optimal configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Post-Deployment

### 1. Domain Configuration

**Custom Domain:**
```bash
# Add custom domain in Vercel dashboard
# Settings > Domains > Add Domain
```

**Configure DNS:**
- Add CNAME record pointing to `cname.vercel-dns.com`
- Or add A record pointing to Vercel's IP

### 2. Performance Checks

Run performance audits:
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://your-site.vercel.app

# Web Vitals
# Check in Vercel Analytics dashboard
```

### 3. Monitoring

**Vercel Analytics:**
- Enable in project settings
- Monitor Core Web Vitals
- Track real user metrics

**Error Tracking:**
- Integrate Sentry or similar service
- Add error boundary components
- Monitor console errors

---

## CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/ci-cd.yml`):

### Workflow Steps:
1. **Lint & Type Check** - Ensures code quality
2. **Build** - Verifies successful build
3. **Deploy** - Automatic deployment to Vercel

### Workflow Triggers:
- Push to `main` branch
- Pull requests to `main`

---

## Troubleshooting

### Build Failures

**Issue:** Build fails with dependency errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue:** TypeScript errors during build
```bash
# Solution: Run type check locally
npm run type-check

# Fix errors and rebuild
npm run build
```

### Routing Issues

**Issue:** 404 on page refresh
```bash
# Solution: Ensure vercel.json has rewrites configured
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Performance Issues

**Issue:** Slow initial load
```bash
# Solution: Check bundle size
npm run build -- --analyze

# Optimize imports and use lazy loading
# Already implemented in src/routes/router.tsx
```

### Translation Not Working

**Issue:** Translations don't load
```bash
# Solution: Verify i18n configuration
# Check src/i18n/config.ts
# Ensure language files are included in build
```

---

## Deployment Checklist

Before deploying to production:

- [ ] All features tested locally
- [ ] Responsive design verified on mobile/tablet/desktop
- [ ] Dark/light theme working correctly
- [ ] All translations complete (EN/RU/KG)
- [ ] Contact form tested with Formspree
- [ ] Environment variables configured
- [ ] Build completes without errors
- [ ] ESLint passes with no errors
- [ ] TypeScript type check passes
- [ ] Performance optimized (lazy loading enabled)
- [ ] SEO meta tags configured
- [ ] Analytics set up (if applicable)
- [ ] Error monitoring configured
- [ ] README updated with latest features

---

## Platform-Specific Guides

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Redirects (_redirects file)
/*    /index.html   200
```

### Cloudflare Pages

```bash
# Build command
npm run build

# Build output directory
dist

# Environment variables
# Add in Pages dashboard
```

### AWS Amplify

```bash
# amplify.yml
version: 1
frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

---

## Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use Vercel environment variables for secrets
   - Rotate API keys regularly

2. **Dependencies:**
   ```bash
   # Regular security audits
   npm audit
   npm audit fix
   ```

3. **Headers:**
   - CSP headers configured in vercel.json
   - CORS properly configured
   - Security headers enabled

---

## Monitoring & Maintenance

### Regular Tasks:

**Weekly:**
- Check Vercel analytics
- Review error logs
- Monitor performance metrics

**Monthly:**
- Update dependencies
- Security audit
- Performance optimization review

**Quarterly:**
- Major version updates
- Feature roadmap review
- User feedback analysis

---

## Support

For deployment issues:
- **Email:** kaqqakat@gmail.com
- **Telegram:** @xbown
- **GitHub Issues:** [Create an issue](https://github.com/klymori/SkillZone/issues)

---

**Happy Deploying! \ud83d\ude80**

*Last updated: 2025-10-12*
