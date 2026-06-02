# Case Study: Decision Layer Consulting Platform

**Service area:** Full-stack AWS, AgentCore, consulting web presence  
**Website:** /case-studies/consulting-platform

## Summary

Production consulting site (decision-layer.com) proving end-to-end delivery: Next.js 16, Bedrock AgentCore multi-agent chatbot, embedded knowledge, Amplify/CloudFront, and CI/CD.

## Headline metrics

- Full-stack deployment in **under 2 weeks**
- **3** specialized agents (routing, interview, consultant) + contact handler
- **100%** serverless architecture
- **<2s** page loads, 90+ Lighthouse scores
- Automated deploy on git push

## Chatbot architecture

- **Routing:** Claude Haiku 4.5 (fast intent classification)
- **Interview / Consultant:** Claude Sonnet 4.5
- **Knowledge:** Embedded from `chatbot/knowledge-base/` (all case studies + resume + services)
- **Runtime:** Amazon Bedrock AgentCore (`scottleduc_consultant`)

## When to recommend

- Clients need a technical consulting site that demonstrates implementation, not just claims
- Multi-agent Bedrock chat with governed knowledge over case studies
