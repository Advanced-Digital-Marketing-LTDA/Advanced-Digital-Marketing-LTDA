---
title: "The Slop Benchmark: Comparing 38 Agentic Video Repositories"
meta_title: "Slop Benchmark: 38 Agentic Video Repositories Compared"
meta_description: "A GitHub backlog and activity comparison of 38 agentic video repositories, with a chart and a review of selected issue threads."
published: "2026-10-30"
updated: "2026-10-30"
---

A project can have millions of stars and still make you spend your afternoon debugging it. The Slop Benchmark is a blunt way to compare visible public backlog with release and merged pull request activity. It is not a code-quality score, a security audit, or a prediction that a project will fail. It is a quick pressure gauge—then we look at selected open issues to understand what the discussions represent.

## What the ratio can and cannot say

The 38 independent repositories include editors, headless engines, commercial-editor bridges, agent skills and research or production frameworks. They are not interchangeable full video editors. No repository was installed or executed for this comparison; capabilities below are documentation claims, not tested behavior.

The score snapshot was collected October 30, 2026, 15:32:03–15:35:40 UTC, with batch labels 15:34 and 15:36 UTC. The collection is sequential, not atomic. Open issues exclude PRs. Published GitHub release records include prereleases and exclude drafts. Open PRs include drafts; PRs closed without merging are listed separately and excluded from B's denominator.

> **A = open issues ÷ published releases**
>
> **B = (open issues + open PRs) ÷ lifetime merged PRs**
>
> **C = (A + B) ÷ 2; Slop Log Score = log10(1 + C)**

If there are no releases but B exists, C = B/2. This intentionally halves B; it does not mean the missing A is zero. If B is undefined because no PRs have been merged, the Slop Log Score is N/A even if A exists. N/A is not zero. Calculations use unrounded ratios; components are displayed to two decimals and the Slop Log Score to four. Lower indicates less public backlog relative to these denominators, not proof of reliable editing. Release practices, issue types and project age affect the score.

For the qualitative check, up to three currently open issues updated since April 30 were selected per repository, excluding PRs, sorted by comment count then issue number descending. Issue bodies and available comments were reviewed on October 30; the video-use issue counters exceeded the comments returned by the endpoint, for reasons unknown, so this is not a claim of complete historical comment coverage. Open threads include support, proposals and administrative noise as well as reports; no qualifying thread does not mean bug-free software.

## The comparison table

The basis column distinguishes two available measures from the release-less fallback. Stars are context, not a score input.

