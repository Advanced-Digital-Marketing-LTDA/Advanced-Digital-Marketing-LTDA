---
title: "The Slop Benchmark: Comparing 24 AI Agent Repositories"
meta_title: "Slop Benchmark: 24 AI Agent Repositories Compared"
meta_description: "Open GitHub issues divided by published releases: a comparison of 24 AI agent repositories, with a chart and reviews of their most-discussed open issues."
published: "2026-10-27"
updated: "2026-10-27"
---

A project can have millions of stars and still make you spend your afternoon debugging it. The Slop Benchmark is a blunt way to compare one visible signal of project health: how many open issues sit behind each published release. It is not a code-quality score, a security audit, or a prediction that a project will fail. It is a quick pressure gauge—then we read the most-discussed open issues to see what that pressure actually looks like.

The simplest possible index is:

> **Slop Benchmark = number of open GitHub issues ÷ number of published GitHub releases**

A larger number means more unresolved issue entries per published release. The score is not normalized for project age, maintainers, issue quality, release size, or whether a thread is a request, a question, or a bug. It deliberately does not award points for stars. Stars are included below only to show how popular each repository is, not as a quality input.

## What the ratio can and cannot say

Counts were checked on October 27, 2026. “Open issues” means GitHub issues currently open, excluding pull requests. “Published releases” means GitHub release records that are published, including prereleases and excluding drafts. The score is rounded to two decimals. That choice matters: a repository with only a handful of releases can look much worse than a high-cadence project, even when their underlying defect rate is similar. An issue can also be a duplicate, a help request, a planned feature, or a stale report. The ratio treats each open issue equally because the benchmark is intentionally simple.

The qualitative check for each project uses its three most-commented **currently open issue threads updated since April 27, 2026**. These are not necessarily the most-commented issues of all time. I read them to distinguish reproducible bugs from feature proposals, trackers, and design debates; comments are not counted as independent affected users. The examples describe what maintainers and users are discussing, not a complete audit of the repository.

For a rough reading guide only, I use these sample bands: **low** at 1 or below; **moderate** above 1 through 5; **high** above 5 through 20; **very high** above 20 through 100; and **extreme** above 100. These cutoffs are editorial conveniences, not validated thresholds. “Slop” here refers only to a high ratio plus issue evidence that looks like unresolved reliability or maintenance burden. A feature request alone does not prove a project is slop, and a low score does not certify it as production-ready.

## The comparison table

Higher values mean more open issue entries for each published release. Use the linked repositories to inspect the source counts and project status.

