# Teacher Raksa's Birthday

A responsive birthday invitation, shared birthday wish book, last year's photo gallery, and an administrator page at `/admin`.

## Local development

1. Install Node.js 20.19+ or 22.12+.
2. Run `npm install` and `npm run dev`.
3. Open the local URL printed by Vite. The invitation layout can be viewed before the online backend is connected.

Without Supabase settings, the shared wish form is intentionally disabled and `/admin` explains the setup needed; it does not pretend that a local-only wish was saved.

## Enable the shared wish book

1. Create a Supabase project and copy its project URL and publishable key into a local `.env` file using `.env.example` as the template.
2. Run `supabase/schema.sql` in the Supabase SQL Editor. The script creates the event details, legacy guest registration, and birthday wish tables with their row-level access policies. It is safe to run again after schema changes.
3. Run `npm install` and `npm run dev` to open the invitation locally.
4. To share it with other devices, deploy the site to a static host and add the same two `VITE_SUPABASE_*` variables to the host before building. Configure SPA fallback so `/admin` serves `index.html`.

Admin access is optional for the public wish book. To use `/admin`, create an administrator in Supabase Authentication and set `is_admin` to boolean `true` in that user's **app metadata**. Do not put this flag in user-editable metadata.

The Supabase publishable key is intended to be public. Database row-level security lets every visitor read and submit birthday wishes. Each wish's display name and text are public. Legacy RSVP contact details remain limited to authenticated administrators. Never place a Supabase secret key in the browser or in `.env` variables prefixed with `VITE_`.

The public wish book asks only for a display name and a birthday wish. The attached photos are stored under `public/memories/`.
