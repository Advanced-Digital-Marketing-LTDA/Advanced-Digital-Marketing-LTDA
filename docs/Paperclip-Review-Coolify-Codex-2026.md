---
title: "Paperclip review: My Coolify and Codex setup experience"
meta_title: "Paperclip review: Coolify and Codex setup"
meta_description: "My hands-on Paperclip review: organizing AI agents, connecting a Codex subscription, and troubleshooting Coolify deployment, accounting holds, and routines."
published: "2026-10-27"
updated: "2026-10-27"
---

**Author:** Andrew Philip Weilbacher, founder of Advanced Digital Marketing LTDA.

I wanted a team of AI agents that could help run my business.

I work across [client marketing accounts](/services/), software projects, research, content, and operations. I wanted agents that could share context, communicate, use my tools, and move work through a review process with permissions and approval gates.

That is what drew me to [Paperclip](https://github.com/paperclipai/paperclip).

I deployed it on Coolify, connected my Codex subscription, and started configuring agents. I got far enough to see the appeal. I also encountered deployment problems, plugin installation failures, accounting holds at $0 of recorded spending, and a built-in routine using the internal identifier `built-in-bundles` as its responsible human user.

Paperclip gave me useful ways to organize agents, but I spent too much time troubleshooting to rely on it for my business during this setup. I would treat it as an experiment until I can run and recover tasks reliably.

## What is Paperclip?

[Paperclip](https://github.com/paperclipai/paperclip) is a platform for organizing AI agents around company work. In my installation, it provided agents, tasks, routines, budgets, permissions, and run histories.

## What I liked about Paperclip

The biggest attraction was having a place to organize agents around actual business work.

In my installation, I could configure agents such as a CMO, an assistant, a copywriter, and a summarizer. Their settings included instructions, skills, runtime configuration, tools, permissions, and budgets. Tasks had histories, runs, failure details, and recovery information.

That structure matters to me. I want to know what an agent is working on, what it can access, what happened during a run, and where human intervention is needed.

Connecting my existing Codex subscription was another attraction. I wanted to use an account I already paid for rather than immediately introduce another usage-based API bill. I got the separate Daytona sign-in environment working after fixing npm cache permissions and installing the plugin’s build dependencies.

The diagnostic information was useful, too. Although some interface messages were vague, the detailed run records and accounting endpoint helped identify what was actually failing.

## Getting it accessible through Coolify

My first problem was a familiar deployment symptom: **Bad Gateway**.

I configured the domain and allowed hostname, but the application logs initially showed Paperclip listening on `127.0.0.1:3100` inside the container. Getting the application binding, deployment settings, and Coolify routing aligned became the first troubleshooting exercise.

Switching to an authenticated public deployment introduced another requirement: Paperclip refused to start with its embedded PostgreSQL database.

The error was explicit:

> authenticated public deployments require DATABASE_URL or config.database.connectionString

I needed to configure an external PostgreSQL connection before continuing.

I would separate these deployment requirements from the later bugs. A service requiring a particular network binding or database configuration is not inherently defective. But those requirements contributed to the effort needed to get my installation running.

## Subscription login took more setup

My public server environment did not support browser sign-in for the OpenAI subscription connection.

Paperclip displayed:

> This environment does not support browser sign-in.

I used Daytona, a sandbox provider, to create a separate environment for signing in. Installing its Paperclip plugin produced its own problems.

First, npm failed because its cache contained root-owned files. After addressing the permissions, the bundled plugin build failed with:

```text
tsc: not found
```

I eventually got the plugin installed and the environment working.

Then the Codex hello probe, a test that asks the agent to respond with “hello,” failed because the installed CLI was too old for the selected model. That required updating Codex in the environment where execution occurred.

By this point, I was managing database configuration, container networking, npm permissions, plugin build dependencies, sandbox environments, and CLI compatibility before reaching a workflow I could depend on.

## The most frustrating problem: blocked at $0

The accounting hold stopped me from resuming assigned work.

The interface showed **$0.00 in API spending**, but an agent was paused behind a budget incident. Attempts to resume work failed because accounting was incomplete.

The accounting health endpoint, a diagnostic URL listing unresolved usage records, showed:

```text
pendingRunCount: 4
unpricedEventCount: 0
```

`pendingRunCount` counts runs whose accounting is unfinished. `unpricedEventCount` counts recorded usage without a reliable price. All four pending runs were marked:

```text
waiting_for_receipt
```

Paperclip was waiting for final usage records. The displayed $0 represented known spending; it did not mean every run had finished accounting.

Holding work when spending is uncertain is understandable. The problem was that I could not find a straightforward way to resolve the missing receipts and continue.

I found an existing report, [issue #15649](https://github.com/paperclipai/paperclip/issues/15649), describing the same class of accounting hold, including October 24 follow-up reports involving Codex with ChatGPT subscriptions. Those reports describe related symptoms; they do not establish that my installation had the same underlying failure.

Increasing the budget did not resolve my hold. Disabling the setting that blocks unpriced usage did not help either, because my installation had missing receipts and no unpriced events.

That is a difficult experience for an operator: the system stops work as a precaution, but recovering from the stop becomes a separate debugging project.

## A built-in routine used an invalid user identity

The built-in Summarizer routine exposed another problem.

Its runs failed immediately with:

> The responsible user is not an active company member

The interface suggested reconnecting the selected AI account. However, the detailed result showed:

```json
"responsibleUserId": "built-in-bundles"
```

Paperclip was attempting to use an internal identifier as the responsible human user.

[Issue #12246](https://github.com/paperclipai/paperclip/issues/12246), filed on August 26, references earlier reports of built-in routines storing the same `built-in-bundles` identity. My run showed that value too, although I had not verified whether the underlying code path was identical.

The visible “Responsible” selector did not solve it: that selector offered agents, while the failing field concerned the human identity behind the run.

This was a good example of the gap between having diagnostic information and having an accessible recovery process. The underlying error was specific, but the account-reconnection message pointed me toward the wrong category of fix.

## My pros and cons

| Pros | Cons |
|---|---|
| A useful structure for organizing agents, tasks, and recurring work | Substantial setup effort in my Coolify deployment |
| Instructions, skills, tools, permissions, and budgets in one interface | Plugin installation required manual troubleshooting |
| A path to connecting my existing Codex subscription | Login and execution environments added complexity |
| Detailed run records helped reveal underlying failures | Some recovery messages were too generic |
| Task and run histories provided visibility into interrupted work | Missing accounting receipts prevented straightforward resumption |
| Built-in agents offered a starting point | A built-in routine carried an invalid responsible-user identity |

## Would I recommend Paperclip?

For someone who enjoys experimenting with agent infrastructure and is comfortable debugging it, I can see the appeal.

For my own business, I need the time saved by agents to outweigh the time spent maintaining their platform. During this setup, I had not reached that point.

I also used AI assistance to troubleshoot, and some of the guidance I received was incorrect. That added friction. I would not attribute every failed troubleshooting attempt to Paperclip itself.

But the missing-receipt holds and invalid built-in user identity were concrete problems supported by my installation’s output and related public reports.

I still want shared business tasks, oversight, and a visible history for my agents. Paperclip put those controls in one place, but I could not yet depend on its execution and recovery workflows.

What I need before relying on it is dependable execution and a clear way to recover when something fails. My experience showed promise on the organizational side, but too much unresolved friction on the operational side.

## Key takeaways

- Paperclip gives agents a shared structure for tasks and oversight.
- My Coolify deployment required an external PostgreSQL database and additional setup for subscription sign-in.
- Missing usage receipts and a built-in routine's invalid user identity blocked work in my installation.
- Detailed run and accounting information helped me investigate, but recovery remained difficult.

## Summary

Paperclip offers useful controls for managing an AI team. My self-hosted setup required enough troubleshooting that I could not yet depend on it for business work.

*This review describes my self-hosted setup experience on October 26–27, 2026. It is not a long-term evaluation of every Paperclip feature.*
