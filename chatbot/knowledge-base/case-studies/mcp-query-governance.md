# Case Study: MCP Query Governance Platform

**Service area:** GenAI governance, data security, MCP/agent access  
**Portfolio MVP:** Runs locally (SQLite + IsolationForest); AWS path documented

## Summary

Two-part design: **Sentinel** detects abusive programmatic query patterns with ML (SageMaker RCF–swappable) plus hard caps; **Governed MCP** routes agents through a catalog with validation, RLS, and audit logs.

## Headline metrics

- **2/2** injected abusers detected
- **0** false positives on baseline principals
- ML-only catch for abuser under hard cap (demonstrates value beyond static rules)

## When to recommend

- Teams deploying MCP or API database access for agents
- Need notify-first governance before auto-throttle
- AWS production path: RDS, Lambda, SageMaker RCF, EventBridge, API Gateway

## Website

/case-studies/mcp-query-governance
