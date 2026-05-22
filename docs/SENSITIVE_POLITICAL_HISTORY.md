# Sensitive Political History Writing Guideline

This policy defines how to write about political violence, state repression, communal conflict, and disputed accountability in Bengal/Bangladesh history coverage.

## Scope

Apply this guideline to any event/page with one or more of:

- political killings, disappearances, mass arrests, or custodial abuse
- war crimes or allegations of war crimes
- communal or ethnic violence
- election-related violence or legitimacy disputes
- state emergency rule, coups, or constitutional breakdown

## Core Rules

1. Claim discipline:
- Separate established facts from allegations.
- Use precise wording for legal status: `alleged`, `reported`, `confirmed`, `adjudicated`.

2. Actor specificity:
- Name institutions/actors when sources do so; avoid vague collective blame.
- Do not generalize from an actor to an entire population or identity group.

3. Time-sequenced reporting:
- Present chronology before interpretation.
- When casualty or arrest figures vary, report range with source attribution.

4. Attribution and evidentiary hierarchy:
- Prefer primary and high-quality archival/official records when available.
- Use secondary synthesis to provide context, not to overwrite stronger primary evidence.

5. Dispute handling:
- If credible sources disagree, mark `contested: true` and summarize competing views in `historicalDebate`.
- Do not collapse multiple interpretations into a single editorial verdict.

6. Harm-aware language:
- Avoid dehumanizing, inflammatory, or celebratory violence language.
- Keep content warnings concrete and audience-informative.

## Metadata and Citation Requirements

For in-scope sensitive political events:

- `sensitive: true`
- `requiresSources: true`
- non-empty `contentWarnings` with localized text
- citation-backed `summarySourceIds` and `whyItMattersSourceIds`
- when materially disputed: `contested: true`, plus non-empty `historicalDebate` and `historicalDebateSourceIds`

## EN/BN Consistency Rules

- Maintain equivalent factual meaning and uncertainty labels in both locales.
- If wording in one locale softens or intensifies accountability language, update both locales together.
- Keep named actors, years, and legal-status terms aligned across EN/BN.

## Prohibited Patterns

- Unattributed allegations presented as facts.
- Certainty claims that exceed source confidence.
- Collective guilt framing by ethnicity, religion, language, or party identity.
- Selective omission of material counter-evidence in contested events.

## Pre-merge Checklist

- In-scope event is explicitly marked `sensitive`.
- Required source fields exist and are non-empty.
- Disputed interpretations are marked and sourced.
- Casualty/incident numbers are attributed and time-bounded.
- EN/BN wording parity reviewed for political-sensitivity drift.
