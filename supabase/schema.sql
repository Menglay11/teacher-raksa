-- Run this once in the Supabase SQL editor for the project.
create table if not exists public.event_details (
  id text primary key check (id = 'main'),
  title text not null,
  date date not null,
  time time not null,
  location text not null,
  message text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.event_details (id, title, date, time, location, message)
values (
  'main',
  'Teacher Raksa',
  '2026-11-09',
  '17:30',
  'To be confirmed',
  'A little evening of good food, lovely people, and a very special birthday. We would love to celebrate with you!'
)
on conflict (id) do nothing;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 1 and 100),
  contact text not null check (char_length(trim(contact)) between 3 and 160),
  guest_count smallint not null default 1 check (guest_count between 1 and 5),
  note text check (note is null or char_length(note) <= 500),
  created_at timestamptz not null default now()
);

create table if not exists public.birthday_wishes (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(trim(display_name)) between 1 and 80),
  wish text not null check (char_length(trim(wish)) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.event_details enable row level security;
alter table public.rsvps enable row level security;
alter table public.birthday_wishes enable row level security;

drop policy if exists "Anyone can view event details" on public.event_details;
create policy "Anyone can view event details"
  on public.event_details for select to anon, authenticated using (true);

drop policy if exists "Admins can update event details" on public.event_details;
create policy "Admins can update event details"
  on public.event_details for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true')
  with check ((auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true');

drop policy if exists "Guests can submit an RSVP" on public.rsvps;
create policy "Guests can submit an RSVP"
  on public.rsvps for insert to anon, authenticated with check (
    char_length(trim(full_name)) between 1 and 100
    and char_length(trim(contact)) between 3 and 160
    and guest_count between 1 and 5
    and (note is null or char_length(note) <= 500)
  );

drop policy if exists "Admins can view RSVPs" on public.rsvps;
create policy "Admins can view RSVPs"
  on public.rsvps for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'is_admin') = 'true');

drop policy if exists "Anyone can view birthday wishes" on public.birthday_wishes;
create policy "Anyone can view birthday wishes"
  on public.birthday_wishes for select to anon, authenticated using (true);

drop policy if exists "Anyone can share a birthday wish" on public.birthday_wishes;
create policy "Anyone can share a birthday wish"
  on public.birthday_wishes for insert to anon, authenticated with check (
    char_length(trim(display_name)) between 1 and 80
    and char_length(trim(wish)) between 1 and 500
  );
