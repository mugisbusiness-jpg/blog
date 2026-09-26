# CopyRaid Blog

Official CopyRaid editorial and SEO publishing system for **blog.copyraid.com**.

## What is built

- Next.js 14 responsive frontend
- CopyRaid logo and brand styling
- Supabase-backed publishing
- Admin login and CMS at `/admin`
- Create, edit, delete, draft and publish articles
- Categories and tags
- Featured image upload with Supabase Storage
- Featured homepage articles
- Markdown article editor
- SEO title + meta description per article
- Canonical URLs
- Open Graph / Twitter metadata
- Article + Organization JSON-LD
- Dynamic `sitemap.xml`
- `robots.txt`
- RSS at `/rss.xml`
- Related articles
- Help Center source links
- Starter articles adapted from CopyRaid Help Center content

The blog articles are adapted rather than cloning all Help Center pages word-for-word. The Help Center remains the product documentation source while the Blog targets broader informational search intent.

## Supabase setup

Run these in the Supabase SQL Editor, in order:

1. `supabase/migrations/001_blog.sql`
2. `supabase/seed.sql`

Existing CopyRaid users with `profiles.role = 'admin'` are automatically added to `blog_admins` when the migration runs. If you ever need to add another blog-only admin manually:

```sql
insert into public.blog_admins (user_id,email)
select id,email
from auth.users
where email='YOUR-ADMIN-EMAIL@example.com'
on conflict (user_id) do update set email=excluded.email;
```

The schema creates a public Storage bucket called `blog-images`. Only users listed in `blog_admins` can upload/update/delete images.

## Vercel environment variables

```
NEXT_PUBLIC_SITE_URL=https://blog.copyraid.com
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Never expose a Supabase service-role key as a `NEXT_PUBLIC_` variable.

## Deploy

Import this repository into Vercel as a Next.js project. After it deploys:

1. Vercel → Project → Settings → Domains
2. Add `blog.copyraid.com`
3. Add the DNS record Vercel requests
4. Confirm SSL is active
5. Submit `https://blog.copyraid.com/sitemap.xml` in Google Search Console

## Admin

Visit `https://blog.copyraid.com/admin/login`.

The account must already exist in Supabase Auth and its user ID must be present in `public.blog_admins`.

## Content relationship

Product documentation: https://help.copyraid.com

Main platform: https://copyraid.com

Blog: https://blog.copyraid.com
