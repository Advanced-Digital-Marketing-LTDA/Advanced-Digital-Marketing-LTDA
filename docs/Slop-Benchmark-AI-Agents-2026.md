---
title: "The Slop Benchmark: Comparing 24 AI Agent Repositories"
meta_title: "Slop Benchmark: 24 AI Agent Repositories Compared"
meta_description: "A backlog and activity comparison of 24 AI agent repositories, with a chart and reviews of their most-discussed open issues."
published: "2026-10-27"
updated: "2026-10-30"
---

A project can have millions of stars and still make you spend your afternoon debugging it. The Slop Benchmark is a blunt way to compare one visible backlog and activity signal: how public issue and pull request backlogs relate to releases and merged work. It is not a code-quality score, a security audit, or a prediction that a project will fail. It is a quick pressure gauge—then we read the most-discussed open issues to see what that pressure actually looks like.

## What the ratio can and cannot say

The score snapshot was collected October 30, 2026, 17:27:15–17:29:31 UTC. The issue discussions were reviewed on October 27, 2026; their status may have changed since then. Open issues exclude pull requests. Published GitHub release records include prereleases and exclude drafts. Open PRs include drafts; PRs closed without merging are recorded separately and do not enter the denominator.

> **A = open issues ÷ published releases**
>
> **B = (open issues + open PRs) ÷ lifetime merged PRs**
>
> **C = (A + B) ÷ 2 when there are releases; otherwise C = B. Slop Log Score = log10(1 + C)**

When releases are absent, C is B. When merged PRs are zero, B and the Slop Log Score are N/A even if A exists. N/A is not zero. Calculations use unrounded ratios; A, B and C are displayed to two decimals and the Slop Log Score to four. Lower scores indicate less public backlog relative to these activity denominators, not proof of software quality or reliability. Release cadence, project age, issue type and contributor practices affect the result. Stars are not a score input.

For the qualitative check, I reviewed each project's three most-commented open issue threads updated since April 27, 2026, as of October 27. These are not necessarily the most-commented issues of all time. Comments are not independent affected users, and the examples are not a complete audit. An issue can be a bug report, a question, a feature request, or a tracker.

## The comparison table

Higher values indicate more backlog relative to the activity measures in this snapshot. Stars were recorded October 27. Follow the repository links to inspect project status.

