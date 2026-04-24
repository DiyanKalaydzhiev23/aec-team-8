When helping with pull request review or summarization in this repository, optimize for a senior engineer who needs to understand the change in under two minutes.

Always produce a concise, structured summary in the following shape:

## Summary
- One or two sentences describing the purpose of the change and the mechanism used.

## What Changed
- The key code-path changes.
- Any query, schema, interface, or contract changes.
- Relevant test additions or omissions.

## Key Risks
- Non-obvious correctness, scaling, invalidation, performance, security, or operability risks.
- Call out missing safeguards or production-readiness concerns.

## Review Focus
- 3 to 5 concrete questions or areas a reviewer should inspect first.

Keep the response between 200 and 300 words. Prioritize correctness, risk, and reviewability over style commentary. Avoid repeating the pull request description unless it adds useful context.
