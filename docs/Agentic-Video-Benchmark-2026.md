---
title: "The Slop Benchmark: Comparing 21 Agentic Video Repositories"
meta_title: "Slop Benchmark: 21 Agentic Video Repositories Compared"
meta_description: "A GitHub backlog and activity comparison of 21 agentic video repositories, with a chart and a review of selected issue threads."
published: "2026-10-30"
updated: "2026-10-30"
---

A project can have millions of stars and still make you spend your afternoon debugging it. The Slop Benchmark is a blunt way to compare visible public backlog with release and merged pull request activity. It is not a code-quality score, a security audit, or a prediction that a project will fail. It is a quick pressure gauge—then we look at selected open issues to understand what the discussions represent.

## What the ratio can and cannot say

The 21 independent repositories include editors, headless engines, commercial-editor bridges, agent skills and research or production frameworks. They are not interchangeable full video editors. No repository was installed or executed for this comparison; capabilities below are documentation claims, not tested behavior.

The score snapshot was collected October 30, 2026, 15:32:03–15:35:40 UTC, with batch labels 15:34 and 15:36 UTC. The collection is sequential, not atomic. Open issues exclude PRs. Published GitHub release records include prereleases and exclude drafts. Open PRs include drafts; PRs closed without merging are listed separately and excluded from B's denominator.

> **A = open issues ÷ published releases**
>
> **B = (open issues + open PRs) ÷ lifetime merged PRs**
>
> **C = (A + B) ÷ 2 when there are releases; otherwise C = B. Slop Log Score = log10(1 + C)**

If there are no releases, A is shown as N/A and C = B; this does not mean the missing A is zero. Repositories with fewer than 30 lifetime merged PRs are excluded, so every listed repository has a B. Calculations use unrounded ratios; components are displayed to two decimals and the Slop Log Score to four. Lower indicates less public backlog relative to these denominators, not proof of reliable editing. Release practices, issue types and project age affect the score.

For the qualitative check, up to three currently open issues updated since April 30 were selected per repository, excluding PRs, sorted by comment count then issue number descending. Issue bodies and available comments were reviewed on October 30; this is not a claim of complete historical comment coverage. Open threads include support, proposals and administrative noise as well as reports; no qualifying thread does not mean bug-free software.

## The comparison table

The basis column distinguishes two available measures from the release-less B-only case. Stars are context, not a score input.

