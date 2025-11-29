# ✅ Windows Build Fix

## Problem
```
'NODE_OPTIONS' is not recognized as an internal or external command
```

This happens because Windows PowerShell/CMD uses different syntax than Linux/Mac.

## Solution

### 1. Install cross-env
```bash
npm install --save-dev cross-env
```

### 2. Build Script Updated
The build script now uses `cross-env` which works on all platforms:
```json
"build": "cross-env NODE_OPTIONS=--max-old-space-size=460 next build"
```

### 3. Run Build
```bash
npm run build
```

## What is cross-env?

`cross-env` is a package that allows you to set environment variables in a cross-platform way:
- ✅ Works on Windows (PowerShell, CMD)
- ✅ Works on Linux
- ✅ Works on Mac
- ✅ Works on Render/Vercel/Netlify

## For Local Development

If you just want to build locally without memory limits:
```bash
npm install
npm run build
```

## For Render Deployment

The `cross-env` package will work perfectly on Render's Linux servers, so your deployment will succeed.

## Alternative (Windows Only)

If you don't want to use cross-env, you can create a Windows-specific build:

**PowerShell:**
```powershell
$env:NODE_OPTIONS="--max-old-space-size=460"; npm run build
```

**CMD:**
```cmd
set NODE_OPTIONS=--max-old-space-size=460 && npm run build
```

But using `cross-env` is better because it works everywhere!

## Success!

After running `npm install`, you can build with:
```bash
npm run build
```

This will work on Windows, and the same command will work on Render! 🎉
