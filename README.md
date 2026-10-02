# Family Friends Moving

Marketing site inspired by premium moving company layouts, with a **click-through quote modal** (All My Sons `/new_quote/move/` question flow) and **staff/admin login** for quote leads.

## Service areas

- Los Angeles County
- Orange County
- San Diego County

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set passwords before production.

Default logins (change via env):

| Portal | URL | Username | Password |
|--------|-----|----------|----------|
| Admin | `/admin/login` | `admin` | `family123` |
| Staff | `/staff/login` | `staff` | `family123` |

## Production (Vercel)

1. Connect this repo to Vercel or run `vercel --prod`.
2. Set environment variables in Vercel → Settings → Environment Variables:
   - `SESSION_SECRET` (32+ random characters)
   - `ADMIN_USERNAME`, `ADMIN_PASSWORD`
   - `STAFF_USERNAME`, `STAFF_PASSWORD`
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (required for quote storage on Vercel)

Create a free Redis database at [Upstash](https://console.upstash.com/) and paste the REST URL and token.

## Custom domain DNS (Family Friends Moving)

In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), add the records Vercel shows under **Project → Settings → Domains** after you add your domain. Typical setup:

| Type | Name / Host | Value | Notes |
|------|-------------|-------|--------|
| **A** | `@` | `76.76.21.21` | Apex/root domain |
| **CNAME** | `www` | `cname.vercel-dns.com` | WWW subdomain |

If you use Cloudflare, proxy (orange cloud) is OK; SSL is handled by Vercel once the domain verifies.

After DNS propagates (minutes to 48 hours), Vercel will issue HTTPS automatically.
