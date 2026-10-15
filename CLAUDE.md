# Project rules for Claude Code

Project: GS HUB Copy Evaluation Management System. Full spec: `docs/SPEC.md`. Phase plan: `docs/BUILD_PROMPT.md`. Design/data decisions: `docs/ARCHITECTURE.md`.

## Non-negotiables
- Real backend only. No hardcoded stats, no local-state fakes. Every dashboard number comes from the database.
- Authorize on the server (`requireRole`) before every server action. `supabaseAdmin()` (service role) is server-only; never import it in client components.
- Student files live in private buckets and are served only through short-lived signed URLs after an authorization check.
- Originals are immutable. The evaluated PDF is a separate artifact (`evaluations.final_pdf_path`, bucket `evaluated`).
- Students may read an evaluation only when `status = 'published'`. Keep that rule in RLS and in server code.
- Annotation coordinates are normalized 0..1 per page. Never store screen pixels only.
- Autosave uses `evaluations.version` for optimistic locking. A stale save must fail visibly, never overwrite.
- Imports are idempotent: unique lower(email), unique (batch_id, student_id), `ON CONFLICT DO NOTHING`, one transaction per chunk.
- Never mark an email or notification as sent/delivered unless the provider confirmed it.
- Pending workload = active assignments with status assigned/in_progress. Unassigned copies are counted separately. A reassignment deactivates the old assignment (`is_active=false`, status `reassigned`) in the same transaction as the new one.

## Workflow
- Work phase by phase. Finish and test a phase before starting the next. Add migrations as new numbered files; do not edit applied ones.
- Write tests for RLS (student cannot read another student or an unpublished evaluation) and for import idempotency.
- Brand: maroon (`maroon-*`), cream, white, gold accents (Tailwind tokens in `tailwind.config.ts`). Do not invent a logo. Footer text lives in `src/components/Footer.tsx`.
- Say clearly what is incomplete or needs external configuration (email domain, Supabase project, WhatsApp API).
