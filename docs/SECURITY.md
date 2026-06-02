# Security — secrets and git

## Before every push

```bash
./scripts/check-secrets.sh
```

This scans **git-tracked files only** for common token patterns (GitHub PAT, AWS keys, private keys, etc.).

## Never commit

| Item | Use instead |
|------|-------------|
| `.env`, `.env.local` | `.env.example` with placeholder names only |
| AWS access keys | IAM roles, `AWS_PROFILE`, OIDC in CI |
| Bedrock / API keys | Secrets Manager, env vars at deploy time |
| `chatbot/venv/` | Listed in `.gitignore` |
| `**/node_modules/`, `cdk.out/` | Listed in `.gitignore` |
| MCP tokens | `~/.cursor/mcp.json` with `${env:VAR}` — set vars in shell, not in JSON |

## Cursor MCP credentials

Store tokens in your shell profile (`~/.zshrc`), not in `mcp.json`:

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_..."   # fine-grained PAT, repo scope only
export LINKEDIN_COOKIE="li_at=..."            # optional
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/service-account.json"
```

If a token was ever pasted into `mcp.json` or chat, **rotate it** in GitHub / LinkedIn settings.

## CDK / portfolio-aws-demos

`PortfolioDemosStack` creates a Secrets Manager secret with **placeholder JSON** (model id only). After deploy, set the real value via CLI — never put API keys in git.

## What is safe in git

- AWS account IDs and IAM role ARNs (infrastructure metadata)
- Public email `leducse@gmail.com` (contact info on the site)
- Bedrock **model IDs** (not secrets)
- Synthetic / demo data in portfolio MVPs