| Project | GitHub stars (Oct 27) | Open issues | Open PRs | Merged PRs | Closed unmerged | Releases | A | B | C | Slop Log Score |
|:--|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | 257,719 | 17,785 | 34,297 | 19,872 | 54,069 | 44 | 404.20 | 2.62 | 203.41 | 2.3105 |
| [Paperclip](https://github.com/paperclipai/paperclip) | 107,968 | 3,476 | 3,180 | 4,118 | 6,256 | 30 | 115.87 | 1.62 | 58.74 | 1.7763 |
| [Happy](https://github.com/slopus/happy) | 24,354 | 669 | 420 | 163 | 229 | 16 | 41.81 | 6.68 | 24.25 | 1.4022 |
| [Cindy](https://github.com/makecindy/cindy) | 7,392 | 1,882 | 440 | 3,686 | 397 | 77 | 24.44 | 0.63 | 12.54 | 1.1315 |
| [NanoClaw](https://github.com/nanocoai/nanoclaw) | 31,035 | 293 | 739 | 878 | 1,615 | 13 | 22.54 | 1.18 | 11.86 | 1.1091 |
| [OpenClaw](https://github.com/openclaw/openclaw) | 393,209 | 5,033 | 2,866 | 65,847 | 55,081 | 277 | 18.17 | 0.12 | 9.14 | 1.0062 |
| [Flowise](https://github.com/FlowiseAI/Flowise) (archived) | 55,531 | 701 | 340 | 1,820 | 612 | 85 | 8.25 | 0.57 | 4.41 | 0.7332 |
| [AutoGen](https://github.com/microsoft/autogen) | 61,589 | 562 | 560 | 2,537 | 821 | 98 | 5.73 | 0.44 | 3.09 | 0.6116 |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | 14,342 | 617 | 224 | 3,973 | 1,313 | 129 | 4.78 | 0.21 | 2.50 | 0.5437 |
| [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw) | 33,051 | 671 | 415 | 5,065 | 2,455 | 155 | 4.33 | 0.21 | 2.27 | 0.5148 |
| [OpenHands](https://github.com/OpenHands/OpenHands) | 92,015 | 579 | 574 | 8,275 | 3,841 | 156 | 3.71 | 0.14 | 1.93 | 0.4662 |
| [Pydantic AI](https://github.com/pydantic/pydantic-ai) | 20,906 | 1,168 | 482 | 4,716 | 2,009 | 351 | 3.33 | 0.35 | 1.84 | 0.4531 |
| [Mastra](https://github.com/mastra-ai/mastra) | 29,128 | 383 | 277 | 16,580 | 4,247 | 131 | 2.92 | 0.04 | 1.48 | 0.3948 |
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 187,788 | 356 | 381 | 6,107 | 4,052 | 127 | 2.80 | 0.12 | 1.46 | 0.3913 |
| [Dify](https://github.com/langgenius/dify) | 159,723 | 482 | 661 | 15,585 | 4,022 | 171 | 2.82 | 0.07 | 1.45 | 0.3885 |
| [Google ADK](https://github.com/google/adk-python) | 22,024 | 189 | 219 | 673 | 2,532 | 91 | 2.08 | 0.61 | 1.34 | 0.3695 |
| [Goose](https://github.com/aaif-goose/goose) | 55,827 | 363 | 169 | 6,413 | 2,542 | 158 | 2.30 | 0.08 | 1.19 | 0.3405 |
| [CrewAI](https://github.com/crewAIInc/crewAI) | 60,180 | 389 | 545 | 2,472 | 2,592 | 247 | 1.57 | 0.38 | 0.98 | 0.2959 |
| [Agent Zero](https://github.com/agent0ai/agent-zero) | 19,585 | 60 | 84 | 314 | 577 | 76 | 0.79 | 0.46 | 0.62 | 0.2106 |
| [Langflow](https://github.com/langflow-ai/langflow) | 156,070 | 209 | 1,049 | 7,976 | 2,628 | 316 | 0.66 | 0.16 | 0.41 | 0.1491 |
| [LangGraph](https://github.com/langchain-ai/langgraph) | 43,998 | 367 | 150 | 4,114 | 1,879 | 590 | 0.62 | 0.13 | 0.37 | 0.1379 |
| [Letta Code](https://github.com/letta-ai/letta-code) | 3,719 | 193 | 120 | 3,703 | 877 | 360 | 0.54 | 0.08 | 0.31 | 0.1174 |
| [n8n](https://github.com/n8n-io/n8n) | 208,798 | 331 | 860 | 24,305 | 6,464 | 877 | 0.38 | 0.05 | 0.21 | 0.0839 |
| [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | 30,336 | 15 | 4 | 2,131 | 1,530 | 124 | 0.12 | 0.01 | 0.06 | 0.0273 |

## The ratio graphic

The chart shows the same October 30 Slop Log Scores as the table. The table is the exact lookup, while the bars make the spread easier to see. On a narrow screen, the chart is arranged vertically for easier reading. You can also [open the full-size chart](/images/blog/slop-benchmark.svg).

![Slop Log Scores for 24 AI agent repositories, October 30, 2026](/images/blog/slop-benchmark.svg)

## Stars vs. slop

Stars measure hype, and the Slop Log Score measures backlog pressure. Plotting them together shows which projects are popular and still keep their backlog under control. The dotted Pareto line connects the repositories that no other repository beats on both counts. The green area marks above-median stars with below-median slop, and the amber area marks above-average stars with below-average slop; where they overlap, a repository clears both. Stars run up the vertical axis on a log scale (stars + 1), and stars remain context rather than a score input.

![Stars against Slop Log Score for 24 AI agent repositories, with a dotted Pareto line, October 30, 2026](/images/blog/slop-pareto.svg)

## Project-by-project issue review

The issue discussions below were reviewed October 27. They are a screening sample, not a verdict on maintainers or users; issue status and comments can change.

<a id="hermes-agent-395-09-issues-per-release"></a>

<a id="hermes-agent-2-3105-log-score"></a>

## Hermes Agent: 2.3105 Slop Log Score

Top-commented open threads in the last six months: [Refactor the godfile: split the 2,000-task tool catalog into maintainable modules (#78647, 82 comments)](https://github.com/NousResearch/hermes-agent/issues/78647); [Desktop app sends the same assistant reply twice (#127665, 58 comments)](https://github.com/NousResearch/hermes-agent/issues/127665); [Opening a pull request fails with a permissions error (#131859, 53 comments)](https://github.com/NousResearch/hermes-agent/issues/131859).

Its most-discussed sampled thread concerns splitting a sprawling “godfile,” which signals maintenance burden rather than a single runtime failure. More concrete reports describe duplicate desktop replies and permission errors when opening pull requests. Those affect the assistant’s ability to communicate and finish work. Active refactoring is encouraging, but popularity does not resolve these defects. Test desktop sessions and PR creation in a pinned release before relying on Hermes for unattended tasks.

<a id="paperclip-113-27-issues-per-release"></a>

<a id="paperclip-1-7763-log-score"></a>

## Paperclip: 1.7763 Slop Log Score

Top-commented open threads in the last six months: [Add support for Ollama as a model provider (#187, 34 comments)](https://github.com/paperclipai/paperclip/issues/187); [Reviewer handoff can be skipped and there is no retry (#13532, 26 comments)](https://github.com/paperclipai/paperclip/issues/13532); [Recovery hold can silently deadlock or duplicate watchdog work (#14600, 23 comments)](https://github.com/paperclipai/paperclip/issues/14600).

Its most-commented sampled issue requests Ollama support; that is a missing capability, not a broken feature. The next threads are more concerning: reviewer handoffs can be skipped without retry, and recovery holds can silently deadlock or duplicate watchdog work. Those problems strike directly at delegated task coordination. A coordinator that loses review gates or stalls silently creates extra supervision instead of saving it.

<a id="happy-41-50-issues-per-release"></a>

<a id="happy-1-4022-log-score"></a>

## Happy: 1.4022 Slop Log Score

Top-commented open threads in the last six months: [Codex sessions hang while waiting for messages (#358, 17 comments)](https://github.com/slopus/happy/issues/358); [Add OpenCode support (#265, 17 comments)](https://github.com/slopus/happy/issues/265); [Mobile and web cannot connect to a terminal session (#276, 15 comments)](https://github.com/slopus/happy/issues/276).

The sampled threads contain reports of failures: Codex sessions hanging while waiting for messages, and mobile or web clients failing to reconnect to terminal sessions. Both undermine its cross-device workflow. The OpenCode support thread is a feature request and should not count as evidence of breakage. Happy looks useful but unfinished rather than abandoned. Before adopting it, test long sessions, stalled-message recovery, and reconnection from every device you intend to use.

<a id="cindy-23-22-issues-per-release"></a>

<a id="cindy-1-1315-log-score"></a>

## Cindy: 1.1315 Slop Log Score

Top-commented open threads in the last six months: [Clarify Pi versus Claude/Codex resource scope and project/user context (#1991, 26 comments)](https://github.com/makecindy/cindy/issues/1991); [Windows app steals foreground focus (#500, 16 comments)](https://github.com/makecindy/cindy/issues/500); [Prove the Cindy bridge gate (#3771, 11 comments)](https://github.com/makecindy/cindy/issues/3771).

The leading sampled discussion concerns inconsistent resource scope across Pi, Claude, and Codex, including project versus user context. Comments report some completed work alongside incomplete extension hooks, suggesting active development with remaining integration debt. Other threads describe Windows focus stealing and seek verification of the bridge gate. These are different problems: desktop polish, provider semantics, and confidence in a boundary between components. Validate context scope, extension behavior, and desktop interruptions against your exact providers before treating it as dependable shared infrastructure.

<a id="nanoclaw-22-46-issues-per-release"></a>

<a id="nanoclaw-1-1091-log-score"></a>

## NanoClaw: 1.1091 Slop Log Score

Top-commented open threads in the last six months: [Website TLS certificate error (#1503, 19 comments)](https://github.com/nanocoai/nanoclaw/issues/1503); [Support custom OpenAI-compatible endpoints, including Codex and OpenCode (#1984, 6 comments)](https://github.com/nanocoai/nanoclaw/issues/1984); [Skill refresh breaks local model adapters (#3529, 5 comments)](https://github.com/nanocoai/nanoclaw/issues/3529).

Its most-commented sampled thread concerns a website TLS certificate error, which affects onboarding but does not establish a runtime defect. Another requests custom OpenAI-compatible endpoints; again, that is missing functionality. The more relevant reliability report says skill refresh breaks local model adapters. That can disrupt an otherwise working installation after an update. The sampled discussions offer mixed evidence, with limited core-defect discussion. Test adapter refreshes and provider compatibility, and retain a known-good version when upgrading deployments.

<a id="openclaw-18-02-issues-per-release"></a>

<a id="openclaw-1-0062-log-score"></a>

## OpenClaw: 1.0062 Slop Log Score

Top-commented open threads in the last six months: [Realtime voice work accumulates unbounded state (#116201, 59 comments)](https://github.com/openclaw/openclaw/issues/116201); [Gateway hangs for minutes when copying a large plugin (#160959, 57 comments)](https://github.com/openclaw/openclaw/issues/160959); [Web UI performance and stability tracking issue (#149361, 51 comments)](https://github.com/openclaw/openclaw/issues/149361).

The sampled issues describe consequential failures. A realtime voice report identifies growing state and oversized buffers. Another reports minutes-long Gateway stalls when copying a large plugin, including a reproduction involving an 878 MB extension. A Web UI umbrella issue tracks performance and stability concerns. These reports are meaningful operational warnings. Its release volume should not be confused with reliability. Stress-test long voice sessions, extension installation, and interface responsiveness before allowing unattended work on a persistent server.

<a id="flowise-8-25-issues-per-release"></a>

<a id="flowise-0-7332-log-score"></a>

## Flowise: 0.7332 Slop Log Score

Top-commented open threads in the last six months: [Add GraphRAG support (#2837, 31 comments)](https://github.com/FlowiseAI/Flowise/issues/2837); [Document loader page is blank (#5097, 24 comments)](https://github.com/FlowiseAI/Flowise/issues/5097); [Text splitter overlap behavior (#5173, 19 comments)](https://github.com/FlowiseAI/Flowise/issues/5173).

Flowise was archived on August 13, 2026. The sampled issues include GraphRAG support, a blank document-loader page, and text-splitter overlap behavior. GraphRAG is an enhancement request; the blank loader is a concrete usability failure. These should not receive identical weight. Existing pinned deployments may remain useful, but new adopters cannot assume ongoing upstream fixes. A maintained fork would need a separate assessment of its releases, backlog, and support activity.

<a id="autogen-5-73-issues-per-release"></a>

<a id="autogen-0-6116-log-score"></a>

## AutoGen: 0.6116 Slop Log Score

Top-commented open threads in the last six months: [Cryptographic action receipts for delegated work (#7353, 417 comments)](https://github.com/microsoft/autogen/issues/7353); [Add a GuardrailProvider extension point (#7405, 147 comments)](https://github.com/microsoft/autogen/issues/7405); [Introduce a mission keeper role (#7487, 74 comments)](https://github.com/microsoft/autogen/issues/7487).

Its highest-commented sampled threads propose cryptographic action receipts, a GuardrailProvider hook, and a mission-keeper role. These are governance and architecture proposals, not hundreds of independent failure reports. Their prominence shows demand for stronger oversight of delegated work. Microsoft has directed new projects toward Agent Framework, while AutoGen is community-maintained. However, new adopters should evaluate the current maintenance path and available governance controls rather than assuming the historical Microsoft association guarantees future support for their workloads.

<a id="microsoft-agent-framework-4-77-issues-per-release"></a>

<a id="microsoft-agent-framework-0-5437-log-score"></a>

## Microsoft Agent Framework: 0.5437 Slop Log Score

Top-commented open threads in the last six months: [Identity and trust boundaries at agent handoffs (#4842, 17 comments)](https://github.com/microsoft/agent-framework/issues/4842); [DevUI limitations (#2084, 16 comments)](https://github.com/microsoft/agent-framework/issues/2084); [Approval policy unexpectedly applies to every function (#3054, 14 comments)](https://github.com/microsoft/agent-framework/issues/3054).

Its sampled threads focus on identity and trust during handoffs, DevUI limitations, and an approval policy unexpectedly applying to every function. The first is a design concern; the approval behavior is more directly operational. Both matter when specialist agents inherit permissions or wait for human review. The evidence fits a developing framework with consequential semantics still under discussion. Prototype identity propagation, selective approvals, and debugging visibility before choosing it for delegated work that crosses users or permission boundaries.

<a id="zeroclaw-4-32-issues-per-release"></a>

<a id="zeroclaw-0-5148-log-score"></a>

## ZeroClaw: 0.5148 Slop Log Score

Top-commented open threads in the last six months: [Granular sandbox policy drifts from configured settings (#6996, 29 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/6996); [Work lanes and board automation RFC (#6808, 24 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/6808); [Provider wire-protocol RFC (#8396, 19 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8396).

Its most-discussed sampled issue concerns granular sandbox policy drifting from configured settings. Structured policy discussion and an approved vote are encouraging signs of engagement, but do not themselves prove a released fix. Other prominent threads are RFCs for work lanes and provider protocols, which represent planned capabilities rather than confirmed failures. Still, verify effective sandbox restrictions with negative tests before trusting configuration labels in consequential workflows.

<a id="openhands-3-67-issues-per-release"></a>

<a id="openhands-0-4662-log-score"></a>

## OpenHands: 0.4662 Slop Log Score

Top-commented open threads in the last six months: [Agent Canvas misdetects the port and fails to connect (#17546, 204 comments)](https://github.com/OpenHands/OpenHands/issues/17546); [Roadmap for feature parity (#9689, 29 comments)](https://github.com/OpenHands/OpenHands/issues/9689); [Analytics consent reappears after being dismissed (#16601, 19 comments)](https://github.com/OpenHands/OpenHands/issues/16601).

The biggest sampled thread describes Agent Canvas misdetecting a port and failing to connect. A linked fix and maintainer prioritization show engagement, although a proposed patch does not establish that every released configuration works. Other threads cover a feature-parity roadmap and analytics consent reappearing after dismissal. The roadmap is not a defect; consent persistence is a concrete UX concern. Test environment connectivity and preference persistence on your deployment, and check whether unresolved roadmap gaps affect the work you expect agents to perform.

<a id="pydantic-ai-3-19-issues-per-release"></a>

<a id="pydantic-ai-0-4531-log-score"></a>

## Pydantic AI: 0.4531 Slop Log Score

Top-commented open threads in the last six months: [Automated tracker for detection runs (#5955, 44 comments)](https://github.com/pydantic/pydantic-ai/issues/5955); [Human approval for multi-agent work (#3274, 43 comments)](https://github.com/pydantic/pydantic-ai/issues/3274); [Approval signal is a plain boolean without run binding (#5536, 35 comments)](https://github.com/pydantic/pydantic-ai/issues/5536).

Its highest-commented sampled thread is an automated detection-run tracker, so comment volume there is weak evidence of product failure. More significant discussions concern human approval for multi-agent work and an approval signal represented as a plain boolean without binding to a specific tool, run, nonce, or expiration. Those details determine whether consent can be reused outside its intended context. Developers should verify action-specific, expiring approval semantics before building consequential delegated workflows.

<a id="dify-2-96-issues-per-release"></a>

<a id="dify-0-3885-log-score"></a>

## Dify: 0.3885 Slop Log Score

Top-commented open threads in the last six months: [Parallel fail-fast leaves errors unattributed or stale (#39151, 61 comments)](https://github.com/langgenius/dify/issues/39151); [Rewrite-property behavior request (#40372, 57 comments)](https://github.com/langgenius/dify/issues/40372); [SQLite testing and refactor discussion (#32454, 37 comments)](https://github.com/langgenius/dify/issues/32454).

The strongest sampled reliability concern involves parallel fail-fast execution leaving errors unattributed or stale. A workflow that stops without clearly identifying the failed branch makes recovery harder and can prompt unnecessary reruns. Other prominent discussions concern rewrite behavior and SQLite testing or refactoring; these are product and engineering discussions rather than straightforward evidence of runtime failure. For adoption, deliberately fail parallel branches and inspect the resulting trace. Clear attribution and recoverable partial state matter more to your workflow than the raw issue total.

<a id="mastra-2-72-issues-per-release"></a>

<a id="mastra-0-3948-log-score"></a>

## Mastra: 0.3948 Slop Log Score

Top-commented open threads in the last six months: [Message branching support (#5093, 15 comments)](https://github.com/mastra-ai/mastra/issues/5093); [Custom tool suspend and resume UI/schema (#20603, 9 comments)](https://github.com/mastra-ai/mastra/issues/20603); [Cancel or stop an agent from Slack (#17065, 8 comments)](https://github.com/mastra-ai/mastra/issues/17065).

Its sampled threads request message branching, clearer custom-tool suspension and resumption interfaces, and cancellation from Slack. These are predominantly capability gaps rather than evidence that existing execution is broken. They nevertheless matter for practical delegation: users need to review pending actions, resume safely, and stop incorrect work from the messaging interface. Its fit depends on the control experience you need. Prototype Slack cancellation and human review before committing to a shared workflow, especially when the person supervising agents is not the developer.

<a id="autogpt-2-62-issues-per-release"></a>

<a id="autogpt-0-3913-log-score"></a>

## AutoGPT: 0.3913 Slop Log Score

Top-commented open threads in the last six months: [Enforceable delegation limits for spend and elapsed time (#12700, 21 comments)](https://github.com/Significant-Gravitas/AutoGPT/issues/12700); [Add Gemini model support (#6885, 11 comments)](https://github.com/Significant-Gravitas/AutoGPT/issues/6885); [Improve containers and runbooks, including Coolify (#10948, 10 comments)](https://github.com/Significant-Gravitas/AutoGPT/issues/10948).

Its leading sampled thread requests enforceable delegation limits for spending and elapsed time. That is an important governance gap: instructions asking an agent to stop are different from runtime-enforced limits inherited by child agents. Other threads request Gemini support and better container runbooks, including Coolify. Those are integration and deployment needs rather than proof every installation fails. Before running it unattended, verify hard budgets, child-agent inheritance, persistence, and recovery in a version-pinned container deployment. Those checks address the practical risks highlighted by the issue sample.

<a id="goose-2-29-issues-per-release"></a>

<a id="goose-0-3405-log-score"></a>

## Goose: 0.3405 Slop Log Score

Top-commented open threads in the last six months: [Expose A2UI resources returned from MCP (#12703, 16 comments)](https://github.com/aaif-goose/goose/issues/12703); [Granular shell permission rules (#11399, 15 comments)](https://github.com/aaif-goose/goose/issues/11399); [GRC modularity (#11253, 14 comments)](https://github.com/aaif-goose/goose/issues/11253).

Its prominent sampled threads concern exposing A2UI resources from MCP, granular shell permission rules, and GRC modularity. These are enhancement and architecture discussions, not a cluster of reproducible runtime failures. Contributor work toward an A2UI pull request is a positive engagement signal, although it does not establish a released capability. Shell permissions deserve particular attention because broad command access can exceed what a user intended. Check which requested controls have shipped, then test the current permission rules against your actual commands and operating-system restrictions.

<a id="google-adk-2-01-issues-per-release"></a>

<a id="google-adk-0-3695-log-score"></a>

## Google ADK: 0.3695 Slop Log Score

Top-commented open threads in the last six months: [Add a decision ledger for agent actions (#6099, 48 comments)](https://github.com/google/adk-python/issues/6099); [Database auto-schema behavior (#3343, 23 comments)](https://github.com/google/adk-python/issues/3343); [Redis session key collision with colon-containing identity tuple (#7464, 21 comments)](https://github.com/google/adk-python/issues/7464).

Its most-discussed sampled thread proposes a decision ledger, highlighting demand for auditable agent actions rather than a confirmed defect. Other discussions address database auto-schema behavior and Redis session-key collisions when identity components contain colons. The Redis report is a concrete correctness concern because ambiguous keys could mix session identities. Test identity encoding, database migration behavior, and retained audit history before adopting it for workflows involving multiple people or persistent sessions.

<a id="crewai-1-46-issues-per-release"></a>

<a id="crewai-0-2959-log-score"></a>

## CrewAI: 0.2959 Slop Log Score

Top-commented open threads in the last six months: [Retries can repeat external tool side effects such as email or payment (#5802, 216 comments)](https://github.com/crewAIInc/crewAI/issues/5802); [Add governance middleware for tool authorization (#5888, 148 comments)](https://github.com/crewAIInc/crewAI/issues/5888); [Runtime release-control mediation proposal (#6025, 127 comments)](https://github.com/crewAIInc/crewAI/issues/6025).

One serious sampled issue reports that retries can repeat external side effects such as sending emails or making payments. If an action succeeds but its acknowledgment is lost, retrying without idempotency can duplicate the action. Other heavily discussed threads propose authorization middleware and runtime release-control mediation. Those are governance requests, not independent evidence of crashes. Verify idempotency and partial-success handling before allowing agents to send, pay, publish, or modify important records without supervision.

<a id="agent-zero-0-78-issues-per-release"></a>

<a id="agent-zero-0-2106-log-score"></a>

## Agent Zero: 0.2106 Slop Log Score

Top-commented open threads in the last six months: [Installation and setup question (#1847, 6 comments)](https://github.com/agent0ai/agent-zero/issues/1847); [Image base64 data grows until provider returns HTTP 413 (#1857, 4 comments)](https://github.com/agent0ai/agent-zero/issues/1857); [Memory save repeats or is skipped with Ollama and Qwen (#1967, 4 comments)](https://github.com/agent0ai/agent-zero/issues/1967).

Its leading sampled thread is a setup question with only six comments, offering limited evidence about general reliability. Two smaller reports are more specific: base64 image data grows until a provider returns HTTP 413, and memory saving repeats or is skipped with Ollama and Qwen. These identify multimodal-history and provider-specific persistence cases worth testing, but their comment counts do not establish prevalence. Verify image-heavy sessions and memory retention using your exact local-model configuration before depending on long-running autonomous work.

<a id="langflow-0-66-issues-per-release"></a>

<a id="langflow-0-1491-log-score"></a>

## Langflow: 0.1491 Slop Log Score

Top-commented open threads in the last six months: [Celery, RabbitMQ, and Redis flow fails because of pickle behavior (#8476, 23 comments)](https://github.com/langflow-ai/langflow/issues/8476); [Collaboration, roles, sharing, and version history (#1864, 21 comments)](https://github.com/langflow-ai/langflow/issues/1864); [Support for a custom base path (#8503, 15 comments)](https://github.com/langflow-ai/langflow/issues/8503).

The sampled threads cover a distributed-worker failure involving Celery, RabbitMQ, Redis, and pickle behavior; collaboration controls; and custom base-path support. The worker discussion has a fix-and-test path, an encouraging maintenance signal that still needs release verification. Collaboration requests are particularly relevant for shared use: roles, sharing, and version history can determine whether two people can manage work safely. However, a tidy backlog does not establish product fit. Test separate accounts, flow permissions, distributed execution, and proxy routing in the environment you intend to deploy.

<a id="langgraph-0-59-issues-per-release"></a>

<a id="langgraph-0-1379-log-score"></a>

## LangGraph: 0.1379 Slop Log Score

Top-commented open threads in the last six months: [Long tool calls may replay from checkpoint while original is still running (#7417, 88 comments)](https://github.com/langchain-ai/langgraph/issues/7417); [PostgreSQL checkpointer SSL error (#3716, 53 comments)](https://github.com/langchain-ai/langgraph/issues/3716); [Cancellation loses uncheckpointed streamed state (#5672, 52 comments)](https://github.com/langchain-ai/langgraph/issues/5672).

The sampled reports describe consequential issues: long tool calls may replay from checkpoints while the original remains running, PostgreSQL checkpoint connections can fail on SSL, and cancellation can lose uncheckpointed streamed state. The replay report describes duplicated work and cost, with additional risk when tools have non-idempotent effects. These threads concern durability and recovery rather than cosmetic polish. Test calls longer than three minutes, deliberate cancellation, and database TLS behavior before delegating important actions through its recovery mechanisms.

<a id="letta-code-0-53-issues-per-release"></a>

<a id="letta-code-0-1174-log-score"></a>

## Letta Code: 0.1174 Slop Log Score

Top-commented open threads in the last six months: [Automated tracker for stale skills (#4065, 36 comments)](https://github.com/letta-ai/letta-code/issues/4065); [Expose BYOK token-limit metadata (#3802, 6 comments)](https://github.com/letta-ai/letta-code/issues/3802); [Memory is isolated per agent and not shared across new sessions (#2666, 5 comments)](https://github.com/letta-ai/letta-code/issues/2666).

Its highest-commented sampled issue is an automated stale-skill tracker, so the comments should not be read as independent user failures. Other threads request BYOK token-limit metadata and discuss memory being isolated across agents or new sessions. The memory question matters because users may expect continuity that the actual scoping model does not provide. Confirm exactly how memory persists and is shared, and verify provider-limit reporting before assuming an agent will carry decisions across your working sessions.

<a id="n8n-0-39-issues-per-release"></a>

<a id="n8n-0-0839-log-score"></a>

## n8n: 0.0839 Slop Log Score

Top-commented open threads in the last six months: [AI Agent/Memory omits tool messages and can claim a tool was used (#14361, 57 comments)](https://github.com/n8n-io/n8n/issues/14361); [WhatsApp Business Cloud AI tool returns Invalid URL (#14290, 26 comments)](https://github.com/n8n-io/n8n/issues/14290); [Chat Trigger public URL fails after upgrade (#28891, 25 comments)](https://github.com/n8n-io/n8n/issues/28891).

The sampled issues still identify practical failures: AI Agent/Memory omits tool messages from its record, a WhatsApp Business Cloud tool returns an invalid-URL error, and a public Chat Trigger URL stops working after an upgrade. Missing tool evidence can make an agent’s claims difficult to audit; connector and endpoint failures can interrupt otherwise valid workflows. Test your exact connectors after upgrades and ensure execution traces record actual tool calls before trusting the assistant’s narrative about completed work.

<a id="openai-agents-sdk-0-06-issues-per-release"></a>

<a id="openai-agents-sdk-0-0273-log-score"></a>

## OpenAI Agents SDK: 0.0273 Slop Log Score

Top-commented open threads in the last six months: [Approval decision can transfer across runs when call ID is reused (#5413, 6 comments)](https://github.com/openai/openai-agents-python/issues/5413); [Typing issue (#5387, 4 comments)](https://github.com/openai/openai-agents-python/issues/5387); [Redis Cluster support (#5322, 2 comments)](https://github.com/openai/openai-agents-python/issues/5322).

Its tiny queue is encouraging, but the leading sampled report alleges that approval can transfer across runs when a tool-call ID is reused. The reporter describes an offline reproduction on the main branch. That potentially crosses an authorization boundary: consent should apply only to the action and context reviewed. Smaller threads concern typing and Redis Cluster support. Its strongest sampled issue deserves targeted verification. Reproduce call-ID reuse against your chosen release and confirm that approvals cannot authorize unintended later actions.

## What the Slop Benchmark says overall

Hermes Agent has the highest score in this snapshot at 2.3105, followed by Paperclip at 1.7763. Their sampled issues include architecture and workflow discussions, alongside feature requests. At the lower end, OpenAI Agents SDK, n8n, Letta Code, LangGraph, and Langflow have smaller scores, but their issue samples still include behavior worth testing. A score alone cannot establish a project's reliability.

That is the benchmark’s useful role: it helps find repositories whose open queues deserve closer inspection, then the issues explain whether you are looking at defects, missing features, automated noise, or active design work. It is not fair to say a project is “good” just because it has many releases, or “bad” because it has many open issues. If choosing an agent framework for real work, read the specific issue threads that intersect with your workflow—permissions, retries, persistence, long-running calls, and recovery—and verify those behaviors against the release you plan to run.
