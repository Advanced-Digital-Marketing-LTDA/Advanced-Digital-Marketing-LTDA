---
title: "ChatGPT Ads: The Complete Guide to OpenAI's Advertising Platform (August 21, 2026)"
meta_title: "ChatGPT Ads Guide 2026: Pricing, Formats, Targeting & New Features"
meta_description: "ChatGPT Ads guide for August 2026: pricing, ad formats, oCPC bidding, measurement pixel, markets, policies and setup steps."
primary_entity: "ChatGPT Ads (OpenAI advertising platform)"
supporting_entities: ["OpenAI", "ChatGPT", "Ads Manager", "OAIQ Measurement Pixel", "Conversions API", "ChatGPT Go"]
published: "2026-08-21"
updated: "2026-10-30"
---

# ChatGPT Ads: The Complete Guide to OpenAI's Advertising Platform (August 21, 2026)

**Author:** Andrew Philip Weilbacher, founder and lead engineer of ADM, with 14 years of experience in MarTech development, digital marketing and automation.

> **Quick Answer:** ChatGPT Ads is OpenAI's advertising platform, launched February 9, 2026. It places clearly labeled "Sponsored" recommendations below ChatGPT responses. Advertisers buy placements through the self-serve Ads Manager at ads.openai.com using a relevance-weighted, second-price auction, priced at roughly $25–$60 CPM or $3–$5 CPC. Options include conversion-optimized (oCPC) bidding, product feed and carousel formats, a measurement pixel (OAIQ), and a Conversions API. As of August 21, 2026, reports list ads in nine markets (the US, Canada, UK, Australia, New Zealand, Japan, South Korea, Brazil and Mexico), and reports say OpenAI projects approximately $2.5 billion in 2026 ad revenue.

## Key Takeaways

- ChatGPT Ads is a contextual, self-serve ad product. Advertisers describe conversation topics instead of bidding on keywords.
- The US self-serve daily budget minimum is $25. OpenAI recommends a starting CPC max bid of $3 to $5.
- Ads are labeled "Sponsored" and appear below answers. Advertisers cannot influence what ChatGPT says.
- Demographic, retargeting and interest targeting are not available. Geo targeting and custom audiences are.
- Eligibility is limited. Adult, gambling, alcohol, tobacco, drug, counterfeit and political ads are prohibited. Health, financial and legal services need case-by-case approval.
- Verify your own measurement before spending. Check the pixel, the attribution window and consent settings.

---

## What Are ChatGPT Ads?

**ChatGPT Ads is OpenAI's native advertising program that displays sponsored content below ChatGPT's AI-generated responses, matched to the conversational context of the user's current chat rather than to typed keywords.**

ChatGPT Ads launched as a closed pilot in the United States on February 9, 2026, with a reported $200,000–$250,000 minimum commitment and premium CPMs near $60, sold through agency holding companies Dentsu, Omnicom, Publicis and WPP. OpenAI opened the self-serve Ads Manager beta to US businesses on May 5, 2026, replacing the six-figure pilot commitment with a $25 daily budget minimum.<sup class="blog-citation"><a href="https://explainx.ai/blog/openai-advertise-in-chatgpt-ads-launch-july-2026" target="_blank" rel="noopener noreferrer" aria-label="Source 3: ExplainX — &quot;ChatGPT Ads Launch — OpenAI Ads Manager 2026&quot; (July 22, 2026)." title="ExplainX — &quot;ChatGPT Ads Launch — OpenAI Ads Manager 2026&quot; (July 22, 2026).">[3]</a></sup>

Three structural facts define the platform:

1. **Ads are visually separated from answers.** The sponsored unit appears at the bottom of a ChatGPT response, labeled "Sponsored," and advertisers cannot influence what the model says. OpenAI states that ads appear below responses and are selected using the conversation's context, and that ads are chosen through a relevance-weighted, second-price auction.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Ads in ChatGPT: The Basics.">[OpenAI Help Center]</a></sup>
2. **Only some users see ads.** OpenAI's help center says ads are not shown to users on Plus, Pro or any Business plan, and not to accounts identified as belonging to users under 18.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Ads in ChatGPT: The Basics.">[OpenAI Help Center]</a></sup> Third-party reports say ads also run on the Free and Go ($8/month) tiers. That is not yet confirmed by OpenAI.
3. **Targeting is contextual, not demographic.** Advertisers supply "context hints" — descriptions of the conversations, topics, and situations where their product is relevant — instead of bidding on keyword strings or audience segments.<sup class="blog-citation"><a href="https://www.jollygoodweb.com/resources/chatgpt-ads-what-advertisers-need-to-know-in-2026" target="_blank" rel="noopener noreferrer" aria-label="Source 1: Jolly Good Web — &quot;ChatGPT Ads: What Advertisers Need to Know in 2026&quot; (updated July 27, 2026)." title="Jolly Good Web — &quot;ChatGPT Ads: What Advertisers Need to Know in 2026&quot; (updated July 27, 2026).">[1]</a></sup>

---

## How Did ChatGPT Ads Evolve? (Full Timeline: 2024–August 2026)

OpenAI's ad business moved from public denial to a projected $2.5 billion revenue line in under two years. The chronology below is the fastest way to understand where the platform is going.

