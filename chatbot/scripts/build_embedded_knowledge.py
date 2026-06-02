#!/usr/bin/env python3
"""Build chatbot/agents/embedded_knowledge.md from chatbot/knowledge-base/**/*.md.

Run after editing knowledge-base source files, then redeploy AgentCore:

    python chatbot/scripts/build_embedded_knowledge.py
    cd chatbot && agentcore deploy
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KB_DIR = ROOT / "knowledge-base"
OUT = ROOT / "agents" / "embedded_knowledge.md"


def main() -> None:
    if not KB_DIR.is_dir():
        raise SystemExit(f"Knowledge base not found: {KB_DIR}")

    parts: list[str] = [
        "# DECISION LAYER ANALYTICS — EMBEDDED KNOWLEDGE",
        "",
        "Source: chatbot/knowledge-base/ (rebuild with scripts/build_embedded_knowledge.py)",
        "",
    ]

    md_files = sorted(KB_DIR.rglob("*.md"))
    for path in md_files:
        rel = path.relative_to(KB_DIR)
        parts.append(f"\n\n---\n\n## SOURCE: {rel}\n\n")
        parts.append(path.read_text(encoding="utf-8").strip())
        parts.append("")

    OUT.write_text("\n".join(parts).strip() + "\n", encoding="utf-8")
    print(f"Wrote {OUT} ({len(md_files)} files, ~{OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
