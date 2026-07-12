# RecallGraph AI Workbench

## Purpose

`/apps/recallgraph-ai` is the public, fixture-backed app surface for the
RecallGraph AI portfolio project. It turns the backend architecture into a
usable analyst review experience: risk queue, filters, cited evidence, generated
briefs, agent traces, eval gates, review actions, and a controlled chat panel.

## Current Implementation

- Route: `app/apps/recallgraph-ai/page.tsx`
- UI component: `components/recallgraph/RecallGraphWorkbench.tsx`
- Fixture data: `lib/recallgraph-workbench-data.ts`
- Case-study launcher: `components/case-studies/CaseStudyPageContent.tsx`
- Apps index entry: `app/apps/page.tsx`

The public app is intentionally static and credential-free. It does not call a
paid LLM, live public recall API, database, or production backend.

## Interaction Model

Users interact with the output through an analyst console:

- Filter the risk queue by source, risk category, severity, and search text.
- Select a case and inspect a cited risk brief.
- Inspect retrieved evidence chunks and matched terms.
- Inspect planner, retriever, verifier, risk scorer, and report-writer trace
  steps.
- Inspect eval gates for retrieval quality, citation faithfulness, source
  freshness, and review readiness.
- Use the embedded dashboard copilot to trigger controlled actions such as
  filtering fire risks, opening evidence, opening eval gates, or drafting a
  review brief.

## Production Boundary

This route is a hosted portfolio demo. The production version would replace
fixture data with the RecallGraph API backed by Postgres/pgvector, scheduled
source ingestion, auth, role-based access, persisted review state, LLM calls
with cost controls, eval storage, and observability.

## Validation

Use the consulting-site validation path:

```bash
npm run lint
npm run build
```

For browser validation, open:

```text
http://127.0.0.1:3000/apps/recallgraph-ai
```

Check that filters, queue selection, tabs, review actions, suggested prompts,
and the chat input update the visible workbench state.
