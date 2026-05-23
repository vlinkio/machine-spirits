## Project Goals

This project's goal is to support entrepreneurship by providing AI agents that can help with current trends, sales outreaches, networking, social media presence, building a brand, etc. This project should also be self-improving, staying up to date on the evolving context (company internal and the market).

## Critical Restrictions for Company Information

Company information is never to be committed. Any files with company information must be added to .gitignore. All functionalities must be kept separate from company context and should only reference the context files such as `.claude/skills/context.md`.

## AI Capabilities & Automation

This repository uses custom Claude Code extensions. Refer to these files for execution details:

- **Skills:** Located in `.claude/skills/`. Company context is never to be included in the SKILL.md files but rather the SKILL.md files should reference `.claude/skills/context.md`.
- **Hooks:** Pre-commit linting and security hooks are defined in `.claude/settings.json`.
- **System Architecture:** See `docs/AI_AGENTS.md` for full agent workflows and system prompts.

## Language Instructions

Never use a dash in sentences because it immediately reveals you are an AI. Also avoid other tells of AI-written text.