| Project | Category | GitHub stars | Open issues | Open PRs | Merged PRs | Closed unmerged | Releases | A | B | C | Slop Log Score | Basis |
|:--|:--|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|:--|
| [MBehtemam/Montagent](https://github.com/MBehtemam/Montagent) | headless editing engine | 3 | 74 | 0 | 421 | 6 | 9 | 8.22 | 0.18 | 4.20 | 0.7159 | A + B |
| [video-db/Director](https://github.com/video-db/Director) | Cloud production orchestrator | 1,568 | 8 | 13 | 120 | 27 | 1 | 8.00 | 0.18 | 4.09 | 0.7065 | A + B |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Broad production orchestrator | 73,231 | 114 | 303 | 153 | 157 | 0 | N/A | 2.73 | 2.73 | 0.5712 | B |
| [diffusionstudio/editor](https://github.com/diffusionstudio/editor) | code-backed desktop editor | 3,436 | 20 | 22 | 46 | 9 | 29 | 0.69 | 0.91 | 0.80 | 0.2556 | A + B |
| [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | conversational editing orchestrator | 3,596 | 22 | 11 | 46 | 14 | 0 | N/A | 0.72 | 0.72 | 0.2349 | B |
| [hypit-ai/hypit](https://github.com/hypit-ai/hypit) | Video workflow compiler | 26,790 | 24 | 53 | 260 | 35 | 27 | 0.89 | 0.30 | 0.59 | 0.2021 | A + B |
| [palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro) | desktop editor / historical source | 14,662 | 66 | 34 | 360 | 78 | 89 | 0.74 | 0.28 | 0.51 | 0.1789 | A + B |
| [VelornLabs/velorn](https://github.com/VelornLabs/velorn) | desktop editor / generation workstation | 518 | 21 | 5 | 44 | 8 | 64 | 0.33 | 0.59 | 0.46 | 0.1642 | A + B |
| [openfilm/openfilm](https://github.com/openfilm/openfilm) | Editor/composition system | 3,721 | 10 | 4 | 207 | 27 | 13 | 0.77 | 0.07 | 0.42 | 0.1518 | A + B |
| [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut) | local conversational timeline editor | 2,796 | 14 | 11 | 78 | 29 | 28 | 0.50 | 0.32 | 0.41 | 0.1493 | A + B |
| [hetpatel-11/Adobe_Premiere_Pro_MCP](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) | Premiere Pro integration | 783 | 0 | 21 | 41 | 9 | 20 | 0.00 | 0.51 | 0.26 | 0.0990 | A + B |
| [ronak-create/FableCut](https://github.com/ronak-create/FableCut) | Browser editor | 771 | 7 | 1 | 130 | 2 | 18 | 0.39 | 0.06 | 0.23 | 0.0882 | A + B |
| [AKMessi/vex](https://github.com/AKMessi/vex) | Terminal editing agent | 96 | 3 | 2 | 50 | 4 | 16 | 0.19 | 0.10 | 0.14 | 0.0583 | A + B |
| [Mvp2o-ai/cuttingfloor](https://github.com/Mvp2o-ai/cuttingfloor) | Headless editing engine | 0 | 0 | 12 | 44 | 7 | 35 | 0.00 | 0.27 | 0.14 | 0.0555 | A + B |
| [MartinDelophy/ai-video-editor](https://github.com/MartinDelophy/ai-video-editor) | Local editor and skill | 924 | 5 | 0 | 82 | 0 | 31 | 0.16 | 0.06 | 0.11 | 0.0458 | A + B |
| [KyaniteLabs/kinocut](https://github.com/KyaniteLabs/kinocut) | headless editing toolkit | 232 | 7 | 4 | 440 | 60 | 52 | 0.13 | 0.03 | 0.08 | 0.0333 | A + B |
| [samuelgursky/davinci-resolve-mcp](https://github.com/samuelgursky/davinci-resolve-mcp) | DaVinci Resolve integration | 3,855 | 4 | 3 | 161 | 44 | 486 | 0.01 | 0.04 | 0.03 | 0.0111 | A + B |
| [dziksu/synkinema](https://github.com/dziksu/synkinema) | Local editor and headless engine | 18 | 0 | 4 | 78 | 34 | 21 | 0.00 | 0.05 | 0.03 | 0.0110 | A + B |
| [mattppal/mcut](https://github.com/mattppal/mcut) | editing SDK and desktop studio | 7 | 0 | 10 | 201 | 12 | 206 | 0.00 | 0.05 | 0.02 | 0.0107 | A + B |
| [OrellBuehler/kerf](https://github.com/OrellBuehler/kerf) | Desktop editor | 10 | 0 | 6 | 227 | 19 | 37 | 0.00 | 0.03 | 0.01 | 0.0057 | A + B |
| [naman-sharma12345/kimo](https://github.com/naman-sharma12345/kimo) | Headless editing engine | 20 | 0 | 0 | 38 | 2 | 5 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |

## The ratio graphic

The chart uses the same scores as the table. The table is the exact lookup, while the bars make the spread easier to see. On a narrow screen, the chart is arranged vertically for easier reading. You can also [open the full-size chart](/images/blog/agentic-video-benchmark.svg).

![Slop Log Scores for 21 agentic video repositories, October 30, 2026](/images/blog/agentic-video-benchmark.svg)

## Stars vs. slop

Stars measure hype, and the Slop Log Score measures backlog pressure. Plotting them together shows which projects are popular and still keep their backlog under control. The dotted Pareto line connects the repositories that no other repository beats on both counts. The green area marks above-median stars with below-median slop, and the amber area marks above-average stars with below-average slop; where they overlap, a repository clears both. Stars run up the vertical axis on a log scale (stars + 1), and stars remain context rather than a score input.

![Stars against Slop Log Score for 21 agentic video repositories, with a dotted Pareto line, October 30, 2026](/images/blog/agentic-video-pareto.svg)

## Project-by-project issue review

The score is a screening signal, not a verdict on maintainers or users. The linked discussions below reflect the selected sample and do not establish the prevalence or present status of reported problems.

<a id="mbehtemam-montagent-0-7159-log-score"></a>

## MBehtemam/Montagent: 0.7159 Slop Log Score

The repository is categorized here as headless editing engine. JSON projects, CLI and MCP tools cover frame inspection, preview, render, measurement, validation and verification. Actual LICENSE is MIT despite GitHub's NOASSERTION metadata; media licenses are separate. Requires FFmpeg with libx264. Remote hosted MCP is designed but not shipped.

The selected threads are capability-planning inventories and a historical specification, not individual bug reports. Their large appendices were retrieved, but individual feature rows were not independently validated.

Selected discussions: [umbrella thread](https://github.com/MBehtemam/Montagent/issues/956); [umbrella thread](https://github.com/MBehtemam/Montagent/issues/954); [umbrella thread](https://github.com/MBehtemam/Montagent/issues/2). These classifications describe the thread, not a verified defect or current resolution.

<a id="video-db-director-0-7065-log-score"></a>

## video-db/Director: 0.7065 Slop Log Score

The repository is categorized here as Cloud production orchestrator. Multi-agent video search, highlights, clipping, overlays, dubbing/subtitles and compilations. Depends on VideoDB infrastructure/API configuration; not a self-contained desktop NLE.

The sampled threads request provider support or a provider recommendation. A linked pull request does not establish that support shipped.

Selected discussions: [feature thread](https://github.com/video-db/Director/issues/194); [feature/provider recommendation thread](https://github.com/video-db/Director/issues/186).

<a id="calesthio-openmontage-0-3734-log-score"></a>

<a id="calesthio-openmontage-0-5712-log-score"></a>

## calesthio/OpenMontage: 0.5712 Slop Log Score

The repository is categorized here as Broad production orchestrator. Agentic system spanning research, scripts, assets, editing and composition. Its README documents real motion clips placed on a timeline and rendered, alongside generated assets. It includes storyboard approval and local review. Broader than an NLE, with pipeline-specific provider costs and authentication.

The most-commented selected issue hosts trailer attachments; another recruits reviewers. The Hermes integration thread contains differing reports, including a successful preflight and a later workflow concern, without a final maintainer resolution.

Selected discussions: [administrative/media upload thread](https://github.com/calesthio/OpenMontage/issues/1); [community/reviewer recruitment thread](https://github.com/calesthio/OpenMontage/issues/149); [support/integration thread](https://github.com/calesthio/OpenMontage/issues/165).

<a id="diffusionstudio-editor-0-2556-log-score"></a>

## diffusionstudio/editor: 0.2556 Slop Log Score

The repository is categorized here as code-backed desktop editor. Humans and agents edit real footage through the same code-backed document, with MCP/CLI inspection, checking, rendering and headless support. MPL-2.0. Current desktop downloads target Apple Silicon macOS and Windows x64. Distinct from the older diffusionstudio/agent framework.

A contributor reports that the original Windows build and handshake defects were fixed on main and v0.206.0; the reporter intended to retest, while source-checkout auto-launch remained a limitation. Other threads request Linux and browser support; a linked partial implementation does not establish a released feature.

Selected discussions: [bug thread](https://github.com/diffusionstudio/editor/issues/82); [feature thread](https://github.com/diffusionstudio/editor/issues/40); [feature thread](https://github.com/diffusionstudio/editor/issues/52).

<a id="fireredteam-firered-openstoryline-0-1331-log-score"></a>

<a id="fireredteam-firered-openstoryline-0-2349-log-score"></a>

## FireRedTeam/FireRed-OpenStoryline: 0.2349 Slop Log Score

The repository is categorized here as conversational editing orchestrator. Media search and segmentation, story planning, narration/music and conversational cut/swap/resequence operations, plus reusable style and speech rough-cut skills. Apache-2.0 and Python-based. Optional AI transitions use third-party services with documented cost/result uncertainty. Do not present TODO items as shipped features.

Two support threads describe conversation startup errors and investigation of proxy or MCP connectivity. One user reports a workaround while others still fail; the selected provider request does not establish a shipped integration.

Selected discussions: [support thread](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/30); [support thread](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/76); [feature thread](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/104).

<a id="hypit-ai-hypit-0-2021-log-score"></a>

## hypit-ai/hypit: 0.2021 Slop Log Score

The repository is categorized here as Video workflow compiler. Agent-readable language anchors footage/captions/B-roll/effects to spoken words, supports variants and code-rendered graphics. License restricts multi-tenant SaaS, redistribution and branding; expressly permits own-organization/client work.

One thread asks about strict source-video editing and billing without having submitted a generation. A caption-render report awaits a requested retest, while a separate user reports exhausting a token allowance before render; its cause remained unresolved.

Selected discussions: [support/capability clarification thread](https://github.com/hypit-ai/hypit/issues/432); [bug/render awaiting retest thread](https://github.com/hypit-ai/hypit/issues/330); [support/cost thread](https://github.com/hypit-ai/hypit/issues/270).

<a id="palmier-io-palmier-pro-0-1789-log-score"></a>

## palmier-io/palmier-pro: 0.1789 Slop Log Score

The repository is categorized here as desktop editor / historical source. Swift-native macOS timeline with local MCP so coding agents can edit the same project; generation is optional. GPL source/releases extend only through v0.7.6 and last-gpl-source. Later binaries are proprietary and their source unpublished; new code contributions are not accepted. macOS 26+ on Apple Silicon.

A user reported a 4K/60 export hang and a contributor requested reproduction; there was no definitive fix confirmation. Another thread reports freezes with partial improvements discussed, while a third requests older macOS and Intel support.

Selected discussions: [bug thread](https://github.com/palmier-io/palmier-pro/issues/68); [bug thread](https://github.com/palmier-io/palmier-pro/issues/58); [feature thread](https://github.com/palmier-io/palmier-pro/issues/14).

<a id="velornlabs-velorn-0-1642-log-score"></a>

## VelornLabs/velorn: 0.1642 Slop Log Score

The repository is categorized here as desktop editor / generation workstation. Multitrack editing, captions, effects and exports with local MCP frame inspection, preview-first edits and undo; generation workflows use ComfyUI. GPL-3.0. Editing/export/MCP do not require ComfyUI, but current generation does. Filesystem and import/export operations are not universally undoable.

A user confirmed the original reference-free keyframe issue was fixed in v0.3.8. A separate optional-image workflow remains a follow-up; other threads request gap-fill and editing conveniences without establishing that every requested feature has shipped.

Selected discussions: [bug thread](https://github.com/VelornLabs/velorn/issues/77); [feature thread](https://github.com/VelornLabs/velorn/issues/57); [feature thread](https://github.com/VelornLabs/velorn/issues/55).

<a id="openfilm-openfilm-0-1518-log-score"></a>

## openfilm/openfilm: 0.1518 Slop Log Score

The repository is categorized here as Editor/composition system. Coding agents edit film.html; Studio supplies timeline and element editing for footage, audio and programmable graphics. Node 22.2+, FFmpeg and Chromium are documented prerequisites. A good code-driven composition reference, but not tested hands-on in this audit.

One report says Studio closes a project when film.html temporarily disappears during an agent edit; a maintainer acknowledged the recovery concern, but the later fix was not verified shipped. A version mismatch report remained under investigation, and another thread concerns usability requests.

Selected discussions: [bug thread](https://github.com/openfilm/openfilm/issues/304); [integration report thread](https://github.com/openfilm/openfilm/issues/290); [enhancement/usability thread](https://github.com/openfilm/openfilm/issues/230).

<a id="0xsline-openchatcut-0-1493-log-score"></a>

## 0xsline/OpenChatCut: 0.1493 Slop Log Score

The repository is categorized here as local conversational timeline editor. External MCP and built-in agents share an editable multitrack project with transcript cuts, captions, effects, keyframes and Remotion rendering. AGPL-3.0-or-later. Do not conflate the separate Pro desktop offering with the public-source edition. Test, lint and build commands are documented.

A user later confirmed Whisper works after fixes discussed in the thread, while raising separate agent, subtitle and preview complaints that remain unconfirmed. Another request concerns larger models; the owner says one model shipped, with a different backend still unsupported.

Selected discussions: [bug thread](https://github.com/0xsline/OpenChatCut/issues/120); [feature thread](https://github.com/0xsline/OpenChatCut/issues/155); [feature thread](https://github.com/0xsline/OpenChatCut/issues/127).

<a id="hetpatel-11-adobe-premiere-pro-mcp-0-0990-log-score"></a>

## hetpatel-11/Adobe_Premiere_Pro_MCP: 0.0990 Slop Log Score

The repository is categorized here as Premiere Pro integration. Local MCP connects to a CEP panel and ExtendScript for timeline operations, audio keyframes/ducking and Media Encoder export. MIT. Requires installed Premiere and Node. CEP is supported; UXP is experimental. Installer changes to debug/client settings need deliberate review, not automatic execution.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="ronak-create-fablecut-0-0882-log-score"></a>

## ronak-create/FableCut: 0.0882 Slop Log Score

The repository is categorized here as Browser editor. JSON-timeline browser editor with REST/MCP, clips, effects, transitions and keyframes. Node test scripts are present. Agent control is not the same as agent vision: frame/contact-sheet inspection remains an open feature request.

The selected discussions cover a proposed Rive integration, Node runtime and CI policy, and frame-inspection tools. A contributor demo is not proof that an integration has shipped.

Selected discussions: [feature thread](https://github.com/ronak-create/FableCut/issues/62); [maintenance thread](https://github.com/ronak-create/FableCut/issues/64); [feature thread](https://github.com/ronak-create/FableCut/issues/5).

<a id="akmessi-vex-0-0583-log-score"></a>

## AKMessi/vex: 0.0583 Slop Log Score

The repository is categorized here as Terminal editing agent. LLM tool-loop for footage copying, trim/merge/audio/captions and timeline history; optional visual-generation backends. README excludes internal business/revenue workflows without separate commercial licensing.

One thread contains a requested montage and another asks for output examples. Neither proves the requested capabilities work or fail.

Selected discussions: [support/task request thread](https://github.com/AKMessi/vex/issues/52); [documentation/feature thread](https://github.com/AKMessi/vex/issues/17).

<a id="mvp2o-ai-cuttingfloor-0-0555-log-score"></a>

## Mvp2o-ai/cuttingfloor: 0.0555 Slop Log Score

The repository is categorized here as Headless editing engine. MCP editor for importing footage, granular timeline operations, previews and exports; each edit returns an immutable timeline ID. Docker packages FFmpeg/MLT. Documented 24-hour timeline and seven-day media/export cache lifetimes matter for unattended workflows. License verified in develop/LICENSE.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="martindelophy-ai-video-editor-0-0458-log-score"></a>

## MartinDelophy/ai-video-editor: 0.0458 Slop Log Score

The repository is categorized here as Local editor and skill. Shared timeline and Codex skill for scene/transcript analysis and plans, with editable Jianying export and compatibility reports. Mixed app also contains avatar features; optional macOS host/runtime requirements.

The sampled discussions suggest model optimization, request contributor-guide translation and track a digital-human research spike. They are not evidence that the proposed changes have been completed.

Selected discussions: [feature/optimization suggestion thread](https://github.com/MartinDelophy/ai-video-editor/issues/119); [documentation thread](https://github.com/MartinDelophy/ai-video-editor/issues/55); [umbrella/research thread](https://github.com/MartinDelophy/ai-video-editor/issues/54).

<a id="kyanitelabs-kinocut-0-0333-log-score"></a>

## KyaniteLabs/kinocut: 0.0333 Slop Log Score

The repository is categorized here as headless editing toolkit. Typed FFmpeg tools through MCP, Python and CLI for trimming, captions and repurposing, with provenance receipts, preflight and release checks. Apache-2.0. Requires Python and FFmpeg; HyperFrames/Whisper are optional. Canonical rename of mcp-video, not an additional independent product.

The selected mirror thread concerns a synchronization policy gate, not rendering. A separate umbrella tracks verification gates and unreleased fixes, while a tool-discovery proposal is not on the current roadmap according to a member.

Selected discussions: [support thread](https://github.com/KyaniteLabs/kinocut/issues/488); [umbrella thread](https://github.com/KyaniteLabs/kinocut/issues/476); [feature thread](https://github.com/KyaniteLabs/kinocut/issues/591).

<a id="samuelgursky-davinci-resolve-mcp-0-0111-log-score"></a>

## samuelgursky/davinci-resolve-mcp: 0.0111 Slop Log Score

The repository is categorized here as DaVinci Resolve integration. MCP bridge to Resolve's scripting APIs for timeline/media organization, rendering, review markers, grading, Fusion and Fairlight. MIT. Compatibility is edition- and version-sensitive: current docs describe a Free-edition bridge but warn that Free 21.1 removed Python from its Scripts menu. Avoid blanket Free/Studio claims.

A reporter confirmed a guard against an earlier timeline-application problem; the owner said later timeline generation still awaited live confirmation. The other selected threads concern CVE assignment for an already fixed advisory and an unattributed CPU report.

Selected discussions: [bug thread](https://github.com/samuelgursky/davinci-resolve-mcp/issues/318); [support thread](https://github.com/samuelgursky/davinci-resolve-mcp/issues/316); [support thread](https://github.com/samuelgursky/davinci-resolve-mcp/issues/290).

<a id="dziksu-synkinema-0-0110-log-score"></a>

## dziksu/synkinema: 0.0110 Slop Log Score

The repository is categorized here as Local editor and headless engine. Studio and REST/MCP/CLI share project history. A local gateway connects installed coding agents and a containerized backend renders. Docker support alone does not verify a working Coolify deployment; launcher and authentication prerequisites still apply.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="mattppal-mcut-0-0107-log-score"></a>

## mattppal/mcut: 0.0107 Slop Log Score

The repository is categorized here as editing SDK and desktop studio. TypeScript headless timeline engine with serializable commands, undo/redo, rendering, transcription adapters, CLI/MCP and Electron Studio. Apache-2.0. Alpha packages and unstable APIs. Current GitHub documentation says Studio ships on macOS/Linux; the older mcut.io waitlist claim is stale.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="orellbuehler-kerf-0-0057-log-score"></a>

## OrellBuehler/kerf: 0.0057 Slop Log Score

The repository is categorized here as Desktop editor. Rust/Tauri editor with MCP, frame/contact-sheet tools, timeline previews and staged agent proposals for human review. Source-available under a noncommercial license, not unrestricted open source. GitHub metadata says NOASSERTION, but the actual LICENSE.md identifies the license.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="naman-sharma12345-kimo-0-0000-log-score"></a>

## naman-sharma12345/kimo: 0.0000 Slop Log Score

The repository is categorized here as Headless editing engine. Rust/C++ engine exposed through MCP and CLI for cutting, grading, keyframes and export. The spectator is read-only, not an editing GUI. FFmpeg is required. Linux has the clearest tested path; Windows CI is not hardware validation and macOS is described as untested.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

## What the Slop Benchmark says overall

All 21 repositories shown have a calculable score. Release-less projects are scored on B alone, so their scores are not directly comparable to a two-measure average. Release counts also reflect different publishing practices: mcut includes 195 prereleases in 206 records, while the Resolve MCP repository has 486 published releases.

Licenses and product boundaries matter alongside the numbers. Kerf and Vex use PolyForm Noncommercial; Hypit uses a modified Apache license with restrictions. Palmier's public GPL source ends at v0.7.6/last-gpl-source, while later binaries are proprietary. Review current licenses, dependencies and the specific issue threads that intersect with your workflow before adoption.