| Date | Milestone |
|---|---|
| May 2024 | Sam Altman calls ads "a last resort" and "uniquely unsettling"; CFO Sarah Friar says there are "no active plans" for ads. |
| April 2025 | Leaked internal documents project ~$1B in "free user monetization" revenue for 2026, growing to ~$25B by 2029. |
| September 2025 | OpenAI begins hiring for campaign management, attribution pipelines, and self-serve ad infrastructure. |
| December 2025 | Android app code reveals an ad framework; first user sighting of a live ad. |
| **February 9, 2026** | **Formal ad testing begins in the US** — Free and Go tiers; ~$60 CPM; $200K–$250K minimums; managed-only through holding-company partners. |
| March 2026 | Criteo joins as the first ad-tech partner. |
| March 26, 2026 | Pilot crosses a **$100M annualized revenue run rate in roughly six weeks** (CNBC); ads expand to Canada, Australia, and New Zealand.<sup class="blog-citation"><a href="https://ppc.land/chatgpt-ads-gains-view-through-conversions-with-a-fixed-1-day-window/" target="_blank" rel="noopener noreferrer" aria-label="Source 6: PPC Land — &quot;ChatGPT Ads gains view-through conversions with a fixed 1-day window&quot; (August 20, 2026)." title="PPC Land — &quot;ChatGPT Ads gains view-through conversions with a fixed 1-day window&quot; (August 20, 2026).">[6]</a></sup> |
| April 2026 | CPC bidding introduced ($3–$5 recommended max bid); Ads Manager Beta self-serve onboarding opens; observed CPMs fall to $25–$45; ad-placement policy refined so medical, legal, and financial *advice* contexts are no longer blocked by default. |
| **May 5, 2026** | **Self-serve Ads Manager beta opens to US businesses at ads.openai.com. A $25 daily budget minimum replaces the six-figure pilot commitment.** OAIQ Measurement Pixel and Conversions API launch the same day. |
| May 12, 2026 | Product feed ads added for e-commerce advertisers. |
| May 14, 2026 | Custom audiences launch (first-party list uploads; later constrained to a 25,000 matched-user floor). |
| May 21, 2026 | New e-commerce ad format with price and review data; in-ad CTA buttons (Shop now, Book now, Sign up, Learn more) in early test. |
| May 22, 2026 | Daily and lifetime budget controls; geo-targeting expands from country to US state, DMA, and ZIP code. |
| May 28, 2026 | Cost-per-action (CPA) bidding switched on for select advertisers; commerce-media platform Skai added as integration partner. |
| June 5, 2026 | Conversion-optimized campaigns begin rolling out; UK agency pilot begins (Tesco, Hilton, Hiscox, Next among first brands, each holding company committing ≥10 clients at £25,000 each). |
| June 10, 2026 | LiveRamp connects its Conversions API Hub — the first third-party server-side route into the platform. |
| June 17, 2026 | Ad Tools Terms published, defining optional **Audience Tools** (customer data uploads) and **Creative Tools** (AI-generated ad creative from brand materials). |
| June 19, 2026 | Self-serve access launches in the UK. |
| June 22, 2026 | Ads go live in Japan and South Korea; at Cannes Lions, CRO Denise Dresser declares OpenAI is "clearly in the advertising business now," projecting **$2.5B in 2026 ad revenue scaling to $100B by 2030**. |
| July 2026 | Custom audiences with bid multipliers at ad-group level; new Overview tab; suggested ad drafts prefilled from website metadata; refreshed compact static ad card; conversion objectives, automatic budget pacing (weekly averaging), geo exclusions, AppsFlyer and Adjust integrations, and an Ads API for bulk changes. |
| July 22, 2026 | "Advertise in ChatGPT" self-serve push publicized with early case studies from Best Buy, Lowe's, and VistaPrint. |
| **August 2026** | oCPC beta for product feed campaigns; campaign cloning and bulk creation; dynamic URL macros; Triple Whale, Sonar Optimize and Hightouch integrations; pixel validation diagnostics; **Automatic Advanced Matching enabled for existing web pixels on August 17**; **view-through conversion reporting reported as documented August 18–19**; **Brazil and Mexico reported live the week of August 18**.<sup class="blog-citation"><a href="https://almcorp.com/news/chatgpt-ads-conversion-bidding-carousel-ads-august-2026/" target="_blank" rel="noopener noreferrer" aria-label="Source 12: ALM Corp — &quot;ChatGPT Ads Update August 2026: oCPC Bidding, Carousel Ads &amp; New Measurement Tools&quot; (August 18, 2026)." title="ALM Corp — &quot;ChatGPT Ads Update August 2026: oCPC Bidding, Carousel Ads &amp; New Measurement Tools&quot; (August 18, 2026).">[12]</a></sup> |

---

## Who Sees ChatGPT Ads — and Who Doesn't?

**OpenAI's help center says ads are not shown to Plus, Pro or Business users, or to users under 18. Reports from third parties add that ads run on the Free and Go tiers.**

This creates a specific audience profile advertisers must plan around:

