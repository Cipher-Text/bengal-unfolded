# Editorial Guidelines

Consolidated voice, source quality, neutrality, and sensitive-history standards for Bengal Unfolded contributors (human and AI).

## Voice and Tone

- Neutral, evidence-first, non-propagandistic writing.
- Avoid absolute claims unless strongly sourced.
- Prefer precise time/place/actor references over vague statements.
- Avoid praise/condemnation adjectives unless in an attributed quotation.
- Avoid rhetorical framing that implies moral certainty without citation.

## Claim and Source Policy

- Historical claims should include supporting `sourceIds`.
- Interpretive statements should be clearly signposted as interpretation or context.
- Sensitive or potentially contested claims must use high-quality sources.
- Do not label a source as `primary` unless it is first-hand or an institutional record; analysis/synthesis sources are `secondary` (see Source Quality Rubric below).

## Localization Policy (EN/BN)

- Preserve meaning across locales; avoid adding new factual claims in only one locale.
- Keep proper nouns and year/date references aligned across EN/BN.
- If one locale is updated for factual content, update the other in the same change set.
- Do not introduce stronger political claims in only one locale.

## Source Quality Rubric

Allowed `quality` values in `content/resources/*/meta.<locale>.json`:

| Value | Meaning |
|-------|---------|
| `primary` | First-hand or institutional record — official documents, direct testimony, contemporaneous records |
| `secondary` | Analytical or interpretive works — research books, scholarly explainers, encyclopedia entries |
| `archive` | Curated repositories of historical records, collections, or document/photo archives |
| `editorial` | Opinionated or narrative material — films, essays, non-scholarly commentary |

**Primary vs secondary distinction — apply tests in order:**

1. **Origin:** Created by a direct participant, institution of record, or contemporaneous recorder → `primary`.
2. **Processing:** Mainly interprets, compares, or summarizes other sources → `secondary`.
3. **Proximity:** Temporal closeness alone is not sufficient; the source must still be first-hand.
4. **Reproduction:** A modern reprint of an original document stays `primary` if it preserves the record materially.
5. **Commentary boundary:** If analysis dominates over record-preservation → `secondary` even when primary excerpts are quoted.

Quick examples:
- Government gazette, court record, treaty text, census, contemporary telegram → `primary`
- Encyclopedia entry, historian monograph, survey article, classroom explainer → `secondary`

## Neutrality Rules

1. **Fact first.** Write observable facts before interpretation.
2. **Attribution required.** Attribute interpretive claims to identifiable sources. Do not present contested interpretation as settled fact.
3. **Loaded-language control.** Avoid praise/condemnation language unless in an attributed quotation.
4. **Balance in contested sections.** If credible sources disagree, summarize major viewpoints proportionally to source quality and evidentiary basis.
5. **Scope discipline.** Keep summary paragraphs descriptive, not argumentative.

## Sensitive Political History

Apply this section to any event involving:

- political killings, disappearances, mass arrests, or custodial abuse
- war crimes or allegations of war crimes
- communal or ethnic violence
- election-related violence or legitimacy disputes
- state emergency rule, coups, or constitutional breakdown

**Writing rules:**

- Separate established facts from allegations. Use precise legal-status wording: `alleged`, `reported`, `confirmed`, `adjudicated`.
- Name institutions/actors when sources do so; avoid vague collective blame.
- Present chronology before interpretation. When casualty or incident figures vary, report the range with source attribution.
- If credible sources disagree, mark `contested: true` and summarize competing views in `historicalDebate`.
- Maintain equivalent factual meaning and uncertainty labels in both EN/BN locales.

**Required metadata for in-scope sensitive events:**

- `sensitive: true`
- `requiresSources: true`
- non-empty `contentWarnings` (localized, specific)
- citation-backed `summarySourceIds` and `whyItMattersSourceIds`
- when materially disputed: `contested: true`, `historicalDebate` non-empty, `historicalDebateSourceIds` non-empty

## Figure Page Enrichment Policy

- Prefer structured fields over long unstructured prose.
- Include `eventId` links for timeline claims.
- Include citations for impact/legacy claims.
- Keep role descriptions specific to event context and year range.

## Prohibited Patterns

- Unsourced factual additions.
- Schema additions without validator and contract updates (see `docs/AI_CONTRACT.md`).
- Roadmap completion marking without actual implementation.
- Certainty claims that exceed source confidence.
- Collective guilt framing by ethnicity, religion, language, or party identity.
- Selective omission of material counter-evidence in contested events.
- Locale drift where EN and BN imply different factual conclusions.

## Pre-merge Checklist

- [ ] Claims in `summary` and `whyItMatters` are citation-backed when required.
- [ ] Contested markers and debate fields are present where applicable.
- [ ] Wording avoids loaded terms unless quoted and attributed.
- [ ] EN/BN carry equivalent factual meaning.
- [ ] Source-quality tags match the rubric above.
- [ ] In-scope sensitive events are marked `sensitive: true`.
- [ ] Disputed interpretations are marked and sourced.
- [ ] Casualty/incident numbers are attributed and time-bounded.
