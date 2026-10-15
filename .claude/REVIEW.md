# Pre-commit review checklist

Run these inside Claude Code before every commit (AGENTS.md: commit only, never push).

1. On every change, run the `pr-review-toolkit:pr-test-analyzer` and
   `pr-review-toolkit:silent-failure-hunter` agents. Fix valid findings.
2. Run the `adversarial-review` project skill (`.claude/skills/adversarial-review/SKILL.md`).
3. `npm run check`, `npm run test`, and `npm run ratchet` must pass.

Silent fallbacks are bugs here (AGENTS.md): every fallback must log to the server and show to the user.