| Project | GitHub stars | Open issues | Published releases | Issues per release | Band |
|:--|--:|--:|--:|--:|:--|
| [Hermes Agent](https://github.com/NousResearch/hermes-agent) | 257,719 | 17,384 | 44 | 395.09 | Extreme |
| [Paperclip](https://github.com/paperclipai/paperclip) | 107,968 | 3,398 | 30 | 113.27 | Extreme |
| [Happy](https://github.com/slopus/happy) | 24,354 | 664 | 16 | 41.50 | Very high |
| [Cindy](https://github.com/makecindy/cindy) | 7,392 | 1,718 | 74 | 23.22 | Very high |
| [NanoClaw](https://github.com/nanocoai/nanoclaw) | 31,035 | 292 | 13 | 22.46 | Very high |
| [OpenClaw](https://github.com/openclaw/openclaw) | 393,209 | 4,937 | 274 | 18.02 | High |
| [Flowise](https://github.com/FlowiseAI/Flowise) (archived) | 55,531 | 701 | 85 | 8.25 | High |
| [AutoGen](https://github.com/microsoft/autogen) | 61,589 | 562 | 98 | 5.73 | High |
| [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) | 14,342 | 615 | 129 | 4.77 | Moderate |
| [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw) | 33,051 | 665 | 154 | 4.32 | Moderate |
| [OpenHands](https://github.com/OpenHands/OpenHands) | 92,015 | 573 | 156 | 3.67 | Moderate |
| [Pydantic AI](https://github.com/pydantic/pydantic-ai) | 20,906 | 1,118 | 350 | 3.19 | Moderate |
| [Dify](https://github.com/langgenius/dify) | 159,723 | 506 | 171 | 2.96 | Moderate |
| [Mastra](https://github.com/mastra-ai/mastra) | 29,128 | 354 | 130 | 2.72 | Moderate |
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 187,788 | 333 | 127 | 2.62 | Moderate |
| [Goose](https://github.com/aaif-goose/goose) | 55,827 | 359 | 157 | 2.29 | Moderate |
| [Google ADK](https://github.com/google/adk-python) | 22,024 | 183 | 91 | 2.01 | Moderate |
| [CrewAI](https://github.com/crewAIInc/crewAI) | 60,180 | 357 | 244 | 1.46 | Moderate |
| [Agent Zero](https://github.com/agent0ai/agent-zero) | 19,585 | 59 | 76 | 0.78 | Low |
| [Langflow](https://github.com/langflow-ai/langflow) | 156,070 | 208 | 316 | 0.66 | Low |
| [LangGraph](https://github.com/langchain-ai/langgraph) | 43,998 | 346 | 590 | 0.59 | Low |
| [Letta Code](https://github.com/letta-ai/letta-code) | 3,719 | 188 | 352 | 0.53 | Low |
| [n8n](https://github.com/n8n-io/n8n) | 208,798 | 339 | 867 | 0.39 | Low |
| [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | 30,336 | 7 | 124 | 0.06 | Low |

## The ratio graphic

The chart uses a logarithmic horizontal scale because values range from 0.06 to 395.09. The bands match the illustrative cutoffs above; archived Flowise is labeled separately in the table. The table is the exact lookup, while the bars make the spread easier to see.

![Slop Benchmark ratios for 24 AI agent repositories, using a logarithmic scale](/images/blog/slop-benchmark.svg)

## Project-by-project issue review

The ratio is a screening signal, not a verdict on maintainers or users. Each assessment below starts with the highest-commented open threads from the six-month window and asks what kind of evidence those comments represent.

## Hermes Agent: 395.09 issues per release

**Ratio verdict: Extreme.** Top-commented open threads in the last six months: [Refactor the godfile: split the 2,000-task tool catalog into maintainable modules (#78647, 82 comments)](https://github.com/NousResearch/hermes-agent/issues/78647); [Desktop app sends the same assistant reply twice (#127665, 58 comments)](https://github.com/NousResearch/hermes-agent/issues/127665); [Opening a pull request fails with a permissions error (#131859, 53 comments)](https://github.com/NousResearch/hermes-agent/issues/131859).

Hermes has the highest ratio here: 395.09, from 17,384 open issues and 44 releases. Its most-discussed sampled thread concerns splitting a sprawling “godfile,” which signals maintenance burden rather than a single runtime failure. More concrete reports describe duplicate desktop replies and permission errors when opening pull requests. Those affect the assistant’s ability to communicate and finish work. The combination supports a strong slop warning, although the backlog also includes proposals and questions. Active refactoring is encouraging, but popularity does not resolve these defects. Test desktop sessions and PR creation in a pinned release before relying on Hermes for unattended tasks.

## Paperclip: 113.27 issues per release

**Ratio verdict: Extreme.** Top-commented open threads in the last six months: [Add support for Ollama as a model provider (#187, 34 comments)](https://github.com/paperclipai/paperclip/issues/187); [Reviewer handoff can be skipped and there is no retry (#13532, 26 comments)](https://github.com/paperclipai/paperclip/issues/13532); [Recovery hold can silently deadlock or duplicate watchdog work (#14600, 23 comments)](https://github.com/paperclipai/paperclip/issues/14600).

Paperclip scores 113.27, with 3,398 open issues against 30 releases. Its most-commented sampled issue requests Ollama support; that is a missing capability, not a broken feature. The next threads are more concerning: reviewer handoffs can be skipped without retry, and recovery holds can silently deadlock or duplicate watchdog work. Those problems strike directly at delegated task coordination. A coordinator that loses review gates or stalls silently creates extra supervision instead of saving it. The extreme ratio therefore has meaningful reliability evidence behind it. Paperclip deserves a strong slop warning for dependable orchestration until fixes are released and verified in realistic workflows.

## Happy: 41.50 issues per release

**Ratio verdict: Very high.** Top-commented open threads in the last six months: [Codex sessions hang while waiting for messages (#358, 17 comments)](https://github.com/slopus/happy/issues/358); [Add OpenCode support (#265, 17 comments)](https://github.com/slopus/happy/issues/265); [Mobile and web cannot connect to a terminal session (#276, 15 comments)](https://github.com/slopus/happy/issues/276).

Happy’s 664 open issues and 16 releases produce a ratio of 41.50. The small release denominator amplifies the score, but the sampled threads contain relevant failures: Codex sessions hanging while waiting for messages, and mobile or web clients failing to reconnect to terminal sessions. Both undermine its cross-device workflow. The OpenCode support thread is a feature request and should not count as evidence of breakage. Happy looks useful but unfinished rather than abandoned. Its slop signal is substantial for users expecting seamless remote access. Before adopting it, test long sessions, stalled-message recovery, and reconnection from every device you intend to use.

## Cindy: 23.22 issues per release

**Ratio verdict: Very high.** Top-commented open threads in the last six months: [Clarify Pi versus Claude/Codex resource scope and project/user context (#1991, 26 comments)](https://github.com/makecindy/cindy/issues/1991); [Windows app steals foreground focus (#500, 16 comments)](https://github.com/makecindy/cindy/issues/500); [Prove the Cindy bridge gate (#3771, 11 comments)](https://github.com/makecindy/cindy/issues/3771).

Cindy scores 23.22 from 1,718 open issues and 74 releases. The leading sampled discussion concerns inconsistent resource scope across Pi, Claude, and Codex, including project versus user context. Comments report some completed work alongside incomplete extension hooks, suggesting active development with remaining integration debt. Other threads describe Windows focus stealing and seek verification of the bridge gate. These are different problems: desktop polish, provider semantics, and confidence in a boundary between components. Cindy is clearly active, but its high ratio warrants caution. Validate context scope, extension behavior, and desktop interruptions against your exact providers before treating it as dependable shared infrastructure.

## NanoClaw: 22.46 issues per release

**Ratio verdict: Very high.** Top-commented open threads in the last six months: [Website TLS certificate error (#1503, 19 comments)](https://github.com/nanocoai/nanoclaw/issues/1503); [Support custom OpenAI-compatible endpoints, including Codex and OpenCode (#1984, 6 comments)](https://github.com/nanocoai/nanoclaw/issues/1984); [Skill refresh breaks local model adapters (#3529, 5 comments)](https://github.com/nanocoai/nanoclaw/issues/3529).

NanoClaw’s ratio is 22.46, with 292 open issues and only 13 releases. That small denominator deserves caution before declaring the project slop. Its most-commented sampled thread concerns a website TLS certificate error, which affects onboarding but does not establish a runtime defect. Another requests custom OpenAI-compatible endpoints; again, that is missing functionality. The more relevant reliability report says skill refresh breaks local model adapters. That can disrupt an otherwise working installation after an update. NanoClaw’s evidence is mixed: a high numeric warning with limited core-defect discussion. Test adapter refreshes and provider compatibility, and retain a known-good version when upgrading deployments.

## OpenClaw: 18.02 issues per release

**Ratio verdict: High.** Top-commented open threads in the last six months: [Realtime voice work accumulates unbounded state (#116201, 59 comments)](https://github.com/openclaw/openclaw/issues/116201); [Gateway hangs for minutes when copying a large plugin (#160959, 57 comments)](https://github.com/openclaw/openclaw/issues/160959); [Web UI performance and stability tracking issue (#149361, 51 comments)](https://github.com/openclaw/openclaw/issues/149361).

OpenClaw scores 18.02 from 4,937 open issues and 274 releases. Frequent shipping moderates the ratio, but the sampled issues describe consequential failures. A realtime voice report identifies growing state and oversized buffers. Another reports minutes-long Gateway stalls when copying a large plugin, including a reproduction involving an 878 MB extension. A Web UI umbrella issue tracks performance and stability concerns. These are meaningful operational warnings even though OpenClaw is not among the highest ratios. Its release volume should not be confused with reliability. Stress-test long voice sessions, extension installation, and interface responsiveness before allowing unattended work on a persistent server.

## Flowise: 8.25 issues per release

**Ratio verdict: High.** Top-commented open threads in the last six months: [Add GraphRAG support (#2837, 31 comments)](https://github.com/FlowiseAI/Flowise/issues/2837); [Document loader page is blank (#5097, 24 comments)](https://github.com/FlowiseAI/Flowise/issues/5097); [Text splitter overlap behavior (#5173, 19 comments)](https://github.com/FlowiseAI/Flowise/issues/5173).

Flowise scores 8.25, with 701 open issues and 85 releases. More decisive than that high ratio is its archival on August 13, 2026: the upstream release denominator is effectively frozen. The sampled issues include GraphRAG support, a blank document-loader page, and text-splitter overlap behavior. GraphRAG is an enhancement request; the blank loader is a concrete usability failure. These should not receive identical weight. Existing pinned deployments may remain useful, but new adopters cannot assume ongoing upstream fixes. Flowise’s strongest warning is lifecycle rather than the ratio alone. A maintained fork would need a separate assessment of its releases, backlog, and support activity.

## AutoGen: 5.73 issues per release

**Ratio verdict: High.** Top-commented open threads in the last six months: [Cryptographic action receipts for delegated work (#7353, 417 comments)](https://github.com/microsoft/autogen/issues/7353); [Add a GuardrailProvider extension point (#7405, 147 comments)](https://github.com/microsoft/autogen/issues/7405); [Introduce a mission keeper role (#7487, 74 comments)](https://github.com/microsoft/autogen/issues/7487).

AutoGen scores 5.73 from 562 open issues and 98 releases. Its highest-commented sampled threads propose cryptographic action receipts, a GuardrailProvider hook, and a mission-keeper role. These are governance and architecture proposals, not hundreds of independent failure reports. Their prominence shows demand for stronger oversight of delegated work. Microsoft’s direction toward Agent Framework for new projects, with AutoGen community-maintained, adds a lifecycle consideration beyond the ratio. AutoGen is not demonstrably slop merely because proposals attract comments. However, new adopters should evaluate the current maintenance path and available governance controls rather than assuming the historical Microsoft association guarantees future support for their workloads.

## Microsoft Agent Framework: 4.77 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Identity and trust boundaries at agent handoffs (#4842, 17 comments)](https://github.com/microsoft/agent-framework/issues/4842); [DevUI limitations (#2084, 16 comments)](https://github.com/microsoft/agent-framework/issues/2084); [Approval policy unexpectedly applies to every function (#3054, 14 comments)](https://github.com/microsoft/agent-framework/issues/3054).

Microsoft Agent Framework scores 4.77, with 615 open issues and 129 releases. Its sampled threads focus on identity and trust during handoffs, DevUI limitations, and an approval policy unexpectedly applying to every function. The first is a design concern; the approval behavior is more directly operational. Both matter when specialist agents inherit permissions or wait for human review. The moderate ratio suggests neither an exceptionally tidy backlog nor overwhelming neglect. The evidence fits a developing framework with consequential semantics still under discussion. Prototype identity propagation, selective approvals, and debugging visibility before choosing it for delegated work that crosses users or permission boundaries.

## ZeroClaw: 4.32 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Granular sandbox policy drifts from configured settings (#6996, 29 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/6996); [Work lanes and board automation RFC (#6808, 24 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/6808); [Provider wire-protocol RFC (#8396, 19 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/8396).

ZeroClaw’s 665 open issues and 154 releases yield 4.32. Its most-discussed sampled issue concerns granular sandbox policy drifting from configured settings. That deserves more weight than the score: users must know whether restrictions actually govern tool behavior. Structured policy discussion and an approved vote are encouraging signs of engagement, but do not themselves prove a released fix. Other prominent threads are RFCs for work lanes and provider protocols, which represent planned capabilities rather than confirmed failures. ZeroClaw is not an obvious slop case by the ratio. Still, verify effective sandbox restrictions with negative tests before trusting configuration labels in consequential workflows.

## OpenHands: 3.67 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Agent Canvas misdetects the port and fails to connect (#17546, 204 comments)](https://github.com/OpenHands/OpenHands/issues/17546); [Roadmap for feature parity (#9689, 29 comments)](https://github.com/OpenHands/OpenHands/issues/9689); [Analytics consent reappears after being dismissed (#16601, 19 comments)](https://github.com/OpenHands/OpenHands/issues/16601).

OpenHands scores 3.67 from 573 open issues and 156 releases. The biggest sampled thread describes Agent Canvas misdetecting a port and failing to connect. A linked fix and maintainer prioritization show engagement, although a proposed patch does not establish that every released configuration works. Other threads cover a feature-parity roadmap and analytics consent reappearing after dismissal. The roadmap is not a defect; consent persistence is a concrete UX concern. Overall, the moderate ratio and visible remediation argue against a blanket slop label. Test environment connectivity and preference persistence on your deployment, and check whether unresolved roadmap gaps affect the work you expect agents to perform.

## Pydantic AI: 3.19 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Automated tracker for detection runs (#5955, 44 comments)](https://github.com/pydantic/pydantic-ai/issues/5955); [Human approval for multi-agent work (#3274, 43 comments)](https://github.com/pydantic/pydantic-ai/issues/3274); [Approval signal is a plain boolean without run binding (#5536, 35 comments)](https://github.com/pydantic/pydantic-ai/issues/5536).

Pydantic AI scores 3.19, with 1,118 open issues and 350 releases. Its highest-commented sampled thread is an automated detection-run tracker, so comment volume there is weak evidence of product failure. More significant discussions concern human approval for multi-agent work and an approval signal represented as a plain boolean without binding to a specific tool, run, nonce, or expiration. Those details determine whether consent can be reused outside its intended context. The moderate ratio looks reasonable, but cannot certify approval safety. Pydantic AI does not show an obvious slop pattern here. Developers should verify action-specific, expiring approval semantics before building consequential delegated workflows.

## Dify: 2.96 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Parallel fail-fast leaves errors unattributed or stale (#39151, 61 comments)](https://github.com/langgenius/dify/issues/39151); [Rewrite-property behavior request (#40372, 57 comments)](https://github.com/langgenius/dify/issues/40372); [SQLite testing and refactor discussion (#32454, 37 comments)](https://github.com/langgenius/dify/issues/32454).

Dify scores 2.96 from 506 open issues and 171 releases. The strongest sampled reliability concern involves parallel fail-fast execution leaving errors unattributed or stale. A workflow that stops without clearly identifying the failed branch makes recovery harder and can prompt unnecessary reruns. Other prominent discussions concern rewrite behavior and SQLite testing or refactoring; these are product and engineering discussions rather than straightforward evidence of runtime failure. Dify’s moderate ratio provides little support for a blanket slop verdict. For adoption, deliberately fail parallel branches and inspect the resulting trace. Clear attribution and recoverable partial state matter more to your workflow than the raw issue total.

## Mastra: 2.72 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Message branching support (#5093, 15 comments)](https://github.com/mastra-ai/mastra/issues/5093); [Custom tool suspend and resume UI/schema (#20603, 9 comments)](https://github.com/mastra-ai/mastra/issues/20603); [Cancel or stop an agent from Slack (#17065, 8 comments)](https://github.com/mastra-ai/mastra/issues/17065).

Mastra scores 2.72, with 354 open issues and 130 releases. Its sampled threads request message branching, clearer custom-tool suspension and resumption interfaces, and cancellation from Slack. These are predominantly capability gaps rather than evidence that existing execution is broken. They nevertheless matter for practical delegation: users need to review pending actions, resume safely, and stop incorrect work from the messaging interface. Mastra’s ratio and issue mix do not support a strong slop label. Its fit depends on the control experience you need. Prototype Slack cancellation and human review before committing to a shared workflow, especially when the person supervising agents is not the developer.

## AutoGPT: 2.62 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Enforceable delegation limits for spend and elapsed time (#12700, 21 comments)](https://github.com/Significant-Gravitas/AutoGPT/issues/12700); [Add Gemini model support (#6885, 11 comments)](https://github.com/Significant-Gravitas/AutoGPT/issues/6885); [Improve containers and runbooks, including Coolify (#10948, 10 comments)](https://github.com/Significant-Gravitas/AutoGPT/issues/10948).

AutoGPT scores 2.62 from 333 open issues and 127 releases. Its leading sampled thread requests enforceable delegation limits for spending and elapsed time. That is an important governance gap: instructions asking an agent to stop are different from runtime-enforced limits inherited by child agents. Other threads request Gemini support and better container runbooks, including Coolify. Those are integration and deployment needs rather than proof every installation fails. The moderate ratio does not support a strong slop verdict. Before running it unattended, verify hard budgets, child-agent inheritance, persistence, and recovery in a version-pinned container deployment. Those checks address the practical risks highlighted by the issue sample.

## Goose: 2.29 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Expose A2UI resources returned from MCP (#12703, 16 comments)](https://github.com/aaif-goose/goose/issues/12703); [Granular shell permission rules (#11399, 15 comments)](https://github.com/aaif-goose/goose/issues/11399); [GRC modularity (#11253, 14 comments)](https://github.com/aaif-goose/goose/issues/11253).

Goose scores 2.29 from 359 open issues and 157 releases. Its prominent sampled threads concern exposing A2UI resources from MCP, granular shell permission rules, and GRC modularity. These are enhancement and architecture discussions, not a cluster of reproducible runtime failures. Contributor work toward an A2UI pull request is a positive engagement signal, although it does not establish a released capability. Shell permissions deserve particular attention because broad command access can exceed what a user intended. Goose shows relatively little slop evidence in this sample. Check which requested controls have shipped, then test the current permission rules against your actual commands and operating-system restrictions.

## Google ADK: 2.01 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Add a decision ledger for agent actions (#6099, 48 comments)](https://github.com/google/adk-python/issues/6099); [Database auto-schema behavior (#3343, 23 comments)](https://github.com/google/adk-python/issues/3343); [Redis session key collision with colon-containing identity tuple (#7464, 21 comments)](https://github.com/google/adk-python/issues/7464).

Google ADK scores 2.01, with 183 open issues and 91 releases. Its most-discussed sampled thread proposes a decision ledger, highlighting demand for auditable agent actions rather than a confirmed defect. Other discussions address database auto-schema behavior and Redis session-key collisions when identity components contain colons. The Redis report is a concrete correctness concern because ambiguous keys could mix session identities. These issues show why a modest ratio cannot replace technical inspection. ADK is not an obvious slop project by this measure. Test identity encoding, database migration behavior, and retained audit history before adopting it for workflows involving multiple people or persistent sessions.

## CrewAI: 1.46 issues per release

**Ratio verdict: Moderate.** Top-commented open threads in the last six months: [Retries can repeat external tool side effects such as email or payment (#5802, 216 comments)](https://github.com/crewAIInc/crewAI/issues/5802); [Add governance middleware for tool authorization (#5888, 148 comments)](https://github.com/crewAIInc/crewAI/issues/5888); [Runtime release-control mediation proposal (#6025, 127 comments)](https://github.com/crewAIInc/crewAI/issues/6025).

CrewAI scores 1.46 from 357 open issues and 244 releases. That favorable ratio contrasts with a serious sampled issue: retries can repeat external side effects such as sending emails or making payments. If an action succeeds but its acknowledgment is lost, retrying without idempotency can duplicate the action. Other heavily discussed threads propose authorization middleware and runtime release-control mediation. Those are governance requests, not independent evidence of crashes. CrewAI is not slop by its backlog ratio, but the retry concern can outweigh that reassuring number. Verify idempotency and partial-success handling before allowing agents to send, pay, publish, or modify important records without supervision.

## Agent Zero: 0.78 issues per release

**Ratio verdict: Low.** Top-commented open threads in the last six months: [Installation and setup question (#1847, 6 comments)](https://github.com/agent0ai/agent-zero/issues/1847); [Image base64 data grows until provider returns HTTP 413 (#1857, 4 comments)](https://github.com/agent0ai/agent-zero/issues/1857); [Memory save repeats or is skipped with Ollama and Qwen (#1967, 4 comments)](https://github.com/agent0ai/agent-zero/issues/1967).

Agent Zero scores 0.78 from 59 open issues and 76 releases. Its leading sampled thread is a setup question with only six comments, offering limited evidence about general reliability. Two smaller reports are more specific: base64 image data grows until a provider returns HTTP 413, and memory saving repeats or is skipped with Ollama and Qwen. These identify multimodal-history and provider-specific persistence cases worth testing, but their comment counts do not establish prevalence. Agent Zero has a favorable score and little basis for a blanket slop label here. Verify image-heavy sessions and memory retention using your exact local-model configuration before depending on long-running autonomous work.

## Langflow: 0.66 issues per release

**Ratio verdict: Low.** Top-commented open threads in the last six months: [Celery, RabbitMQ, and Redis flow fails because of pickle behavior (#8476, 23 comments)](https://github.com/langflow-ai/langflow/issues/8476); [Collaboration, roles, sharing, and version history (#1864, 21 comments)](https://github.com/langflow-ai/langflow/issues/1864); [Support for a custom base path (#8503, 15 comments)](https://github.com/langflow-ai/langflow/issues/8503).

Langflow scores 0.66, with 208 open issues and 316 releases. The sampled threads cover a distributed-worker failure involving Celery, RabbitMQ, Redis, and pickle behavior; collaboration controls; and custom base-path support. The worker discussion has a fix-and-test path, an encouraging maintenance signal that still needs release verification. Collaboration requests are particularly relevant for shared use: roles, sharing, and version history can determine whether two people can manage work safely. Langflow is not slop by this ratio. However, a tidy backlog does not establish product fit. Test separate accounts, flow permissions, distributed execution, and proxy routing in the environment you intend to deploy.

## LangGraph: 0.59 issues per release

**Ratio verdict: Low.** Top-commented open threads in the last six months: [Long tool calls may replay from checkpoint while original is still running (#7417, 88 comments)](https://github.com/langchain-ai/langgraph/issues/7417); [PostgreSQL checkpointer SSL error (#3716, 53 comments)](https://github.com/langchain-ai/langgraph/issues/3716); [Cancellation loses uncheckpointed streamed state (#5672, 52 comments)](https://github.com/langchain-ai/langgraph/issues/5672).

LangGraph scores 0.59 from 346 open issues and 590 releases. Its low ratio contrasts with consequential sampled reports: long tool calls may replay from checkpoints while the original remains running, PostgreSQL checkpoint connections can fail on SSL, and cancellation can lose uncheckpointed streamed state. The replay report describes duplicated work and cost, with additional risk when tools have non-idempotent effects. These threads concern durability and recovery rather than cosmetic polish. LangGraph is not slop under the simple index, but the number cannot establish execution guarantees. Test calls longer than three minutes, deliberate cancellation, and database TLS behavior before delegating important actions through its recovery mechanisms.

## Letta Code: 0.53 issues per release

**Ratio verdict: Low.** Top-commented open threads in the last six months: [Automated tracker for stale skills (#4065, 36 comments)](https://github.com/letta-ai/letta-code/issues/4065); [Expose BYOK token-limit metadata (#3802, 6 comments)](https://github.com/letta-ai/letta-code/issues/3802); [Memory is isolated per agent and not shared across new sessions (#2666, 5 comments)](https://github.com/letta-ai/letta-code/issues/2666).

Letta Code scores 0.53, with 188 open issues and 352 releases. Its highest-commented sampled issue is an automated stale-skill tracker, so the comments should not be read as independent user failures. Other threads request BYOK token-limit metadata and discuss memory being isolated across agents or new sessions. The memory question matters because users may expect continuity that the actual scoping model does not provide. Letta Code looks relatively tidy by the ratio, with limited evidence of broad breakage in this sample. Confirm exactly how memory persists and is shared, and verify provider-limit reporting before assuming an agent will carry decisions across your working sessions.

## n8n: 0.39 issues per release

**Ratio verdict: Low.** Top-commented open threads in the last six months: [AI Agent/Memory omits tool messages and can claim a tool was used (#14361, 57 comments)](https://github.com/n8n-io/n8n/issues/14361); [WhatsApp Business Cloud AI tool returns Invalid URL (#14290, 26 comments)](https://github.com/n8n-io/n8n/issues/14290); [Chat Trigger public URL fails after upgrade (#28891, 25 comments)](https://github.com/n8n-io/n8n/issues/28891).

n8n scores 0.39 from 339 open issues and 867 releases. That is a low ratio, though OpenAI Agents SDK scores lower. The sampled issues still identify practical failures: AI Agent/Memory omits tool messages from its record, a WhatsApp Business Cloud tool returns an invalid-URL error, and a public Chat Trigger URL stops working after an upgrade. Missing tool evidence can make an agent’s claims difficult to audit; connector and endpoint failures can interrupt otherwise valid workflows. n8n is not slop by this benchmark. Test your exact connectors after upgrades and ensure execution traces record actual tool calls before trusting the assistant’s narrative about completed work.

## OpenAI Agents SDK: 0.06 issues per release

**Ratio verdict: Low.** Top-commented open threads in the last six months: [Approval decision can transfer across runs when call ID is reused (#5413, 6 comments)](https://github.com/openai/openai-agents-python/issues/5413); [Typing issue (#5387, 4 comments)](https://github.com/openai/openai-agents-python/issues/5387); [Redis Cluster support (#5322, 2 comments)](https://github.com/openai/openai-agents-python/issues/5322).

OpenAI Agents SDK scores 0.06 from seven open issues and 124 releases, the lowest ratio here. Its tiny queue is encouraging, but the leading sampled report alleges that approval can transfer across runs when a tool-call ID is reused. The reporter describes an offline reproduction on the main branch. That potentially crosses an authorization boundary: consent should apply only to the action and context reviewed. Smaller threads concern typing and Redis Cluster support. The SDK is not slop by the ratio, but its strongest issue deserves targeted verification. Reproduce call-ID reuse against your chosen release and confirm that approvals cannot authorize unintended later actions.

## What the Slop Benchmark says overall

The ratio’s largest outlier is Hermes Agent at 395.09, followed by Paperclip at 113.27; the issue threads show that both have conversations about meaningful architecture or workflow risks, though Paperclip’s sample also includes a feature request. Happy, Cindy, and NanoClaw sit above 20, where the relatively small release denominators deserve extra caution. At the low end, n8n, OpenAI Agents SDK, Letta Code, LangGraph, and Langflow have fewer open issues per release—but their issue samples still include behavior that merits targeted testing.

That is the benchmark’s useful role: it helps find repositories whose open queues deserve closer inspection, then the issues explain whether you are looking at defects, missing features, automated noise, or active design work. It is not fair to say a project is “good” just because it has many releases, or “bad” because it has many open issues. If choosing an agent framework for real work, read the specific issue threads that intersect with your workflow—permissions, retries, persistence, long-running calls, and recovery—and verify those behaviors against the release you plan to run.
