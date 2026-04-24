# Final Prompt Used

Summarise the following pull request for a senior engineer reviewing the change. Keep it between 200 and 300 words and structure it with these sections only: `Summary`, `What Changed`, `Key Risks`, and `Review Focus`.

Write for someone who needs to understand the change in under two minutes. Focus on:

- what changed in the implementation
- non-obvious correctness and production risks
- missing test coverage or operational concerns
- where the reviewer should spend their time first

Do not restate the PR description mechanically. Prioritise substantive risks over minor style comments. If there are reviewer comments, use them only to sharpen the risk analysis.

Input:
- PR title and description
- diff
- tests
- reviewer comments

# Final Summary

## Summary
- Adds a controller-level in-memory cache for `/api/user/profile` to reduce repeat database reads. Cache entries are keyed by `userId`, stored in a process-local `Map`, and treated as fresh for 5 minutes.

## What Changed
- `userController.ts` now checks the cache before calling `getUserById`, returns cached data when the TTL has not expired, deletes stale entries, and stores fresh responses after a DB read.
- `userService.ts` narrows the SQL projection from `SELECT *` to `SELECT id, name, email, updated_at`, reducing overfetching and making the response shape more explicit.
- Tests now cover the cache-hit path by calling the endpoint twice and asserting the service is only invoked once. Coverage still focuses on the happy path.

## Key Risks
- No invalidation strategy exists, so profile updates can serve stale data for up to 5 minutes even though `updated_at` is fetched.
- The cache is instance-local, so behavior diverges across nodes in a multi-instance deployment and DB load reduction will be inconsistent.
- The cache is unbounded, which creates a memory growth risk for high-cardinality traffic.
- The test suite does not verify TTL expiry, stale entry eviction, error-path behavior, or null-user handling.

## Review Focus
- Is process-local caching acceptable for this endpoint in the intended deployment model?
- What should invalidate or refresh cached user profiles before TTL expiry?
- Should the cache have size limits or abstraction around eviction and observability?
- Are the missing expiry and stale-data tests acceptable for this first pass?