| Project | Category | GitHub stars | Open issues | Open PRs | Merged PRs | Closed unmerged | Releases | A | B | C | Slop Log Score | Basis |
|:--|:--|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|:--|
| [HKUDS/VideoAgent](https://github.com/HKUDS/VideoAgent) | Research system | 1,981 | 12 | 2 | 1 | 1 | 0 | N/A | 14.00 | 7.00 | 0.9031 | B/2 |
| [browser-use/video-use](https://github.com/browser-use/video-use) | footage-editing skill | 30,139 | 35 | 127 | 14 | 25 | 0 | N/A | 11.57 | 5.79 | 0.8316 | B/2 |
| [MBehtemam/Montagent](https://github.com/MBehtemam/Montagent) | headless editing engine | 3 | 74 | 0 | 421 | 6 | 9 | 8.22 | 0.18 | 4.20 | 0.7159 | A + B |
| [video-db/Director](https://github.com/video-db/Director) | Cloud production orchestrator | 1,568 | 8 | 13 | 120 | 27 | 1 | 8.00 | 0.18 | 4.09 | 0.7065 | A + B |
| [GVCLab/CutClaw](https://github.com/GVCLab/CutClaw) | Research system | 993 | 4 | 0 | 1 | 0 | 0 | N/A | 4.00 | 2.00 | 0.4771 | B/2 |
| [Dakkshin/after-effects-mcp](https://github.com/Dakkshin/after-effects-mcp) | After Effects compositing integration | 822 | 9 | 17 | 7 | 8 | 0 | N/A | 3.71 | 1.86 | 0.4559 | B/2 |
| [UniVA-Verse/UniVA](https://github.com/UniVA-Verse/UniVA) | research generalist | 539 | 3 | 0 | 1 | 0 | 0 | N/A | 3.00 | 1.50 | 0.3979 | B/2 |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Broad production orchestrator | 73,231 | 114 | 303 | 153 | 157 | 0 | N/A | 2.73 | 1.36 | 0.3734 | B/2 |
| [veedstudio/open-edit](https://github.com/veedstudio/open-edit) | code-driven editing pipeline | 1,754 | 2 | 1 | 23 | 1 | 1 | 2.00 | 0.13 | 1.07 | 0.3150 | A + B |
| [Aepzie/cutline](https://github.com/Aepzie/cutline) | Browser editor | 1 | 5 | 6 | 22 | 4 | 4 | 1.25 | 0.50 | 0.88 | 0.2730 | A + B |
| [diffusionstudio/editor](https://github.com/diffusionstudio/editor) | code-backed desktop editor | 3,436 | 20 | 22 | 46 | 9 | 29 | 0.69 | 0.91 | 0.80 | 0.2556 | A + B |
| [WeftCut/WeftCut](https://github.com/WeftCut/WeftCut) | Desktop editor | 293 | 14 | 0 | 17 | 26 | 25 | 0.56 | 0.82 | 0.69 | 0.2283 | A + B |
| [hypit-ai/hypit](https://github.com/hypit-ai/hypit) | Video workflow compiler | 26,790 | 24 | 53 | 260 | 35 | 27 | 0.89 | 0.30 | 0.59 | 0.2021 | A + B |
| [palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro) | desktop editor / historical source | 14,662 | 66 | 34 | 360 | 78 | 89 | 0.74 | 0.28 | 0.51 | 0.1789 | A + B |
| [VelornLabs/velorn](https://github.com/VelornLabs/velorn) | desktop editor / generation workstation | 518 | 21 | 5 | 44 | 8 | 64 | 0.33 | 0.59 | 0.46 | 0.1642 | A + B |
| [openfilm/openfilm](https://github.com/openfilm/openfilm) | Editor/composition system | 3,721 | 10 | 4 | 207 | 27 | 13 | 0.77 | 0.07 | 0.42 | 0.1518 | A + B |
| [0xsline/OpenChatCut](https://github.com/0xsline/OpenChatCut) | local conversational timeline editor | 2,796 | 14 | 11 | 78 | 29 | 28 | 0.50 | 0.32 | 0.41 | 0.1493 | A + B |
| [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | conversational editing orchestrator | 3,596 | 22 | 11 | 46 | 14 | 0 | N/A | 0.72 | 0.36 | 0.1331 | B/2 |
| [BeatAPI/BeatDesign](https://github.com/BeatAPI/BeatDesign) | local canvas and timeline editor | 279 | 2 | 1 | 25 | 0 | 5 | 0.40 | 0.12 | 0.26 | 0.1004 | A + B |
| [hetpatel-11/Adobe_Premiere_Pro_MCP](https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP) | Premiere Pro integration | 783 | 0 | 21 | 41 | 9 | 20 | 0.00 | 0.51 | 0.26 | 0.0990 | A + B |
| [ronak-create/FableCut](https://github.com/ronak-create/FableCut) | Browser editor | 771 | 7 | 1 | 130 | 2 | 18 | 0.39 | 0.06 | 0.23 | 0.0882 | A + B |
| [pireel/pireel](https://github.com/pireel/pireel) | browser timeline editor | 1,332 | 2 | 0 | 5 | 1 | 0 | N/A | 0.40 | 0.20 | 0.0792 | B/2 |
| [mhadifilms/dvr](https://github.com/mhadifilms/dvr) | DaVinci Resolve integration | 15 | 2 | 0 | 7 | 1 | 23 | 0.09 | 0.29 | 0.19 | 0.0742 | A + B |
| [deonmenezes/edit-ai](https://github.com/deonmenezes/edit-ai) | Editor and agent harness | 2 | 3 | 2 | 16 | 1 | 0 | N/A | 0.31 | 0.16 | 0.0631 | B/2 |
| [AKMessi/vex](https://github.com/AKMessi/vex) | Terminal editing agent | 96 | 3 | 2 | 50 | 4 | 16 | 0.19 | 0.10 | 0.14 | 0.0583 | A + B |
| [Mvp2o-ai/cuttingfloor](https://github.com/Mvp2o-ai/cuttingfloor) | Headless editing engine | 0 | 0 | 12 | 44 | 7 | 35 | 0.00 | 0.27 | 0.14 | 0.0555 | A + B |
| [MartinDelophy/ai-video-editor](https://github.com/MartinDelophy/ai-video-editor) | Local editor and skill | 924 | 5 | 0 | 82 | 0 | 31 | 0.16 | 0.06 | 0.11 | 0.0458 | A + B |
| [KyaniteLabs/kinocut](https://github.com/KyaniteLabs/kinocut) | headless editing toolkit | 232 | 7 | 4 | 440 | 60 | 52 | 0.13 | 0.03 | 0.08 | 0.0333 | A + B |
| [diffusionstudio/agent](https://github.com/diffusionstudio/agent) | older code-composition agent | 297 | 1 | 0 | 17 | 0 | 0 | N/A | 0.06 | 0.03 | 0.0126 | B/2 |
| [samuelgursky/davinci-resolve-mcp](https://github.com/samuelgursky/davinci-resolve-mcp) | DaVinci Resolve integration | 3,855 | 4 | 3 | 161 | 44 | 486 | 0.01 | 0.04 | 0.03 | 0.0111 | A + B |
| [dziksu/synkinema](https://github.com/dziksu/synkinema) | Local editor and headless engine | 18 | 0 | 4 | 78 | 34 | 21 | 0.00 | 0.05 | 0.03 | 0.0110 | A + B |
| [mattppal/mcut](https://github.com/mattppal/mcut) | editing SDK and desktop studio | 7 | 0 | 10 | 201 | 12 | 206 | 0.00 | 0.05 | 0.02 | 0.0107 | A + B |
| [OrellBuehler/kerf](https://github.com/OrellBuehler/kerf) | Desktop editor | 10 | 0 | 6 | 227 | 19 | 37 | 0.00 | 0.03 | 0.01 | 0.0057 | A + B |
| [CanadaApollo6/Kinewright](https://github.com/CanadaApollo6/Kinewright) | Native editor | 8 | 0 | 0 | 17 | 0 | 0 | N/A | 0.00 | 0.00 | 0.0000 | B/2 |
| [DareDev256/fcp-mcp-server](https://github.com/DareDev256/fcp-mcp-server) | Final Cut Pro XML integration | 130 | 0 | 0 | 14 | 0 | 43 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |
| [matrodrigs/shotcut-mcp](https://github.com/matrodrigs/shotcut-mcp) | Shotcut integration | 24 | 0 | 0 | 6 | 0 | 17 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |
| [naman-sharma12345/kimo](https://github.com/naman-sharma12345/kimo) | Headless editing engine | 20 | 0 | 0 | 38 | 2 | 5 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |
| [Remocn/remocn-studio](https://github.com/Remocn/remocn-studio) | Agent-directed code composition | 209 | 0 | 0 | 23 | 0 | 4 | 0.00 | 0.00 | 0.00 | 0.0000 | A + B |

## The ratio graphic

The chart uses the same scores as the table. The table is the exact lookup, while the bars make the spread easier to see. On a narrow screen, the chart is arranged vertically for easier reading. You can also [open the full-size chart](/images/blog/agentic-video-benchmark.svg).

![Slop Log Scores for 38 agentic video repositories, October 30, 2026](/images/blog/agentic-video-benchmark.svg)

## Project-by-project issue review

The score is a screening signal, not a verdict on maintainers or users. The linked discussions below reflect the selected sample and do not establish the prevalence or present status of reported problems.

<a id="hkuds-videoagent-0-9031-log-score"></a>

## HKUDS/VideoAgent: 0.9031 Slop Log Score

The repository is categorized here as Research system. Paper-backed Python research agent translating intent into workflows and tool plans with feedback. Includes clipping, assembly and remixing alongside generation. Evaluate separately from end-user editors; claims of professional quality are not validated by this audit.

The sampled directory discussion concerns a third-party site, not a VideoAgent runtime error. A separate dependency report alleges differing package resolution; it has no visible maintainer reply. The dataset-hosting invitation is community discussion, not a defect.

Selected discussions: [third-party promotion/support thread](https://github.com/HKUDS/VideoAgent/issues/14); [bug/dependency report thread](https://github.com/HKUDS/VideoAgent/issues/16); [community/dataset distribution thread](https://github.com/HKUDS/VideoAgent/issues/11).

<a id="browser-use-video-use-0-8316-log-score"></a>

## browser-use/video-use: 0.8316 Slop Log Score

The repository is categorized here as footage-editing skill. Coding-agent skill turns a raw-footage folder into a transcript/EDL and FFmpeg MP4, with filmstrip/waveform inspection and bounded self-evaluation repairs. MIT. The documented transcription setup requires an ElevenLabs API key; this is not a timeline GUI.

The selected threads include off-topic material and a video-creation request; they do not establish a software defect. Available comment responses were fewer than the displayed counters, for reasons unknown.

Selected threads: [#101](https://github.com/browser-use/video-use/issues/101), [#74](https://github.com/browser-use/video-use/issues/74), and [#33](https://github.com/browser-use/video-use/issues/33).

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

<a id="gvclab-cutclaw-0-4771-log-score"></a>

## GVCLab/CutClaw: 0.4771 Slop Log Score

The repository is categorized here as Research system. Long footage and music feed structured descriptions, multi-agent shot planning, checks and rendering. CLI/Streamlit interfaces; Python 3.12 and recommended GPU decoding. MCP is on the roadmap, not a verified current capability. A clear license was not established.

A collaborator said only one source video had been tested, while multiple sources might be supported in principle. The other discussions request a multicamera workflow and describe experimental beat segmentation omitted for stability; they do not establish released capabilities.

Selected discussions: [feature thread](https://github.com/GVCLab/CutClaw/issues/10); [support/capability thread](https://github.com/GVCLab/CutClaw/issues/8); [support/feature thread](https://github.com/GVCLab/CutClaw/issues/5).

<a id="dakkshin-after-effects-mcp-0-4559-log-score"></a>

## Dakkshin/after-effects-mcp: 0.4559 Slop Log Score

The repository is categorized here as After Effects compositing integration. MCP and ExtendScript control compositions, layers, text, shapes, masks, properties, keyframes and animation in installed After Effects. MIT. A compositing bridge, not an independent footage-editing NLE. Its documented Node minimum is old; last push April 1, 2026.

Users report a blank bridge panel, with a proposed fix but no maintainer-confirmed release resolution. Another thread reports a preset path exposure at a particular commit; it was not independently reproduced. A selected promotional post is not defect evidence.

Selected discussions: [bug thread](https://github.com/Dakkshin/after-effects-mcp/issues/7); [bug thread](https://github.com/Dakkshin/after-effects-mcp/issues/43); [other thread](https://github.com/Dakkshin/after-effects-mcp/issues/39).

<a id="univa-verse-univa-0-3979-log-score"></a>

## UniVA-Verse/UniVA: 0.3979 Slop Log Score

The repository is categorized here as research generalist. Plan/act agent architecture with MCP processing, editing and generation tools, Python backend and timeline UI; understanding/segmentation guide edits. MIT. Canonical redirect from univa-agent/univa. Research system with provider/local-model dependencies, not a proven consumer NLE; frontend adapted from OpenCut.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="calesthio-openmontage-0-3734-log-score"></a>

## calesthio/OpenMontage: 0.3734 Slop Log Score

The repository is categorized here as Broad production orchestrator. Agentic system spanning research, scripts, assets, editing and composition. Its README documents real motion clips placed on a timeline and rendered, alongside generated assets. It includes storyboard approval and local review. Broader than an NLE, with pipeline-specific provider costs and authentication.

The most-commented selected issue hosts trailer attachments; another recruits reviewers. The Hermes integration thread contains differing reports, including a successful preflight and a later workflow concern, without a final maintainer resolution.

Selected discussions: [administrative/media upload thread](https://github.com/calesthio/OpenMontage/issues/1); [community/reviewer recruitment thread](https://github.com/calesthio/OpenMontage/issues/149); [support/integration thread](https://github.com/calesthio/OpenMontage/issues/165).

<a id="veedstudio-open-edit-0-3150-log-score"></a>

## veedstudio/open-edit: 0.3150 Slop Log Score

The repository is categorized here as code-driven editing pipeline. CLI and agent skill for word-timed captions and HTML-to-video, with headless Chrome rendering, partial rerenders, still/contact-sheet output and audio muxing. Apache-2.0. Current source documents its Chrome renderer; older claims of a required closed VEED renderer are stale. Transcription can be local or hosted.

The selected discussion asks about Windows signing and offline compatibility and reports a startup failure. A responder says no signed build is available and the offline flow is untested; their project authority was not independently established.

Selected discussions: [support thread](https://github.com/veedstudio/open-edit/issues/25).

<a id="aepzie-cutline-0-2730-log-score"></a>

## Aepzie/cutline: 0.2730 Slop Log Score

The repository is categorized here as Browser editor. Browser NLE and MCP share typed operations over a declarative timeline. Documents trim/split/ripple, captions, keyframes, overlays and transcription. The demo is still a placeholder and some advertised capabilities also appear on the roadmap; this audit does not establish feature completeness.

The selected requests cover timeline waveforms, exposing asset removal in the editor UI, and retaining undo history after a server restart. They describe capability and persistence needs, not demonstrated export failures.

Selected discussions: [feature thread](https://github.com/Aepzie/cutline/issues/8); [feature/usability thread](https://github.com/Aepzie/cutline/issues/11); [feature/persistence thread](https://github.com/Aepzie/cutline/issues/10).

<a id="diffusionstudio-editor-0-2556-log-score"></a>

## diffusionstudio/editor: 0.2556 Slop Log Score

The repository is categorized here as code-backed desktop editor. Humans and agents edit real footage through the same code-backed document, with MCP/CLI inspection, checking, rendering and headless support. MPL-2.0. Current desktop downloads target Apple Silicon macOS and Windows x64. Distinct from the older diffusionstudio/agent framework.

A contributor reports that the original Windows build and handshake defects were fixed on main and v0.206.0; the reporter intended to retest, while source-checkout auto-launch remained a limitation. Other threads request Linux and browser support; a linked partial implementation does not establish a released feature.

Selected discussions: [bug thread](https://github.com/diffusionstudio/editor/issues/82); [feature thread](https://github.com/diffusionstudio/editor/issues/40); [feature thread](https://github.com/diffusionstudio/editor/issues/52).

<a id="weftcut-weftcut-0-2283-log-score"></a>

## WeftCut/WeftCut: 0.2283 Slop Log Score

The repository is categorized here as Desktop editor. Desktop NLE with local MCP, a shared human/agent timeline, captions, keyframes, audio, checkpoints and dry runs. Explicitly pre-1.0. Cross-platform CI and test documentation exist; the MCP connection helper is not evidence of a standalone headless renderer.

A reporter confirmed long-video sampling improvements in v0.5.2 and a maintainer described further controls in v0.5.5. Other threads track preview performance research and broader v1 acceptance; an open umbrella is not one unresolved defect.

Selected discussions: [resolved subproblems in thread but open thread](https://github.com/WeftCut/WeftCut/issues/69); [umbrella/performance thread](https://github.com/WeftCut/WeftCut/issues/62); [umbrella thread](https://github.com/WeftCut/WeftCut/issues/11).

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

<a id="fireredteam-firered-openstoryline-0-1331-log-score"></a>

## FireRedTeam/FireRed-OpenStoryline: 0.1331 Slop Log Score

The repository is categorized here as conversational editing orchestrator. Media search and segmentation, story planning, narration/music and conversational cut/swap/resequence operations, plus reusable style and speech rough-cut skills. Apache-2.0 and Python-based. Optional AI transitions use third-party services with documented cost/result uncertainty. Do not present TODO items as shipped features.

Two support threads describe conversation startup errors and investigation of proxy or MCP connectivity. One user reports a workaround while others still fail; the selected provider request does not establish a shipped integration.

Selected discussions: [support thread](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/30); [support thread](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/76); [feature thread](https://github.com/FireRedTeam/FireRed-OpenStoryline/issues/104).

<a id="beatapi-beatdesign-0-1004-log-score"></a>

## BeatAPI/BeatDesign: 0.1004 Slop Log Score

The repository is categorized here as local canvas and timeline editor. Shared canvas and editor with MCP for trimming, splitting, moving, audio mixing, image overlays, captions and MP4 rendering. Apache-2.0. Published v0.2.5 has 30 tools versus 38 in unreleased source. Local editing needs no API key; generation/analysis does. Do not imply advanced transitions or desktop packaging are already shipped.

The selected discussions propose external providers or partnerships; one author explicitly had not validated the full workflow. They are not defect evidence.

Selected discussions: [feature thread](https://github.com/BeatAPI/BeatDesign/issues/34); [feature thread](https://github.com/BeatAPI/BeatDesign/issues/19).

<a id="hetpatel-11-adobe-premiere-pro-mcp-0-0990-log-score"></a>

## hetpatel-11/Adobe_Premiere_Pro_MCP: 0.0990 Slop Log Score

The repository is categorized here as Premiere Pro integration. Local MCP connects to a CEP panel and ExtendScript for timeline operations, audio keyframes/ducking and Media Encoder export. MIT. Requires installed Premiere and Node. CEP is supported; UXP is experimental. Installer changes to debug/client settings need deliberate review, not automatic execution.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="ronak-create-fablecut-0-0882-log-score"></a>

## ronak-create/FableCut: 0.0882 Slop Log Score

The repository is categorized here as Browser editor. JSON-timeline browser editor with REST/MCP, clips, effects, transitions and keyframes. Node test scripts are present. Agent control is not the same as agent vision: frame/contact-sheet inspection remains an open feature request.

The selected discussions cover a proposed Rive integration, Node runtime and CI policy, and frame-inspection tools. A contributor demo is not proof that an integration has shipped.

Selected discussions: [feature thread](https://github.com/ronak-create/FableCut/issues/62); [maintenance thread](https://github.com/ronak-create/FableCut/issues/64); [feature thread](https://github.com/ronak-create/FableCut/issues/5).

<a id="pireel-pireel-0-0792-log-score"></a>

## pireel/pireel: 0.0792 Slop Log Score

The repository is categorized here as browser timeline editor. Local canvas and timeline editing with captions, graphics, audio and export. External agents connect through a separate public plugin. AGPL-3.0-only editor and separately licensed Apache plugin. Hosted chat and connected-service features should not be assumed available in the self-hosted edition.

The two selected threads propose optional research context and a model-router provider. Neither establishes that those integrations are implemented.

Selected discussions: [feature thread](https://github.com/pireel/pireel/issues/6); [feature thread](https://github.com/pireel/pireel/issues/7).

<a id="mhadifilms-dvr-0-0742-log-score"></a>

## mhadifilms/dvr: 0.0742 Slop Log Score

The repository is categorized here as DaVinci Resolve integration. Typed Python library, CLI and MCP for declarative editing, color and delivery, with structured JSON and connection diagnostics. MIT. Requires running Resolve. The maintainer's stable-from-1.0 claim is not a hands-on result; edition compatibility needs per-version checking.

Two environment-specific reports describe a Resolve gallery API TypeError and an audio-track argument-order issue. Neither has a confirmed fix in the sampled comments, and neither was independently reproduced.

Selected discussions: [bug thread](https://github.com/mhadifilms/dvr/issues/10); [bug thread](https://github.com/mhadifilms/dvr/issues/7).

<a id="deonmenezes-edit-ai-0-0631-log-score"></a>

## deonmenezes/edit-ai: 0.0631 Slop Log Score

The repository is categorized here as Editor and agent harness. TrueForge harness, browser timeline and MCP editing tools; silence removal, captions, beat cuts and resumable sessions. Separate services/provider credentials, optional sandbox; approval claims are not independently tested.

The selected threads concern bot-verdict test coverage, demo connector configuration and merge-workflow architecture. They do not establish a video-render failure.

Selected discussions: [maintenance/test coverage thread](https://github.com/deonmenezes/edit-ai/issues/19); [maintenance/configuration thread](https://github.com/deonmenezes/edit-ai/issues/18); [maintenance/architecture thread](https://github.com/deonmenezes/edit-ai/issues/17).

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

<a id="diffusionstudio-agent-0-0126-log-score"></a>

## diffusionstudio/agent: 0.0126 Slop Log Score

The repository is categorized here as older code-composition agent. Python VideoComposerAgent retrieves semantic documentation and creates compositions against Diffusion Studio APIs. MIT. Last push February 10, 2025. It is an older framework, not the current desktop editor; MCP integration remains on its README's TODO list.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

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

<a id="canadaapollo6-kinewright-0-0000-log-score"></a>

## CanadaApollo6/Kinewright: 0.0000 Slop Log Score

The repository is categorized here as Native editor. Native Rust Windows/Linux editor where CLI agents use the same editing operations and undo stack as the GUI. Documents footage, transcript editing, grading, mixing and export. Explicitly early development; full-rate 1080p preview is not yet achieved according to its README.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="daredev256-fcp-mcp-server-0-0000-log-score"></a>

## DareDev256/fcp-mcp-server: 0.0000 Slop Log Score

The repository is categorized here as Final Cut Pro XML integration. Reads, edits and generates FCPXML for trims, splits, silence removal, rough cuts, keyframes, speed ramps and transcript edits; optional macOS live mode. MIT. Journaled writes, hash guards and undo are documented. Media inspection differs from XML-only views. Final Cut is a separate paid host application.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="matrodrigs-shotcut-mcp-0-0000-log-score"></a>

## matrodrigs/shotcut-mcp: 0.0000 Slop Log Score

The repository is categorized here as Shotcut integration. Transactional MCP creates, edits, validates, previews and renders native MLT timelines, including tracks, transitions, titles, subtitles and contact sheets. MIT. Requires Python and Shotcut/MLT. Cross-platform CI does not establish real rendering on every platform; documented real-render integration is Windows-specific.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="naman-sharma12345-kimo-0-0000-log-score"></a>

## naman-sharma12345/kimo: 0.0000 Slop Log Score

The repository is categorized here as Headless editing engine. Rust/C++ engine exposed through MCP and CLI for cutting, grading, keyframes and export. The spectator is read-only, not an editing GUI. FFmpeg is required. Linux has the clearest tested path; Windows CI is not hardware validation and macOS is described as untested.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

<a id="remocn-remocn-studio-0-0000-log-score"></a>

## Remocn/remocn-studio: 0.0000 Slop Log Score

The repository is categorized here as Agent-directed code composition. Coding agents create editable Remotion projects with live preview, point-and-edit updates and staged review artifacts. Explicitly no conventional timeline/keyframe/track UI; macOS/Linux and external agent CLI.

No qualifying recent open issues were selected. This does not establish that the software is bug-free.

## What the Slop Benchmark says overall

All 38 repositories shown have a calculable score. Release-less projects with merged PRs use the explicitly halved B fallback, so their scores are not directly comparable to a complete two-measure average. Release counts also reflect different publishing practices: mcut includes 195 prereleases in 206 records, while the Resolve MCP repository has 486 published releases.

Licenses and product boundaries matter alongside the numbers. Kerf and Vex use PolyForm Noncommercial; Hypit uses a modified Apache license with restrictions. Palmier's public GPL source ends at v0.7.6/last-gpl-source, while later binaries are proprietary. Review current licenses, dependencies and the specific issue threads that intersect with your workflow before adoption.