- **The addressable audience is cost-conscious.** Free and Go ($8/month) users skew toward consumers who have chosen not to pay $20+/month for Plus. For consumer brands, e-commerce, and mass-market services this is viable reach; for B2B advertisers targeting senior decision-makers — who disproportionately hold paid seats — the audience may be structurally absent.
- **ChatGPT's overall scale is massive.** OpenAI reported ChatGPT crossing 300 million weekly active users in early 2026, with other reports placing the figure above 800 million and approaching 1 billion by mid-2026.<sup class="blog-citation"><a href="https://northeasttimes.com/2026/07/22/chatgpt-now-shows-ads-and-marketers-are-scrambling-to-adapt/" target="_blank" rel="noopener noreferrer" aria-label="Source 4: Northeast Times — &quot;ChatGPT now shows ads, and marketers are scrambling to adapt&quot; (July 22, 2026)." title="Northeast Times — &quot;ChatGPT now shows ads, and marketers are scrambling to adapt&quot; (July 22, 2026).">[4]</a></sup>
- **~20% of ChatGPT queries carry commercial intent**, according to OpenAI's internal figure shared with marketers at Cannes Lions, with travel, retail, and financial services among the strongest categories.

### Where are ChatGPT ads available as of August 21, 2026?

Reported as nine markets: United States, Canada, United Kingdom, Australia, New Zealand, Japan, South Korea, Brazil and Mexico. Brazil and Mexico were reported live the week of August 18, 2026, OpenAI's first Latin American markets.<sup class="blog-citation"><a href="https://almcorp.com/news/chatgpt-ads-conversion-bidding-carousel-ads-august-2026/" target="_blank" rel="noopener noreferrer" aria-label="Source 12: ALM Corp — &quot;ChatGPT Ads Update August 2026: oCPC Bidding, Carousel Ads &amp; New Measurement Tools&quot; (August 18, 2026)." title="ALM Corp — &quot;ChatGPT Ads Update August 2026: oCPC Bidding, Carousel Ads &amp; New Measurement Tools&quot; (August 18, 2026).">[12]</a></sup> OpenAI's help center does not list markets, so this list is unconfirmed by the primary source. Reports say the EU remains excluded.

---

## How Does ChatGPT Ad Targeting and the Auction Work?

**ChatGPT Ads uses a relevance-weighted, second-price auction in which ads are matched to the conversational context of the current chat — so a tighter, more relevant ad on a lower bid can beat a generic ad on a higher one.**

### Context hints replace keywords

Instead of bidding on "fence materials," an advertiser describes the kinds of conversations where the product is relevant — for example, users planning DIY home projects or comparing building materials. OpenAI's system combines those hints with the ad copy and landing page to decide when to serve the ad.

The trade-off, per practitioners: conversational context is richer than a keyword string — a user planning a fence project has narrated their whole purchase journey — but there is no quality-score equivalent, no feedback on hint performance, and no visibility into which conversations triggered impressions. Willis Annison, Digital Performance Director at Bountiful Cow, described it as "closer to programmatic — you're giving contextual hints rather than bidding on specific keywords."

### Current targeting levers (August 2026)

| Lever | Status |
|---|---|
| Context hints (conversational topics) | ✅ Core mechanism |
| Geo-targeting: country, US state, DMA, ZIP | ✅ Live since May 22, 2026 |
| Geo exclusions | ✅ Added July 2026 |
| Custom audiences (first-party lists, include/suppress) | ✅ Live; 25,000 matched-user minimum |
| Bid multipliers at ad-group level | ✅ Added July 2026 |
| Demographic targeting (age, gender, job title) | ❌ Not available |
| Retargeting | ❌ Not available |
| Interest/behavioral segments | ❌ Not available |

---

## How Much Do ChatGPT Ads Cost in August 2026?

**ChatGPT Ads cost approximately $25–$60 CPM or $3–$5 CPC as of August 2026. The US self-serve daily budget minimum is $25, down sharply from the February launch price of $60 CPM with a $200,000+ commitment.**

### Pricing model options

Three buying models now exist:

1. **CPM (Views objective):** pay per 1,000 impressions, built for awareness and category entry.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001210-create-campaigns-for-chatgpt" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Create Campaigns for ChatGPT Ads.">[OpenAI Help Center]</a></sup>
2. **CPC (Clicks objective):** pay per click. OpenAI recommends a starting max bid of $3–$5 per click.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Ads in ChatGPT: The Basics.">[OpenAI Help Center]</a></sup> Reports say bids under $3 often fail to deliver impressions.<sup class="blog-citation"><a href="https://topgrowthmarketing.com/how-much-do-chatgpt-ads-cost/" target="_blank" rel="noopener noreferrer" aria-label="Top Growth Marketing — &quot;How Much do ChatGPT Ads Cost&quot; (August 9, 2026)." title="Top Growth Marketing — &quot;How Much do ChatGPT Ads Cost&quot; (August 9, 2026).">[15]</a></sup>
3. **oCPC (conversion-optimized bidding, reported):** delivery is optimized toward a tracked conversion event while billing stays per valid click. OpenAI's campaign help page lists only the Views and Clicks objectives, so treat oCPC as available to eligible accounts only. Reports say conversion-optimized bidding began May 28, 2026 for select advertisers, rolled out more broadly on June 5, and entered beta for product feed campaigns in August 2026. The CPA bid guides delivery, but billing is never per conversion.

### Daily budget rules (US)

