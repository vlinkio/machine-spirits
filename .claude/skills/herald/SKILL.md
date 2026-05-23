---
name: herald
description: Checks git commits since the last run and crafts a social media post summarizing progress. Runs daily on a schedule or on demand via /herald.
commands:
  - /herald
schedule: daily
---

# Herald

Herald inspects recent git activity and distills it into a polished social media post that reflects the project's momentum.

## Context & Tone

- Read `.claude/skills/context.md` for company identity, product focus, audience, and voice guidelines.
- Read `.claude/skills/tones.md` for available tone styles (Deep Dive, Quickie, Humorous). Select the tone that best fits the commits — lightweight chores call for Quickie; milestone features call for Deep Dive; a string of small wins can earn Humorous.

## State Tracking

Herald persists its last-run timestamp at `.claude/skills/herald/.last_run` (ISO-8601, UTC).

- On first run (no `.last_run` file): scope to commits from the past 24 hours.
- On subsequent runs: scope to commits after the timestamp in `.last_run`.
- After generating the post, overwrite `.last_run` with the current UTC timestamp.

`.last_run` must be added to `.gitignore` — it is runtime state, not source.

## Execution Steps

1. **Read state** — read `.claude/skills/herald/.last_run`. If the file exists, use its ISO-8601 UTC timestamp as the cutoff. If it does not exist, this is a first run — scope to the past 24 hours.
2. **Collect commits** — run:
   ```
   git log --since="<last_run_timestamp>" --pretty=format:"%h %s" --no-merges
   ```
3. **Skip if empty** — if there are no commits, output: "No new commits since last run. Nothing to herald today." and update `.last_run`.
4. **Read context** — load `.claude/skills/context.md` for brand framing.
5. **Select tone** — choose from `.claude/skills/tones.md` based on the nature and volume of commits.
6. **Draft post** — write a social media post that:
   - Opens with a hook relevant to the work done.
   - Highlights 1–3 meaningful changes without exposing internal implementation details or proprietary information.
   - Frames progress in terms of user or market value (not technical jargon).
   - Closes with a forward-looking line or call to engagement.
   - Stays platform-agnostic (suitable for LinkedIn, X, or Bluesky).
   - Includes 2–4 relevant hashtags.
7. **Output the post** — save the draft to `social_media/progress_updates/` under the name `update_<YYYY-MM-DD_HH-MM>.md` (e.g. `update_2026-05-23_14-30.md`). Using hour and minute in the filename prevents collisions on multiple runs in the same day.

## Scheduling

To activate the daily schedule, run:

```
/schedule herald daily
```

This registers Herald as a recurring routine that fires once per day.

## Constraints

- Never include confidential company data, internal metrics, or unreleased feature names in the post.
- Never commit `.last_run` — it must remain in `.gitignore`.
- Do not expose raw commit messages verbatim; always reframe them in audience-friendly language.
- Company context lives only in `.claude/skills/context.md` — never hard-code it here.
