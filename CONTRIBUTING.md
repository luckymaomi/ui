# Contributing

## Before You Start

- Read `AGENTS.md` and `spec.md`. Read `plan.md` when the owner explicitly enables professional mode.
- Target `master` unless the owner names another branch.
- Keep secrets, private data, local output, and unrelated changes outside the repository.
- Treat `src/content`, `src/components`, `src/pages`, and `public` as directly owned product source.

## Changes

- Keep each change focused on one current objective.
- Update implementation, tests, documentation, and configuration together.
- Keep one owner for each content item and runtime implementation.
- Preserve complete interactive pages and verify their real browser path.

## Verification

Run the complete verification command before delivery:

```powershell
npm.cmd run verify
```

Report the commands run, passed results, unverified items, and remaining risk.

## Security

Report vulnerabilities through the private channel described in `SECURITY.md`.
