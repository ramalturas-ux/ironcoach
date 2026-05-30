# IronCoach — Deployment Guide

## Project Structure
```
ironcoach/
├── public/
│   └── index.html       ← The full app
├── api/
│   ├── chat.js          ← Anthropic API proxy (keeps key secret)
│   └── data.js          ← Reads/writes workout data to Upstash Redis
├── vercel.json          ← Routing config
└── README.md
```

---

## Step 1 — Push to GitHub

On your computer, open Terminal and run:

```bash
git clone https://github.com/ramalturas-ux/ironcoach.git
cd ironcoach
```

Then copy all these files into that folder, and run:

```bash
git add .
git commit -m "Initial IronCoach build"
git push origin main
```

---

## Step 2 — Import project on Vercel

1. Go to vercel.com
2. Click **Add New → Project**
3. Find **ironcoach** in your GitHub repos, click **Import**
4. Leave all settings as default
5. Click **Deploy**

It will fail the first time — that's expected, we haven't added the environment variables yet.

---

## Step 3 — Add environment variables on Vercel

Go to your Vercel project → **Settings → Environment Variables** and add these 3:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `UPSTASH_REDIS_REST_URL` | From Upstash dashboard (see below) |
| `UPSTASH_REDIS_REST_TOKEN` | From Upstash dashboard (see below) |

### Getting Upstash credentials:
1. Go to vercel.com → **Storage → ironcoach-db**
2. Click **.env.local** tab
3. You'll see `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
4. Copy those values into Vercel environment variables

---

## Step 4 — Redeploy

After adding environment variables:
1. Go to **Deployments** tab on Vercel
2. Click the three dots on the latest deployment
3. Click **Redeploy**

Your app will be live at: `https://ironcoach.vercel.app`

---

## Step 5 — Add to iPhone home screen

1. Open `https://ironcoach.vercel.app` in Safari on your iPhone
2. Tap Share → **Add to Home Screen**
3. Tap Add

Done — IronCoach is now a PWA on your home screen with persistent cloud storage.
