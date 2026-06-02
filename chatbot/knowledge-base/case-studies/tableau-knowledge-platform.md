# Case Study: Tableau Workbook Knowledge Platform

**Service area:** GenAI readiness, BI documentation, governed retrieval  
**Portfolio MVP:** Local mock Bedrock; real Bedrock via CDK + Secrets Manager

## Summary

Parses Tableau TWB workbooks into metadata, generates field-trusted markdown via two-pass Bedrock (draft + metadata-grounded refine), validates with rule-based checks, stores versioned docs, and exposes MCP-style search/get tools.

## Headline metrics

- **4/4** validation checks passed on demo workbook
- Two-pass generation reduces hallucinated field names
- CDK deploy: API Gateway → Lambda → Bedrock Converse → S3

## When to recommend

- Tableau estates with tribal knowledge / undocumented calcs
- GenAI over BI requires grounded documentation first
- Pair with QuickSight migration assistant for full Tableau exit path

## Website

/case-studies/tableau-knowledge-platform
