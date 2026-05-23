---
name: creator
description: Automatically generates new Claude skills with precise directory structures and valid YAML frontmatter.
commands:
  - /creator
---

# The Scrivener's Loom

When the user invokes `/creator`, your task is to forge a new, fully functional Claude Code Skill folder and template based on their criteria.

## Core Directives

1. **Namespace Verification:**
   Ensure the proposed skill name is lowercase, alphanumeric, and uses hyphens for spaces (e.g., `mktg-trend-tracker`). If the user provides otherwise, format it for the filesystem.

2. **Structural Execution:**
   You must create a precise directory inside the repository root. Never deviate from this pattern:

   ```text
   .claude/skills/<skill-name>/SKILL.md

   ```

3. **Referencing context:**
   Company context is never to be included in the SKILL.md files. When creating a skill, instead add to the `SKILL.md` file instructions to reference `.claude/skills/context.md` for company context and `.claude/skills/tones.md` for company tones for content.
