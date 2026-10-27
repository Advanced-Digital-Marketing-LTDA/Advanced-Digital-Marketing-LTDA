---
title: "My Experience Setting Up OpenClaw: Promising, but Frustrating"
meta_title: "OpenClaw review: My Coolify and Codex experience"
meta_description: "My experience self-hosting OpenClaw on Coolify, connecting Codex, troubleshooting blank replies, and reviewing security and upgrades."
published: "2026-10-27"
updated: "2026-10-27"
---

**Author:** Andrew Philip Weilbacher, founder of Advanced Digital Marketing LTDA.

## Summary

I deployed OpenClaw on Coolify to build a self-hosted assistant for business tasks. The gateway eventually started and my Codex login appeared valid, but chat returned blank replies. I also had to address security settings and encountered an upgrade that required an intermediate migration. I never reached a working Discord or project-management workflow, so I decided to try other options.

## Key takeaways

- **A running gateway did not mean a working assistant.** Messages reached the agent, but I never received a usable chat response.
- **Codex authentication was only part of the setup.** A valid-looking OAuth profile did not resolve the blank replies or model-configuration problems.
- **Security required hands-on configuration.** Changes brought the audit to zero critical findings, but two warnings remained under review.
- **Upgrades needed version-specific guidance.** Jumping directly from the installed release to the latest image failed because an intermediate migration was required. The AI assistant's upgrade advice contributed to the problem.
- **My intended workflow remained untested.** I did not establish a working Discord connection, project-management integration, or dependable approval workflow.

I wanted a self-hosted AI assistant I could talk to from Discord, connect to my project management system, and eventually use to coordinate work across my business.

OpenClaw seemed like a good fit. It promised an AI assistant that could connect to messaging platforms, use tools, and run on my own server. I already use Coolify to manage applications, so I decided to deploy it there.

My experience was frustrating. I got the gateway running and authenticated my Codex subscription, but I never got a usable chat response. Along the way, I encountered setup issues, security warnings, an upgrade problem, and some bad guidance from the AI assistant helping me troubleshoot.

Here's what happened.

## Why I wanted to try OpenClaw

I'm interested in building a team of AI agents that can help with business tasks and communicate with me throughout the day. For that to work, I need more than a chat window. I want agents that can use my existing project management system, work through a messaging app on desktop and mobile, and operate with appropriate guardrails and approval workflows.

OpenClaw was appealing because I could self-host it and connect it to Discord. It also supported different AI model providers, including the possibility of using my existing Codex subscription.

## The deployment got off to a rough start

I installed OpenClaw through Coolify. At first, the service showed a **503 Service Unavailable** error. The logs eventually showed that the gateway had started, and the page became available after waiting.

I also ran into confusion with the terminal. I was inside the OpenClaw service in Coolify, but the terminal was connected to its separate browser container. When I tried to run the `openclaw` command, I got:

```text
openclaw: not found
```

That made the setup harder to understand than I expected. I eventually reached the main OpenClaw container and could run its commands.

## I authenticated Codex, but chat still didn't work

The initial model configuration pointed to an OpenRouter model that OpenClaw reported as unknown. The gateway accepted my chat messages, but the agent failed before replying.

I wanted to use my Codex subscription, so I went through OpenClaw's authentication process. After some trial and error, the status command showed a valid Codex OAuth profile. I set `openai-codex/gpt-5.3-codex` as the default model.

At that point, I expected to be able to chat. Instead, I got empty assistant responses.

The logs showed that OpenClaw started and completed the requests using the Codex model, but they didn't explain why the replies were blank. We tried switching to another model for comparison, but OpenClaw rejected it because it wasn't on the configured model allowlist.

So the Codex login appeared successful, but I still didn't have a working chat.

## Security needed attention early

OpenClaw displayed a security warning during setup, and I appreciated that it was direct about the risks. An agent that can read files and run actions needs more care than an ordinary chatbot.

The security audit initially reported a critical finding involving insecure Control UI authentication. It also warned about proxy configuration, the browser connection, and readable credentials. I changed the insecure authentication setting, disabled elevated tools, and restricted the credentials directory. The next audit reported zero critical findings, although two warnings remained.

That was progress, but I hadn't finished reviewing the proxy configuration or the browser connection. For my intended use—agents with access to business tools, Discord, and a project management system—I also needed to understand sandboxing, permissions, and approvals before giving the system meaningful access.

## Upgrading introduced another problem

My installation was running OpenClaw `2026.2.6`. After the blank responses, the AI assistant helping me recommended updating directly to the latest image.

That advice turned out to be wrong for this installation. The newer version found old configuration keys and stopped its repair process because some older data required an intermediate migration. The error specifically said to upgrade through an earlier release and run its migration before trying the latest version again.

That distinction matters: this wasn't solely an OpenClaw failure. The upgrade guidance I received was also incomplete. The version-specific migration requirements should have been checked before I was told to make the jump.

## What I liked

The idea behind OpenClaw is compelling. I like the prospect of running an assistant on my own infrastructure, choosing a model provider, connecting messaging platforms, and giving an agent access to useful tools.

I also appreciated that OpenClaw surfaced security concerns during onboarding and provided an audit command. Those warnings gave me something concrete to investigate.

## What frustrated me

The gap between getting the gateway online and getting a working assistant was much larger than I expected. I encountered an unknown default model, a successful-looking Codex login followed by blank responses, model allowlist confusion, and an upgrade that needed a staged migration.

The documentation and commands also differed across versions. Some instructions I found—or was given—applied to a newer release than the one initially installed. That made it difficult to tell whether a failed command meant I had configured something incorrectly or was following instructions that didn't apply to my version.

I also never reached the part I was interested in: a working Discord assistant connected to my project management system with a dependable approval workflow.

## My take

OpenClaw has an appealing vision, but my experience felt unfinished. Getting a service to start is only the beginning; I need to be able to authenticate a model, send a message, understand failures, upgrade safely, and configure security before I can rely on it for business work.

I can see why people are excited about it. I can also see why someone trying to set it up might decide the amount of troubleshooting isn't worth it.

I may revisit OpenClaw later. For now, I'm going to look at other ways to build the assistant and agent workflow I had in mind.
