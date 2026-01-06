# Vercel Deployment Guide for FL (Static Site)

Since FL is a static site (HTML/CSS/JS) with no backend requirements, deploying to Vercel is free, instant, and provides a global CDN.

## Prerequisites
1.  A GitHub account (recommended) or Vercel account.
2.  The FL project files on your local machine.

## Option 1: Deploy via GitHub (Recommended for Updates)

1.  **Initialize Git**:
    ```bash
    git init
    git add .
    git commit -m "Initial deploy of FL"
    ```

2.  **Push to GitHub**:
    *   Create a new repository on GitHub (e.g., `free-life-experiment`).
    *   Push your local code to this repository.

3.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com) and log in.
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your `free-life-experiment` repository.
    *   **Framework Preset**: Select "Other" (since it's plain HTML).
    *   Click **"Deploy"**.

4.  **Done!**: Vercel will give you a URL (e.g., `free-life-experiment.vercel.app`). Any change you push to GitHub will automatically redeploy the site.

## Option 2: Deploy via Vercel CLI (Fastest for Testing)

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Deploy**:
    Run this command in your project root:
    ```bash
    vercel
    ```
    *   Follow the prompts (Hit Enter for defaults).
    *   It will upload your files and give you a live `https://...` URL immediately.

3.  **Production Deploy**:
    To deploy to production (main URL):
    ```bash
    vercel --prod
    ```

## Verify Deployment
After deployment, check these key features on the live site:
1.  **LocalStorage**: Vote for an idea, refresh the page. The vote count should persist.
2.  **Navigation**: Click between Home, Build Log, Vote, and Community.
3.  **Sharing**: Test the "Share to X" button.

---
**Note on Data Persistence**: Since we use `localStorage`, user votes and comments are stored *in their own browser*. They will not see other people's votes in real-time unless you upgrade to a real backend (Firebase/Supabase) later. This is part of the "Day 1" charm!
