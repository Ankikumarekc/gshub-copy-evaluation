# GS HUB Copy Evaluation Management System

Answer-copy evaluation platform for GS HUB Civil Services Classes (Next.js + TypeScript + Tailwind + Supabase).

**Status: Phase 1 (foundation) is in this folder.** Later phases are specified in `docs/BUILD_PROMPT.md`.

## What works now
- Full PostgreSQL schema (20 tables, indexes, status enums, reporting views): `supabase/migrations/0001_schema.sql`
- Row-level security for all four roles; students only see *published* evaluations: `0002_rls.sql`
- Login, forgot password, invitation/activation flow, sign out
- Server-side role guard (`requireRole`) and role dashboards (Admin/Owner, Evaluator, Student) reading live DB numbers
- Private storage buckets (`submissions`, `evaluated`), no public access

## What is NOT built yet
Batch/student CRUD, bulk import, tests, uploads, assignment, the PDF annotation editor, evaluated-PDF generation,
publishing, reports, notifications, audit-log writes, email sending. See the phase plan in `docs/BUILD_PROMPT.md`.
Nothing here pretends to be finished: the dashboards show zeros until real data exists.

## Setup
1. Create a Supabase project. Copy URL, anon key and service-role key.
2. `cp .env.example .env.local` and fill the values. Never expose the service-role key in client code.
3. Run `supabase/migrations/0001_schema.sql`, then `0002_rls.sql` (SQL editor or `supabase db push`).
4. Create the first user in Supabase Auth, then run `supabase/seed.sql` (edit the email).
5. In Supabase Auth settings add redirect URLs: `http://localhost:3000/auth/callback` and your production URL + `/auth/callback`.
6. `npm install && npm run dev` then open http://localhost:3000

## Deploy (Vercel)
Import the repo, add the same environment variables, set the Supabase redirect URL to your production domain
(for example `https://evaluation.gshubsite.com/auth/callback`), deploy.

## Licenses of main libraries
Next.js (MIT), React (MIT), Tailwind CSS (MIT), Supabase JS (MIT), pdf-lib (MIT), pdf.js (Apache-2.0), exceljs (MIT), papaparse (MIT), zod (MIT).
