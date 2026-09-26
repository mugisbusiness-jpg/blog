create extension if not exists pgcrypto;

create table if not exists public.blog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Copyright Guides',
  tags text[] not null default '{}',
  featured_image text,
  seo_title text,
  seo_description text,
  source_help_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  featured boolean not null default false,
  author_name text not null default 'CopyRaid Editorial',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.blog_posts to anon;
grant select,insert,update,delete on public.blog_posts to authenticated;
grant select on public.blog_admins to authenticated;

create or replace function public.touch_blog_post()
returns trigger
language plpgsql
set search_path = ''
as $
begin
  new.updated_at=now();
  if new.status='published' and new.published_at is null then new.published_at=now(); end if;
  return new;
end $$;

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts
for each row execute function public.touch_blog_post();

alter table public.blog_admins enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts" on public.blog_posts
for select to anon using (status='published');

drop policy if exists "Admins can read all blog posts" on public.blog_posts;
create policy "Admins can read all blog posts" on public.blog_posts
for select to authenticated using (exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));

drop policy if exists "Admins can insert blog posts" on public.blog_posts;
create policy "Admins can insert blog posts" on public.blog_posts
for insert to authenticated with check (exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));

drop policy if exists "Admins can update blog posts" on public.blog_posts;
create policy "Admins can update blog posts" on public.blog_posts
for update to authenticated using (exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())))
with check (exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));

drop policy if exists "Admins can delete blog posts" on public.blog_posts;
create policy "Admins can delete blog posts" on public.blog_posts
for delete to authenticated using (exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));

drop policy if exists "Admins can read own admin row" on public.blog_admins;
create policy "Admins can read own admin row" on public.blog_admins
for select to authenticated using (user_id=(select auth.uid()));

insert into public.blog_admins(user_id,email)
select p.id,u.email
from public.profiles p
join auth.users u on u.id=p.id
where p.role='admin'
on conflict(user_id) do update set email=excluded.email;

insert into storage.buckets(id,name,public)
values('blog-images','blog-images',true)
on conflict(id) do update set public=true;

drop policy if exists "Public can read blog images" on storage.objects;
create policy "Public can read blog images" on storage.objects
for select to public using (bucket_id='blog-images');

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images" on storage.objects
for insert to authenticated with check (bucket_id='blog-images' and exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images" on storage.objects
for update to authenticated using (bucket_id='blog-images' and exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())))
with check (bucket_id='blog-images' and exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images" on storage.objects
for delete to authenticated using (bucket_id='blog-images' and exists(select 1 from public.blog_admins a where a.user_id=(select auth.uid())));
