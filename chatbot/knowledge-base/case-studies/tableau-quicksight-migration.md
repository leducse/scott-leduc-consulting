# Case Study: Tableau → QuickSight Migration Assistant

**Service area:** BI migration, Amazon QuickSight, Amazon Q  
**Portfolio MVP:** Dry-run default; guarded Bedrock + deploy-dev path

## Summary

Maps Tableau metadata to QuickSight datasets, calculations, visuals, and Q topics; packages reviewable artifacts; runs five validation types including 1% metric parity on high-confidence calcs; blocks deploy on FAIL.

## Headline metrics

- **deploy_allowed: true** on demo migration package
- **5** validation dimensions (structural, datasource, calculation, parity, visual)
- Explicit documentation of non-auto-migrated features (LOD, table calcs)

## When to recommend

- Tableau → QuickSight programs needing guardrails, not big-bang cutover
- Teams want ordered API deploy plans before touching production
- Metric parity requirements for executive KPIs

## Website

/case-studies/tableau-quicksight-migration
