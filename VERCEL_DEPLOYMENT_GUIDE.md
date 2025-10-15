# 🚀 Deploying to Vercel - Complete Guide

This guide will help you deploy both the Backend API and Frontend React app to Vercel.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Custom Domain (Optional)](#custom-domain-optional)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub (recommended for automatic deployments)

### 2. Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

### 3. Prepare Your Repository
- Ensure all changes are committed to git
- Push to GitHub (already done ✅)

---

## 🔧 Backend Deployment

### Step 1: Deploy Backend to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Add New Project"

2. **Import Repository**
   - Select your GitHub repository: `interactive-comment-system`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Select `Backend`
   - **Build Command**: Leave empty (not needed for Node.js API)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables** (CRITICAL)
   Click "Environment Variables" and add ALL these:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=3000
   ```

   ⚠️ **Important**: Add these for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment
   - You'll get a URL like: `https://your-backend-xxx.vercel.app`
   - **Save this URL** - you'll need it for the Frontend!

#### Option B: Using Vercel CLI

```bash
# Navigate to Backend directory
cd Backend

# Login to Vercel (first time only)
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? interactive-comment-backend
# - Directory? ./
# - Override settings? N

# After successful deployment, note the URL
# Example: https://interactive-comment-backend.vercel.app
```

### Step 2: Update Backend CORS

After deployment, update your backend `app.js` to allow your Vercel frontend:

```javascript
// In Backend/app.js, update CORS origins
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://your-frontend-url.vercel.app",  // Add your frontend URL
        "https://*.vercel.app"  // Allow all Vercel preview deployments
    ],
    credentials: true,
    exposedHeaders: ["Cross-Origin-Opener-Policy"],
};
```

### Step 3: Update Google OAuth Redirect URIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Edit your OAuth 2.0 Client ID
5. Add to **Authorized JavaScript origins**:
   ```
   https://your-backend-url.vercel.app
   https://your-frontend-url.vercel.app
   ```
6. Add to **Authorized redirect URIs**:
   ```
   https://your-backend-url.vercel.app/api/users/google-login
   https://your-frontend-url.vercel.app/login
   ```
7. Click "Save"

---

## 🎨 Frontend Deployment

### Step 1: Deploy Frontend to Vercel

#### Option A: Using Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Add New Project"

2. **Import Same Repository** (Yes, same repo!)
   - Select your GitHub repository: `interactive-comment-system`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: Click "Edit" → Select `Frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

   ⚠️ **Replace** `your-backend-url.vercel.app` with the actual backend URL from Step 1!

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build and deployment
   - You'll get a URL like: `https://your-frontend-xxx.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Navigate to Frontend directory
cd Frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? interactive-comment-frontend
# - Directory? ./
# - Override settings? N

# Set environment variables
vercel env add REACT_APP_API_URL
# Enter: https://your-backend-url.vercel.app

vercel env add REACT_APP_GOOGLE_CLIENT_ID
# Enter: your_google_client_id

# Redeploy with environment variables
vercel --prod
```

---

## 🔐 Environment Variables Setup

### Backend Environment Variables

| Variable | Where to Get | Example |
|----------|--------------|---------|
| `MONGODB_URI` | MongoDB Atlas → Clusters → Connect | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `ACCESS_TOKEN_SECRET` | Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` | Random 128-char string |
| `REFRESH_TOKEN_SECRET` | Generate: (same command as above) | Random 128-char string |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → Credentials | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console → Credentials | `GOCSPX-xxxxx` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard | `your_api_secret` |

### Frontend Environment Variables

| Variable | Value |
|----------|-------|
| `REACT_APP_API_URL` | Your backend Vercel URL (no trailing slash) |
| `REACT_APP_GOOGLE_CLIENT_ID` | Same as backend Google Client ID |

---

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch (Production)
- Create preview deployments for pull requests
- Show deployment status in GitHub PRs

### Enable Auto-Deployment

1. Go to your Vercel project settings
2. Navigate to "Git" tab
3. Ensure "Production Branch" is set to `main`
4. Enable "Automatic Deployments" (should be on by default)

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. **Buy a Domain** (if you don't have one)
   - Namecheap, GoDaddy, Google Domains, etc.

2. **Add Domain to Vercel**
   - Go to Project Settings → Domains
   - Enter your domain (e.g., `myapp.com`)
   - Click "Add"

3. **Configure DNS**
   - Vercel will show DNS records to add
   - Go to your domain registrar
   - Add the A/CNAME records as shown
   - Wait 24-48 hours for DNS propagation

4. **SSL Certificate**
   - Vercel automatically provisions SSL (HTTPS)
   - Certificate auto-renews

---

## 🐛 Troubleshooting

### Issue 1: Backend API Not Responding

**Symptoms**: Frontend can't connect to backend, CORS errors

**Solutions**:
```bash
# 1. Check Vercel logs
vercel logs https://your-backend-url.vercel.app

# 2. Verify environment variables are set
# Go to Project Settings → Environment Variables

# 3. Check CORS configuration includes frontend URL
# Update Backend/app.js corsOptions.origin array

# 4. Redeploy backend
cd Backend
vercel --prod
```

### Issue 2: Environment Variables Not Working

**Symptoms**: 500 errors, "undefined" values

**Solutions**:
- Environment variables in Vercel don't auto-reload
- After adding/changing variables, **redeploy**:
  ```bash
  vercel --prod
  ```
- For React apps, variables MUST start with `REACT_APP_`
- Verify variables in Project Settings → Environment Variables

### Issue 3: MongoDB Connection Failed

**Symptoms**: "Could not connect to MongoDB"

**Solutions**:
- Check MongoDB Atlas IP whitelist
- Add Vercel's IP range: `0.0.0.0/0` (all IPs)
- Or use MongoDB Atlas's "Allow access from anywhere"
- Verify MONGODB_URI is correct in Vercel environment variables

### Issue 4: Google OAuth Not Working

**Symptoms**: COOP errors, redirect errors

**Solutions**:
1. Update Google Cloud Console authorized origins:
   ```
   https://your-frontend.vercel.app
   https://your-backend.vercel.app
   ```
2. Update redirect URIs:
   ```
   https://your-frontend.vercel.app/login
   https://your-backend.vercel.app/api/users/google-login
   ```
3. Wait 5-10 minutes for Google to propagate changes
4. Clear browser cache

### Issue 5: Build Failed

**Symptoms**: Deployment fails during build

**Solutions**:
```bash
# Check build logs in Vercel dashboard

# Common fixes:
# 1. Ensure package.json has correct scripts
# 2. Check for missing dependencies
# 3. Fix any TypeScript/ESLint errors
# 4. Test build locally first:
npm run build
```

### Issue 6: 404 on Refresh (Frontend)

**Symptoms**: Works on home, 404 on page refresh

**Solution**: Ensure `vercel.json` exists in Frontend with rewrites (already created ✅)

### Issue 7: File Upload Not Working

**Symptoms**: Avatar upload fails

**Note**: Vercel has serverless function limitations
- Max file size: 4.5MB (Body Parser Limit)
- Max execution time: 10 seconds (Hobby), 60 seconds (Pro)

**Solutions**:
- Ensure Cloudinary is configured (files go to cloud, not Vercel)
- Check CLOUDINARY variables in Vercel
- Reduce image size before upload (client-side compression)

---

## 📝 Deployment Checklist

### Before Deployment
- [ ] All code committed and pushed to GitHub
- [ ] MongoDB Atlas IP whitelist updated (0.0.0.0/0)
- [ ] Google OAuth credentials configured
- [ ] Cloudinary account active
- [ ] All environment variables ready

### Backend Deployment
- [ ] Backend deployed to Vercel
- [ ] Environment variables added
- [ ] API endpoint accessible (test: /api/users/current-user)
- [ ] Logs show no errors
- [ ] Backend URL saved

### Frontend Deployment
- [ ] Frontend deployed to Vercel
- [ ] REACT_APP_API_URL points to backend
- [ ] REACT_APP_GOOGLE_CLIENT_ID added
- [ ] Site loads correctly
- [ ] Can register/login
- [ ] Comments work
- [ ] Upvotes work
- [ ] Google OAuth works

### Post-Deployment
- [ ] Google Console URIs updated
- [ ] Backend CORS updated with frontend URL
- [ ] Custom domain configured (optional)
- [ ] Auto-deployment enabled
- [ ] Test all features on production

---

## 🎯 Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (current directory)
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs <deployment-url>

# List deployments
vercel ls

# Add environment variable
vercel env add VARIABLE_NAME

# Remove project
vercel remove <project-name>
```

---

## 🔗 Useful Links

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel CLI Reference**: https://vercel.com/docs/cli
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **Custom Domains**: https://vercel.com/docs/concepts/projects/custom-domains
- **Build Configuration**: https://vercel.com/docs/build-step

---

## 🎉 Success!

Your application is now live on Vercel! Share your URLs:

- **Backend API**: `https://your-backend.vercel.app`
- **Frontend App**: `https://your-frontend.vercel.app`

Every push to `main` branch will automatically deploy updates! 🚀
