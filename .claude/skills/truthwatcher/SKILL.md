---
name: truthwatcher
description: Searches online for the latest AI research, blog posts, and social media activity from top AI trendsetters. Outputs a dated trends report to the trends/ folder.
commands:
  - /truthwatcher
---

# Truthwatcher

When the user invokes `/truthwatcher`, scan the web for the most recent and significant AI developments and produce a structured trend report.

## Execution Steps

1. **Load sources** from `.claude/skills/truthwatcher/sources.md`. This is the authoritative list of people, organizations, blogs, newsletters, and communities to monitor.

2. **Load company context** from `.claude/skills/context.md` to understand what angles are most relevant (agentic AI, AI strategy, organizational transformation, change management).

3. **Web search** across the source categories. For each category run targeted searches:
   - Thought leaders: recent posts, threads, essays in the last 7 days
   - Labs: announcements, model releases, technical blog posts
   - Research: notable papers published this week (prioritize those with high engagement on social or coverage in newsletters)
   - Newsletters/blogs: top stories from the current week
   - Communities: highly upvoted or widely shared threads
   
   Suggested search queries to use (adapt date range to today's date):
   - `site:openai.com/blog OR site:anthropic.com/news OR site:deepmind.google after:7days`
   - `"agentic AI" OR "AI agents" latest news`
   - `from:karpathy OR from:ylecun OR from:sama site:x.com last week`
   - `AI strategy transformation 2025 site:linkedin.com`
   - `arxiv cs.AI notable papers this week`

4. **Curate and prioritize.** Select the 10–20 most impactful items. Prioritize:
   - Model releases or capability breakthroughs
   - Shifts in AI strategy or enterprise adoption
   - Agentic AI developments
   - Organizational or regulatory change
   - Anything that affects AI advisory/consultancy positioning

5. **Write the report** to `social_media/trends/trends_<YYYY-MM-DD_HH-MM>.md` using the current date and time (e.g. `trends_2026-05-23_14-30.md`). Using hour and minute in the filename prevents collisions on multiple runs in the same day.

6. **Confirm** to the user that the file was written and surface the top 3 headlines as a quick summary.

## Output Format

```markdown
# AI Trends — <YYYY-MM-DD HH:MM>

## Top Highlights
> 2–3 sentence executive summary of the week's most important signal.

---

## Research & Papers
- **[Title](url)** — one-line summary of why it matters — <url>

## Lab & Product Announcements
- **[Title](url)** — one-line summary — <url>

## Thought Leader Takes
- **[@handle](url)** — quote or paraphrase the key point — <url>

## Enterprise & Strategy
- **[Title](url)** — one-line summary relevant to AI advisory — <url>

## To Watch
- Emerging signal description — <url>

---
*Sources: `.claude/skills/truthwatcher/sources.md`*
```

## Notes

- Do not embed any company-specific information in this skill file. Reference `.claude/skills/context.md` only at runtime.
- The `social_media/trends/` folder is inside `social_media/`. Create it if it doesn't exist.
- If web search results are sparse for a source, note it as "no recent activity" rather than skipping silently.
- Tone of the report should be professional and scannable — bullet points, concise summaries, direct links.
- Every trend item without exception must end with the raw source URL in `<url>` angle brackets so it is visible even in plain-text rendering.
