# Case Study: BI Regression Guardrails

**Service area:** Data engineering, CI/CD, BI reliability  
**Website:** /case-studies/bi-regression-guardrails

## Summary

CI/CD-integrated guardrails that map dbt/SQL/ETL changes to downstream dashboards and metrics, run regression tests on PRs, and block risky merges—with Bedrock summaries for non-technical stakeholders.

## Headline metrics

- **45+** regressions prevented before production
- **200+** dashboards protected by automated tests
- **100%** of flagged risky PRs caught pre-merge
- **<5 min** change-impact analysis per PR

## How it works

1. Build dependency graph: PR → model → table → metric → dashboard tile
2. Impact analysis with risk scores by dashboard importance
3. Numerical diff tests + structural dashboard checks
4. GitHub Actions / GitLab CI / CodeBuild integration
5. Bedrock-generated change summaries for executives

## When to recommend

- Pipeline changes keep breaking executive KPIs
- Teams need impact analysis before merging data PRs