- The standard daily budget minimum in the US is $25. The minimum varies by market and currency.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001413-daily-budgets" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Daily budgets.">[OpenAI Help Center]</a></sup>
- For daily-budget campaigns with fixed bidding, the daily budget must be at least the highest effective per-event bid across non-archived ad groups. Lower the bids first, then the budget.
- A daily budget is an average over a 7-day budget week (Sunday to Saturday, in the ad account's timezone). Daily spend can reach 2x the daily budget, and weekly spend can reach 7x.

### Benchmark rates by vertical

| Category | Typical CPC |
|---|---|
| E-commerce & retail | $3–$6 |
| Travel & education | $4–$8 |
| SaaS / software | $8–$18 |
| Finance | $15–$25 |
| Legal services | $12–$20 |

| CPM scenario | Rate |
|---|---|
| Launch price (Feb 2026, enterprise only) | $60 |
| Current floor (less competitive categories) | $25–$30 |
| Typical range today | $25–$60 |
| LinkedIn (comparison) | ~$39 |
| Meta (comparison) | $14–$20 |

*Sources: Top Growth Marketing, August 9, 2026; The Growth Syndicate, May 2026. These benchmark ranges are third-party estimates, not OpenAI figures.*<sup class="blog-citation"><a href="https://www.thegrowthsyndicate.com/resources/chatgpt-ads" target="_blank" rel="noopener noreferrer" aria-label="Source 2: The Growth Syndicate — &quot;ChatGPT ads, what they cost, how they work, and setup guide&quot; (May 20, 2026)." title="The Growth Syndicate — &quot;ChatGPT ads, what they cost, how they work, and setup guide&quot; (May 20, 2026).">[2]</a></sup>

### How does performance look so far?

Reported third-party data points as of August 2026:

- **CTR: 0.68% overall** (Similarweb). Other reports say ~0.91–1.3%. Live testing by agencies shows CTR clustered near 1% regardless of creative variation, which suggests limited creative-optimization headroom at this stage.
- **7,378 distinct advertisers** ran inside ChatGPT during the week of July 13–20, 2026 (Adthena), with the US accounting for 60.1%.<sup class="blog-citation"><a href="https://ppc.land/chatgpt-ads-gains-view-through-conversions-with-a-fixed-1-day-window/" target="_blank" rel="noopener noreferrer" aria-label="Source 6: PPC Land — &quot;ChatGPT Ads gains view-through conversions with a fixed 1-day window&quot; (August 20, 2026)." title="PPC Land — &quot;ChatGPT Ads gains view-through conversions with a fixed 1-day window&quot; (August 20, 2026).">[6]</a></sup>
- **2,000 brands** ran campaigns through Criteo's API connection by June 2026.
- **~$109M total ChatGPT ad spend in April 2026** (AdClarity by BIScience), projected toward $500M as test budgets convert.
- Early US pilot CPMs came in closer to $30 than the $60 rate card; Jellyfish reported early conversions and high order values but framed the channel as brand awareness, "a bit of a leap of faith."

---

## What Ad Formats Does ChatGPT Support?

**ChatGPT Ads supports a static sponsored card below AI responses, product feed ads with price and review data, in-ad CTA buttons, and — in testing as of August 2026 — a multi-product carousel format.**

| Format | Description | Status (Aug 21, 2026) |
|---|---|---|
| Static sponsored card | Compact card below the response: image, title, description; refreshed with larger visuals in July 2026 | ✅ Live (web + mobile) |
| Product feed ads | Catalog-driven units for e-commerce; oCPC beta | ✅ Live since May 12, 2026 |
| E-commerce rich format | Portrait/landscape units with price and review data | ✅ Live since May 21, 2026 |
| CTA buttons | Shop now, Book now, Sign up, Learn more inside the ad unit | ⚠️ Auto-selected; early test |
| Multi-product carousel | Several products from one advertiser in a single unit | ⚠️ In testing (Aug 2026) |
| Sponsored suggestions | Suggestions appearing alongside the generated response, visually separated | ✅ Shown in OpenAI product materials |

All formats share two constants: a visible "Sponsored" label, and physical separation from the AI's answer — the ad never appears inside the generated text.<sup class="blog-citation"><a href="https://explainx.ai/blog/openai-advertise-in-chatgpt-ads-launch-july-2026" target="_blank" rel="noopener noreferrer" aria-label="Source 3: ExplainX — &quot;ChatGPT Ads Launch — OpenAI Ads Manager 2026&quot; (July 22, 2026)." title="ExplainX — &quot;ChatGPT Ads Launch — OpenAI Ads Manager 2026&quot; (July 22, 2026).">[3]</a></sup>

---

## What's New in ChatGPT Ads? (August 2026 Feature Release)

**OpenAI's August 2026 update batch is almost entirely about performance marketing plumbing: conversion-optimized bidding, automatic attribution matching, third-party measurement integrations, and two new Latin American markets.**

Nine updates landed this month:

1. **oCPC for product feed campaigns (beta).** Optimized cost-per-click lets advertisers optimize delivery toward a conversion event while still paying per click — a bridge between CPC and full CPA bidding. Existing CPC campaigns can be cloned into oCPC campaigns, or created in bulk; the conversion event preselects when exactly one eligible event exists and cannot be changed after creation.<sup class="blog-citation"><a href="https://almcorp.com/news/chatgpt-ads-conversion-bidding-carousel-ads-august-2026/" target="_blank" rel="noopener noreferrer" aria-label="Source 12: ALM Corp — &quot;ChatGPT Ads Update August 2026: oCPC Bidding, Carousel Ads &amp; New Measurement Tools&quot; (August 18, 2026)." title="ALM Corp — &quot;ChatGPT Ads Update August 2026: oCPC Bidding, Carousel Ads &amp; New Measurement Tools&quot; (August 18, 2026).">[12]</a></sup>
2. **Dynamic URL parameters (macros).** Four macros — `{campaign_id}`, `{ad_group_id}`, `{ad_id}`, `{ad_account_id}` — auto-populate in destination URLs, ending manual UTM tagging per ad and simplifying GA4 joins.
3. **Triple Whale integration**, including Sonar Optimize, which feeds stronger conversion signals back to OpenAI's bid models.
4. **Hightouch Conversions API support** — another server-side route for first-party conversion events.
5. **Pixel validation diagnostics.** Tools → Conversions now shows why an event was dropped — the affected field, error type, and recommended fix (most common: incorrect SHA-256 hash format, stale `timestamp_ms`, event-shape mismatch).
6. **Automatic Advanced Matching (AAM), enabled for existing web pixels on August 17, 2026.** AAM uses hashed customer information from website forms to recover otherwise-unattributed conversions. OpenAI says AAM is the default for new web pixels and was enabled for existing web pixels on August 17, 2026. The pixel hashes form data in the browser, and advertisers can opt out under Tools > Conversions > Data Source > Edit pixel.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001409-conversion-measurement" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Conversion Measurement.">[OpenAI Help Center]</a></sup> Advertisers in consent-regulated jurisdictions should review the setting before their next campaign.
7. **View-through conversion reporting, reported as documented August 18–19, 2026.** Conversions within a fixed, non-configurable one-day window after an eligible impression are reported as "View-through conversions (1 day)" / VTA (1d). This is at campaign, ad-group and ad level. Click-through conversions carry a 30-day option. Where both qualify, the click takes precedence. Reports say the metric is excluded from the main Conversions total, CPA, bidding, billing and optimization.<sup class="blog-citation"><a href="https://ppc.land/chatgpt-ads-gains-view-through-conversions-with-a-fixed-1-day-window/" target="_blank" rel="noopener noreferrer" aria-label="Source 6: PPC Land — &quot;ChatGPT Ads gains view-through conversions with a fixed 1-day window&quot; (August 20, 2026)." title="PPC Land — &quot;ChatGPT Ads gains view-through conversions with a fixed 1-day window&quot; (August 20, 2026).">[6]</a></sup>
8. **Modelled conversions enter the documentation.** OpenAI confirms that reported conversion totals may include modelled conversions.<sup class="blog-citation"><a href="https://help.openai.com/en/articles/20001409-conversion-measurement" target="_blank" rel="noopener noreferrer" aria-label="OpenAI Help Center: Conversion Measurement.">[OpenAI Help Center]</a></sup> Where modelled measurement is available, OpenAI may use aggregated patterns from observed conversions to estimate attribution for events that cannot otherwise be attributed. The methodology has not been published, and no confidence intervals are given.
9. **Brazil and Mexico, reported live the week of August 18, 2026.** Advertisers running broad geo coverage should audit country targeting, because new markets can be picked up automatically and absorb budget.

Earlier July additions worth knowing: an Ads API for bulk changes, AppsFlyer and Adjust app-install attribution across seven markets, weekly-averaged budget pacing, and geo exclusions.

---

## How Do You Measure ChatGPT Ads?

**ChatGPT Ads measurement runs on the OAIQ JavaScript pixel for browser-side events and the Conversions API for server-side events. It offers configurable click-through windows, a reported fixed 1-day view-through window, and aggregate-only reporting. User-level data is not exposed.**

### The measurement stack (current state, August 2026)

| Capability | Available? | Notes |
|---|---|---|
| Impressions, clicks, CTR, CPC, CPM | ✅ | Ads Manager, daily breakdown |
| OAIQ pixel (site-side events) | ✅ | Live since May 5, 2026; GTM community template since May 7 |
| Conversions API (server-side) | ✅ | Purchases, signups, leads; LiveRamp/Hightouch routes |
| Click-through attribution | ✅ | Configurable window; 30-day option shown in UI |
| View-through attribution | ✅ (eligible accounts) | Reported fixed 1-day window; supplemental only; no billing or bidding impact |
| App install attribution | ✅ | AppsFlyer + Adjust, seven markets, since late July 2026 |
| Dynamic URL macros | ✅ | `{campaign_id}`, `{ad_group_id}`, `{ad_id}`, `{ad_account_id}` |
| Modelled conversions | ⚠️ | Confirmed by OpenAI; methodology unpublished |
| Audience/demographic reporting | ❌ | Not offered |
| Conversation/prompt-level insight | ❌ | Not offered; OpenAI does not share chats |

### Five setup steps that are non-negotiable

1. **Install the OAIQ pixel, the Conversions API, or both before spending a dollar.** Either method works on its own; using both with a shared `event_id` deduplicates events and survives browser restrictions. The August AAM default improves match rates but requires a consent review.
2. **Use dynamic URL macros or full UTM strings** on every destination URL so your analytics can separate ChatGPT traffic.
3. **Choose attribution windows deliberately.** Conversational research cycles run long; 7-day click default fits most e-commerce/SaaS, and the 1-day view-through number is directional, not billable evidence.
4. **Baseline branded search and direct traffic before launch.** Post-purchase surveys ("how did you hear about us?") capture the halo that aggregate reporting misses — research cited by practitioners found AI-platform referral traffic converting at 14.2% vs 2.8% for Google traffic.<sup class="blog-citation"><a href="https://topgrowthmarketing.com/how-to-measure-chatgpt-ads/" target="_blank" rel="noopener noreferrer" aria-label="Source 16: Top Growth Marketing — &quot;How to Measure ChatGPT Ads (And What You Can&#x27;t — Yet)&quot; (updated August 2026)." title="Top Growth Marketing — &quot;How to Measure ChatGPT Ads (And What You Can&#x27;t — Yet)&quot; (updated August 2026).">[16]</a></sup>
5. **Mind the consent mechanics.** The pixel exposes `oaiq("consent", false)` to suppress events pre-consent; blocked events are not replayed. Consent defaults to true unless explicitly denied — a legal review point anywhere prior consent is required.

---

## What Are OpenAI's Ad Policies and Brand-Safety Rules?

**OpenAI's ad policies (last updated September 10, 2026) prohibit several categories outright, including adult content, gambling, alcohol and tobacco, illegal drugs, counterfeit goods, scams, and political content. Health, financial and legal services are restricted to case-by-case approval, mostly in the US.**

### Placement rules (where ads may NOT appear)

Ads are excluded from two context classes:<sup class="blog-citation"><a href="https://openai.com/policies/ad-policies/" target="_blank" rel="noopener noreferrer" aria-label="Source 8: OpenAI — &quot;Ad policies&quot; (last updated September 10, 2026)." title="OpenAI — &quot;Ad policies&quot; (last updated September 10, 2026).">[8]</a></sup>

- **Brand-unsafe contexts:** child safety, cyber abuse, hate or harassment, misinformation, terrorism, weapons, suicide or self-harm, political content, and similar topics.
- **Sensitive user contexts:** emotionally reliant interactions, mental and personal health conversations, sensitive user journeys.

The v1.1 policy changelog says medical, legal and financial advice contexts are no longer categorically blocked from ads by default. Sensitive conversations remain excluded. An SE Ranking study reported by Search Engine Journal in August 2026 found ChatGPT showing ads on 28.69% of commercial prompts in its healthcare category, over 10× the 2.64% rate in Google's AI Mode.<sup class="blog-citation"><a href="https://www.searchenginejournal.com/openai-allows-some-health-finance-ads-in-chatgpt/585516/" target="_blank" rel="noopener noreferrer" aria-label="Source 17: Search Engine Journal — &quot;OpenAI Allows Some Health &amp; Finance Ads In ChatGPT&quot; (August 12, 2026)." title="Search Engine Journal — &quot;OpenAI Allows Some Health &amp; Finance Ads In ChatGPT&quot; (August 12, 2026).">[17]</a></sup>

### Category eligibility for advertisers

- **Restricted (case-by-case approval, US):** financial services (for example credit cards, insurance, mortgages and investment services, possibly with licensure proof), health services, and legal services. Legal ads are allowed only when the advertiser is licensed to practice law where the ad runs. Health services outside the US are generally prohibited. Financial and legal services outside the US are prohibited.
- **Prohibited:** adult content, alcohol and tobacco, illegal drugs, gambling, counterfeit goods, scams and fraud, graphic content, political content, and individual job and housing listings. Credit repair, debt settlement and bullion are not allowed. Unsubstantiated health claims are barred. General wellness advertising without medical claims may be permitted.
- **Not confirmed on OpenAI's policy page:** a ban on cryptocurrency ads and an alcohol threshold of above 0.5% ABV. Earlier drafts of this guide listed both. They stay out until a primary source confirms them.

Review is hybrid: ML classifiers screen creative, landing pages, and advertiser signals, with human review for borderline cases. Two common B2B rejection triggers, per practitioners: framing a product as identifying *individuals* (trips privacy review) and disparaging competitor comparisons (trips misrepresentation review). Ads must be consistent end-to-end — an approved creative may not link to a destination that introduces disallowed content.

**Brand-safety gap to note:** advertisers cannot set keyword exclusions, placement lists, or content-category controls beyond OpenAI's defaults — a real barrier for brands with strict adjacency requirements.

---

## How Do ChatGPT Ads Compare to Google, Meta, and Perplexity?

**ChatGPT Ads sit between Meta and LinkedIn on raw cost, ahead of everyone on conversational intent richness, and behind Google on every dimension of platform maturity — targeting granularity, retargeting, reporting depth, and optimization automation.**

| Dimension | ChatGPT Ads | Google (Search/AI Overviews) | Meta | Perplexity |
|---|---|---|---|---|
| Primary format | Sponsored card below AI answer | Text/shopping ads incl. inside AI Overviews | Feed/Reels image & video | Sponsored follow-ups + side panel |
| Pricing | $25–$60 CPM · $3–$5 CPC | $20–$60 CPM · $1–$50 CPC | $14–$20 CPM · $0.50–$1.80 CPC | $15–$40 CPM hybrid |
| Targeting | Conversational context + geo + custom audiences | Full keyword + audience suite | Demographic + interest + retargeting | Query/topic-based |
| Reach | ~1B weekly users (reported) | Billions of daily queries | ~3B+ daily users | 15–25M MAU (est.) |
| Intent captured | Conversational, consideration-stage | Purchase-ready search intent | Passive discovery | Deep research |
| Maturity | 6 months old | 25 years | ~15 years | ~2 years |
| Self-serve | ✅ (nine markets, reported) | ✅ Global | ✅ Global | ⚠️ Partial |

*Sources: eSEOspace AI advertising comparison, June 9, 2026; Top Growth Marketing, August 2026. These comparison figures are third-party estimates.*<sup class="blog-citation"><a href="https://eseospace.com/blog/ai-advertising-showdown/" target="_blank" rel="noopener noreferrer" aria-label="Source 19: eSEOspace — &quot;ChatGPT Ads vs Perplexity Ads vs Google AI Overviews&quot; (June 9, 2026)." title="eSEOspace — &quot;ChatGPT Ads vs Perplexity Ads vs Google AI Overviews&quot; (June 9, 2026).">[19]</a></sup>

The honest strategist's read: ChatGPT ads are not a replacement for Google or Meta in August 2026. They are an early-mover test channel where quality-score history and auction learning compound — the same window Google Ads offered in 2003, Facebook in 2014, and TikTok in 2020.

---

## What Are the Current Limitations of ChatGPT Ads?

Five structural constraints persist as of August 21, 2026:

1. **No demographic or audience-attribute targeting** — context hints and geo are the levers; that's it.
2. **Aggregated reporting only.** No audience insight, no placement data, no visibility into which conversation types triggered an ad or what ChatGPT said before it appeared.
3. **No advertiser-controlled brand-safety levers** beyond OpenAI's platform defaults.
4. **No published benchmarks.** OpenAI's own documentation acknowledges no cross-advertiser performance benchmarks exist; you cannot know if your numbers are good or bad relative to your sector.
5. **Flat CTR dynamics.** Live testing consistently shows ~1% CTR regardless of creative variation — creative optimization currently moves less than on mature platforms.

---

## How Do You Set Up a ChatGPT Ads Campaign? (Step-by-Step)

**You can prepare a ChatGPT Ads campaign in one session, but delivery waits on account approval: create an account at ads.openai.com, pass OpenAI's manual review (a rolling queue that practitioners report can take several days), complete billing and the Account name/Logo fields, install the pixel, build a Clicks-objective campaign at a $3–$5 max bid, and start at $100–$300/day for a two-week instrumented test.**

1. **Create the account.** Go to ads.openai.com. Eligibility depends on the business location and activity category you declare. Ineligible countries or excluded categories block approval. New applications enter OpenAI's manual rolling review, which practitioners report can take several days. OpenAI publishes no approval timeline. Campaigns cannot deliver until platform access is granted. Agencies need one account per client.<sup class="blog-citation"><a href="https://ceaksan.com/en/chatgpt-ads-access-eligibility" target="_blank" rel="noopener noreferrer" aria-label="Source 20: Ceaksan — &quot;Who Can Access ChatGPT Ads: Geographic Eligibility and Category Restrictions&quot; (June 5, 2026)." title="Ceaksan — &quot;Who Can Access ChatGPT Ads: Geographic Eligibility and Category Restrictions&quot; (June 5, 2026).">[20]</a></sup>
2. **Set up billing.** Add a billing profile (business address, invoice email) and a credit card; invite teammates via Settings → Users → Invite.
3. **Install measurement first.** Deploy the OAIQ pixel on registration, demo, and purchase pages, and/or configure the Conversions API server-side — at least one is required for conversion objectives, and both together (with a matching `event_id`) improve resilience.
4. **Build the campaign.** Choose an objective: Views (CPM) or Clicks (CPC, recommended start). OpenAI's campaign help page lists only these two; conversion-optimized bidding (oCPC) is reported for eligible accounts. Set daily or lifetime budgets; daily budgets now pace automatically on a weekly average. Budgets under $50/day generate too little volume for usable data; $100–$300/day over two weeks is a practical test.
5. **Write context hints and creative.** Describe the conversations where your product belongs. Watch for suggested ad drafts — Ads Manager can prefill image, title, and description from your website metadata.
6. **Tag URLs with macros.** Append `{campaign_id}`, `{ad_group_id}` and `{ad_id}` so reporting joins cleanly.<sup class="blog-citation"><a href="https://spilnoagency.com.ua/en/instructions-us/chatgpt-ads-new-features-setup-guide" target="_blank" rel="noopener noreferrer" aria-label="Source 13: Spilno Agency — &quot;ChatGPT Ads New Features 2026: Setup Guide&quot; (August 6, 2026)." title="Spilno Agency — &quot;ChatGPT Ads New Features 2026: Setup Guide&quot; (August 6, 2026).">[13]</a></sup>
7. **Launch, then optimize for cost-per-outcome — not CTR.** Given the ~1% flat CTR pattern, creative testing matters less than conversion instrumentation and landing-page match to research intent.

---

## How Do ChatGPT Ads Relate to GEO (Generative Engine Optimization)?

**Paid ChatGPT placements and organic AI visibility are complementary, not substitutable: ads buy presence below the answer, while GEO determines whether your brand appears inside the answer itself — and advertisers cannot influence the answer at any price.**

Three planning implications:

- **The organic surface is the bigger prize long-term.** Ads reach only Free and Go users in the reported markets. Organic ChatGPT answers reach all of ChatGPT's weekly users. Brands that are invisible in organic AI answers are renting attention they could own.
- **The paid program is a demand signal for GEO investment.** With ~20% of ChatGPT queries carrying commercial intent, the categories OpenAI monetizes first (travel, retail, financial services) are where organic AI visibility converts.<sup class="blog-citation"><a href="https://startupfortune.com/openai-walks-into-cannes-lions-and-tells-the-advertising-industry-it-is-ready-to-take-their-money/" target="_blank" rel="noopener noreferrer" aria-label="Source 10: Startup Fortune — &quot;OpenAI walks into Cannes Lions and tells the advertising industry it is ready to take their money&quot; (June 26, 2026)." title="Startup Fortune — &quot;OpenAI walks into Cannes Lions and tells the advertising industry it is ready to take their money&quot; (June 26, 2026).">[10]</a></sup>
- **Small businesses priced out of early tests should sequence GEO first, paid second.** Build extractable, citation-worthy content (question-based headings, direct answers in the first 40–60 words, structured tables) so the brand appears in answers; add paid placements once economics justify it.

---

## Frequently Asked Questions About ChatGPT Ads

**When did ChatGPT start showing ads?**
OpenAI began testing ads in ChatGPT on February 9, 2026, in the United States.

**Who sees ads in ChatGPT?**
OpenAI's help center says ads are not shown to Plus, Pro or Business users, or to users under 18. Third-party reports say ads also run on the Free and Go tiers ($8/month).

**How much do ChatGPT ads cost in 2026?**
Third-party estimates put typical costs at $25–$60 CPM or $3–$5 CPC. The US self-serve daily budget minimum is $25. Launch pricing in February 2026 was $60 CPM with a $200,000–$250,000 commitment.

**Do ads influence ChatGPT's answers?**
No. OpenAI states that ads are labeled "Sponsored," are selected using the conversation's context, and do not shape responses. Advertisers never see user conversations.

**Where are ChatGPT ads available?**
Reports list nine markets as of August 21, 2026: US, Canada, UK, Australia, New Zealand, Japan, South Korea, Brazil and Mexico. OpenAI's help center does not list markets. Reports say the EU remains excluded.

**What is oCPC in ChatGPT Ads?**
Optimized cost-per-click: delivery is optimized toward a conversion event while billing stays per click. Reports say it entered beta for product feed campaigns in August 2026, with campaign cloning and bulk creation.

**What changed on August 17, 2026?**
OpenAI says Automatic Advanced Matching, already the default for new web pixels, was enabled for existing web pixels on August 17, 2026. It uses hashed form data to recover conversions, and advertisers can opt out under Tools > Conversions > Data Source > Edit pixel.

**Does ChatGPT Ads have view-through attribution?**
Reports say yes: a fixed 1-day view-through window, documented August 18–19, 2026, reported as VTA (1d). It is kept separate from the main Conversions total and excluded from CPA, bidding and billing. Clicks take precedence over views.

**Can small businesses advertise on ChatGPT?**
Yes. Self-serve is open in the reported launch markets, with a $25 daily budget minimum in the US. Budgets under ~$50/day produce too little data, so plan $100–$300/day for a meaningful two-week test.

**What ad categories are banned on ChatGPT?**
Adult content, alcohol and tobacco, illegal drugs, gambling, counterfeit goods, scams and fraud, credit repair and debt settlement, and political content. Health, financial and legal services are restricted to case-by-case approval, mostly in the US.

**How big is OpenAI's ad business?**
Reports say the pilot crossed a $100M annualized run rate in six weeks. OpenAI projects ~$2.5B in 2026 ad revenue, $11B in 2027 and $100B by 2030. These projections are vendor-stated and unaudited.

---

## Publishing Appendix: SEO/GEO Metadata for This Guide

- **Title tag (≤60 chars):** ChatGPT Ads Guide 2026: Pricing, Formats & New Features
- **Meta description (≤160 chars):** ChatGPT Ads guide for August 2026: pricing, ad formats, oCPC bidding, measurement pixel, markets, policies and setup steps.
- **Primary entity:** ChatGPT Ads · **Supporting entities:** OpenAI, Ads Manager, OAIQ pixel, Conversions API, ChatGPT Go, oCPC.
- **Schema:** No JSON-LD exists in the repository yet. Add a shared Organization block that is identical on every page, plus a page-specific block for each guide with its own `name`, `url` and `dateModified` (2026-10-26).
- **AI-crawler checklist:** robots.txt permits GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended; serve fresh sitemap; consider llms.txt.
- **Refresh cadence:** ChatGPT Ads is shipping updates roughly weekly — reverify pricing, market list, and policy sections at least monthly; AI-engine citation rotation runs 40–60% month over month.

---
