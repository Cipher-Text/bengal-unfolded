# Search Console Optimization Log

This log tracks Search Console-driven SEO work for Bengal Unfolded. It is for weekly title, description, content-depth, internal-link, and indexing actions based on Google Search Console Performance exports.

Source baseline for the first cycle: user-provided Google Search Console Performance export for `bengalunfolded.com`, Web search, Apr 29-Jun 27, 2026.

## Weekly Workflow

1. Export GSC Performance data for Web search.
2. Filter for pages or queries with:
   - impressions >= 100,
   - average position 4-12,
   - CTR below 0.50% for EN or below 1.00% for BN,
   - clear historical intent that matches Bengal Unfolded content.
3. For each selected URL, record:
   - current title and meta description state,
   - dominant query intent,
   - likely CTR issue,
   - planned action,
   - deployment date,
   - recheck date after at least 21-28 days.
4. Change one major snippet variable at a time when possible:
   - title first,
   - then meta description,
   - then intro/FAQ/internal links.
5. After deployment:
   - submit URL inspection or request indexing for high-priority pages,
   - compare the next 28-day window against the previous 28-day window,
   - keep the result even when the change underperforms.

## Metrics To Record

| Field | Meaning |
| --- | --- |
| Date logged | Date the opportunity was added here |
| Locale | `en` or `bn` |
| URL | Canonical site path |
| Query/topic | Query or topic cluster from GSC |
| Baseline impressions | GSC impressions for the measured range |
| Baseline clicks | GSC clicks for the measured range |
| Baseline CTR | GSC CTR for the measured range |
| Baseline position | GSC average position for the measured range |
| Diagnosis | Why the page may be under-clicked |
| Action | Specific change planned or made |
| Status | `queued`, `changed`, `deployed`, `recheck`, `closed` |
| Recheck date | Earliest date to compare a fresh 21-28 day window |
| Result | Follow-up outcome |

## Site Baseline

### Baseline 1 — First optimization cycle

| Metric | Value |
| --- | ---: |
| Clicks | 87 |
| Impressions | 28,710 |
| Average CTR | 0.30% |
| Average position | 11.43 |
| Date range | Apr 29–Jun 27, 2026 |

### Baseline 2 — Second optimization cycle

| Metric | Value |
| --- | ---: |
| Clicks | 163 |
| Impressions | 47,758 |
| Average CTR | 0.34% |
| Average position | ~11.4 |
| Date range | May 18–Aug 17, 2026 |

Impressions grew 66% relative to Baseline 1 while clicks grew ~87%, keeping CTR flat at roughly 0.34%. The growth confirms the site is gaining indexing coverage, but conversion from impression to click remains the critical bottleneck. The second optimization batch targets that gap.

## First Optimization Batch

Logged: 2026-06-30

| Priority | Locale | URL | Query/topic | Baseline | Diagnosis | Action | Status | Recheck date |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | en/bn | `/en/figures/mirza-khizr-sultan`, `/bn/figures/mirza-khizr-sultan` | Mirza Khizr Sultan | 2,584 impressions, 0 clicks, avg position 10.13 | High visibility with no clicks. EN/BN already have custom `seoTitle` and `seoDescription`, so next work should test stronger above-fold answer and internal links rather than treating this as missing metadata. | Full content rewrite 2026-08-19: added specific Khooni Darwaza surrender/execution sequence, British post-execution criticism detail; new seoTitle and seoDescription in both locales. Impressions grew to 4,643 in the May 18–Aug 17 window before changes. | changed | 2026-09-16 |
| 2 | en/bn | `/en/figures/mirza-abu-bakr`, `/bn/figures/mirza-abu-bakr` | Mirza Abu Bakr | 253 impressions, 0 clicks, avg position 7.61 | Ranking is good enough to earn clicks, but previous figure metadata lacked explicit `seoTitle`/`seoDescription`; fallback title may have been too generic. | Initial: added localized `seoTitle` and `seoDescription` (2026-06-30). Further expanded 2026-08-19: full contribution/context/impact rewrite with Khooni Darwaza execution detail and crowd-expectation context; fixed BN "তিনি/তারা" placeholder. Impressions grew to 1,107 in the May 18–Aug 17 window. | changed | 2026-09-16 |
| 3 | en/bn | `/en/figures/mir-madan`, `/bn/figures/mir-madan` | Mir Madan | 130 impressions, 0 clicks, avg position 5.95 | Strong ranking but likely weak SERP differentiation against broad Plassey results. Previous metadata lacked explicit `seoTitle`/`seoDescription`. | Added localized snippet fields emphasizing Plassey, Siraj ud-Daulah, artillery command, battlefield death, and impact on the Nawab's camp. Internal-link work remains separate. | changed | 2026-07-28 |
| 4 | en/bn | `/en/figures/shaista-khan`, `/bn/figures/shaista-khan` | Shaista Khan | 103 impressions, 0 clicks, avg position 9.02 | BN page already has custom snippet fields; EN state should be checked before changing. Query intent may want quick biography plus Chittagong/Mughal Bengal connection. | Audit EN metadata, keep BN/EN meaning aligned, strengthen internal links from Mughal Bengal and Chittagong pages. | queued | 2026-07-28 |
| 5 | bn | `/bn/events/1947-partition-and-eastern-bengal` | 1947 Partition and Eastern Bengal | 9 clicks, 599 impressions, avg position 7.95 | Strongest known BN event page; opportunity is expansion and hub routing rather than basic snippet repair. | Treat as anchor page: improve links into related partition, language movement, and Bangladesh-history topic hubs; do not over-edit a page that is already earning clicks without query-level evidence. | queued | 2026-07-28 |

## Second Optimization Batch

Logged: 2026-08-19. Source: May 18–Aug 17, 2026 GSC export (47,758 impressions, 163 clicks, 0.34% CTR).

All changes in this batch were deployed 2026-08-19. Recheck dates are set 28 days out.

### Systemic fix — title double-append bug

Affected: ~161 events and ~281 figures without custom `seoTitle`. Root cause: `generateMetadata` functions concatenated `| Bengal Unfolded` manually while the root layout template also applies `%s | Bengal Unfolded`, producing titles like `Battle of Chausa, 1539: subtitle | Bengal Unfolded | Bengal Unfolded` in SERP results.

| Fix | Files changed | Status |
| --- | --- | --- |
| Removed hardcoded `| Bengal Unfolded` suffix from 17 page files; let `title` template handle appending | `events/[slug]/page.tsx`, `figures/[id]/page.tsx`, `periods/[id]/page.tsx`, `places/[id]/page.tsx`, `movements/[id]/page.tsx`, `creators/[id]/page.tsx`, `resources/[id]/page.tsx`, and 10 index/utility pages | deployed 2026-08-19 |

### Per-page content and snippet changes

| Priority | Locale | URL | Query/topic | Baseline (May 18–Aug 17) | Diagnosis | Action | Status | Recheck date |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | en/bn | `/en/figures/mirza-mughal`, `/bn/figures/mirza-mughal` | Mirza Mughal, Mughal prince 1857 | 6,727 impressions, 0 clicks | Highest-impression zero-click page on site. Prior content was a stub (~63 words), no `seoTitle`/`seoDescription`. Fallback title was double-appending. | Full rewrite: added Sipah Salar appointment, Delhi defense coordination, Khooni Darwaza execution by William Hodson, crowd-expectation context; new seoTitle/seoDescription in EN and BN. | changed | 2026-09-16 |
| 2 | en/bn | `/en/figures/mirza-khizr-sultan`, `/bn/figures/mirza-khizr-sultan` | Mirza Khizr Sultan | 4,643 impressions, 0 clicks | Already in First Batch as `queued`. Continued zero clicks despite existing seoTitle; content was thin on distinctive facts. | Full rewrite: Khooni Darwaza surrender/execution sequence, British post-execution criticism, role in 1857 Delhi defense. See First Batch row. | changed | 2026-09-16 |
| 3 | en/bn | `/en/figures/mirza-abu-bakr`, `/bn/figures/mirza-abu-bakr` | Mirza Abu Bakr | 1,107 impressions, 0 clicks | First-batch snippet change did not produce clicks. Content body lacked specific differentiating detail. | Further expanded: Khooni Darwaza execution, crowd-expecting-prisoner context, corrected BN "তিনি/তারা" placeholder. See First Batch row. | changed | 2026-09-16 |
| 4 | en/bn | `/en/figures/ishan-chandra-roy`, `/bn/figures/ishan-chandra-roy` | Ishan Chandra Roy, Pabna uprising | Not yet tracked in GSC at volume | Prior content was a stub (tagged `content-gap`). Missing `seoTitle`/`seoDescription`. Figure page would rank poorly and earn no clicks even if indexed. | Full rewrite: peasant samiti formation, legal-agitation methodology, Bengal Tenancy Act 1885 link; new seoTitle/seoDescription in EN and BN; tags changed from `["content-gap"]` to `["pabna","agrarian"]`. | changed | 2026-09-16 |
| 5 | en/bn | `/en/events/1873-1876-pabna-peasant-uprising`, `/bn/events/1873-1876-pabna-peasant-uprising` | Pabna Peasant Uprising | Not yet tracked at volume | No `seoTitle`/`seoDescription`. Fallback title double-appended. Event is the anchor page for Ishan Chandra Roy and agrarian-resistance content cluster. | Added `seoTitle: "Pabna Peasant Uprising (1873–1876)"` and seoDescription naming the Bengal Tenancy Act 1885 outcome in both locales. | changed | 2026-09-16 |
| 6 | en/bn | `/en/events/1576-battle-of-rajmahal`, `/bn/events/1576-battle-of-rajmahal` | রাজমহলের যুদ্ধ, Battle of Rajmahal | BN queries prominent in GSC; low CTR | No `seoTitle`/`seoDescription`. Three narrative sections (`whyItMatters`, `longTermLegacy`, `identityMemoryNotes`) were identical copy-paste, reducing page depth. | Added seoTitle/seoDescription in EN and BN; differentiated all three sections: whyItMatters covers Sultanate/Mughal dividing line, longTermLegacy covers provincial → nawabi → Company chain, identityMemoryNotes covers historiographical debate. BN seoDescription targets the `রাজমহলের যুদ্ধ কখন সংঘটিত হয়` query pattern. | changed | 2026-09-16 |

## Open Checks

- Confirm whether FAQ content should be emitted as `FAQPage` JSON-LD. Event pages currently render FAQ-like entries when quote sources start with `FAQ`, but schema should only be added when the FAQ is visibly present and editorially valid.
- Compare English and Bangla CTR by URL, not only by locale aggregate, before prioritizing translation work.
- Segment United States impressions by query before labeling the traffic irrelevant.
- Track homepage or non-locale paths separately, because the provided locale click totals do not exactly equal the total click count.

## Change History

| 2026-09-15 | Enriched A. M. M. Nasir Uddin in EN/BN with Election Commission leadership, civil-service background, 2024 appointment, 2026 election cycle, and evidence-conscious localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Akhtar Ahmed in EN/BN with Election Commission Secretariat responsibilities, his dated 2024 appointment, 2026 election administration, and time-sensitive localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Abu Jafar Shamsuddin in EN/BN with journalism, major fiction and essays, Language Movement participation, Kagmari Conference context, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched AB Party in EN/BN with its 2020 formation, 2024 Election Commission registration, reform-oriented public programme, eagle symbol, and dated leadership context; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Jagadish Chandra Bose in EN/BN with electromagnetic-wave experiments, plant physiology, Presidency College, Bose Institute, Bengal roots, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Sayyid Ahmad Barelvi in EN/BN with Tariqah-i-Muhammadiya reform, Calcutta visits, Titu Mir's connection, Bengal networks, and the 1831 Balakot context; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Satyajit Ray in EN/BN with Bengali cinematic practice, literary family roots in present-day Kishoreganj, major works, global influence, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Lalon Shah in EN/BN with Baul philosophy, Cheuriya akhda context, cautious treatment of disputed biography, cultural influence, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched A. A. K. Niazi in EN/BN with Pakistan Eastern Command responsibility, the 1971 war context, the Dhaka surrender, prisoner-of-war aftermath, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Mukunda Ray of Bhusna in EN/BN with Bhusna's strategic geography, Bara-Bhuiyan context, cautious source framing, family continuity, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Krishnachandra Ray of Nadia in EN/BN with Nadia zamindari, Company-era political alignment, Mir Qasim imprisonment, Bengali and Sanskrit patronage, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Alauddin Husain Shah in EN/BN with Hussain Shahi state formation, territorial expansion, Chittagong and Kamarupa, plural administration, Bengali literature, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Nusrat Shah in EN/BN with Hussain Shahi succession, Tirhut, the Ghogra settlement with Babur, Afghan-Mughal diplomacy, Portuguese trade, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Pratapaditya in EN/BN with Jessore and Dhumghat, Karrani-to-Mughal transition, naval power, 1608–09 diplomacy, the 1611–12 campaign, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Lakshmana Sena in EN/BN with Sena court culture, Sanskrit literary patronage, Nadia and Vikramapura, the 1204–05 conquest, and eastern-Bengal continuity; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Kedar Rai in EN/BN with Sripur and Vikrampur authority, naval warfare, Bhusna campaigns, shifting alliances, Arakanese and Portuguese connections, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Chand Rai in EN/BN with Vikrampur and Bhati context, the 1593 Bhusna operation, cautious genealogy, Bara-Bhuiyan networks, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Raja Sitaram Ray in EN/BN with Bhusna and Fathabad, Muhammadpur fortification, zamindari autonomy, the 1714–16 suppression campaign, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Raja Ganesh in EN/BN with his Bhaturia rise, Iliyas Shahi power struggle, cautious treatment of persecution narratives, Bengali-script coinage, and succession impact; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Jalaluddin Muhammad Shah in EN/BN with the Raja Ganesh succession crisis, conversion and legitimacy context, territorial consolidation, diplomacy, urban development, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Gopala I in EN/BN with post-conflict political context, cautious interpretation of the election tradition, Pala foundation, and Magadha expansion; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Dharmapala in EN/BN with Pala state formation, the Kanauj-centered tripartite struggle, cautious inscriptional context, Vikramashila, and Somapura; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Devapala in EN/BN with Pala expansion, cautious inscriptional context, Nalanda patronage, and Southeast Asian Buddhist networks; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Shah Alam II in EN/BN with the Buxar aftermath, 1765 Treaty of Allahabad, Bengal Diwani grant, and unequal Mughal-Company relationship; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Warren Hastings in EN/BN with Diwani administration, revenue and judicial restructuring, the Regulating Act, and balanced colonial legacy; added localized SEO metadata and re-ran the figure audit. |

| 2026-09-15 | Enriched Syed Sultan in EN/BN with Chittagong literary context, Nabibangsha, related devotional works, vernacular Islamic learning, and localized SEO metadata; re-ran the figure audit. |

| 2026-09-15 | Enriched Ballala Sena in EN/BN with specific Sena succession, Sanskrit scholarship, Danasagara, Adbhutasagara, and cautious Kulinism context; added localized SEO metadata and re-ran the figure audit. |

| Date | Change |
| --- | --- |
| 2026-09-15 | Enriched Vijaya Sena in EN/BN with specific Sena rise, Pala transition, regional expansion, Deopara Prashasti, and localized SEO metadata; re-ran the figure audit. |
| 2026-09-15 | Enriched Mahipala I in EN/BN with specific Pala revival, regional recovery, Somapura patronage, public works, and localized SEO metadata; re-ran the figure audit. |
| 2026-09-15 | Enriched Sikandar Shah in EN/BN with specific Iliyas Shahi consolidation, Ekdala defence, Adina Mosque, and architectural context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Mir Qasim in EN/BN with specific revenue and military reforms, dastak conflict, Monghyr, Buxar, and the transition toward Company Diwani; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Job Charnock in EN/BN with the 1690 Sutanuti settlement, Mughal commercial context, 1698 zamindari transition, and nuanced Calcutta-origin framing; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Harish Chandra Mukherjee in EN/BN with specific Hindoo Patriot editorship, indigo-rayiats reporting, social reform, and colonial public-sphere context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Dinabandhu Mitra in EN/BN with specific Nil Darpan, indigo resistance, Bengali theatre, James Long translation, and colonial public-sphere context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Manabendra Narayan Larma in EN/BN with specific Kaptai displacement, Jumma identity, PCJSS, Shanti Bahini, and Peace Accord context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched C. R. Das in EN/BN with specific Alipore case, Non-cooperation, Swaraj Party, Bengal Pact, and Calcutta Corporation context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Atisha Dipankara Srijnana in EN/BN with specific Vikramapura, Vikramashila, Pala-era Buddhist network, and Tibet context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Shah Muhammad Sagir in EN/BN with specific Yusuf-Zulekha, Ghiyasuddin Azam Shah, Bengali literary, and musical-form context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Todar Mal in EN/BN with specific Mughal revenue administration, Bengal campaign, and 1582 settlement context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Munim Khan in EN/BN with specific Akbar-era Bengal campaign, Tukaroi, Treaty of Katak, and early Mughal consolidation context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Fakhruddin Mubarak Shah in EN/BN with specific Sonargaon state formation, Chittagong, trade, and Ibn Battuta context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Sulaiman Khan Karrani in EN/BN with specific late-Afghan rule, Tanda, Orissa, and Akbar-era diplomatic context; added localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Expanded Islam Khan Chishti in EN/BN with specific Bhati and Afghan campaigns, the 1610 capital transfer to Dhaka, and localized SEO metadata; re-ran the figure audit. |
| 2026-09-15 | Expanded Shaista Khan in EN/BN with specific governorship, administrative, Chittagong campaign, and Dhaka context; strengthened localized SEO metadata and re-ran the figure audit. |
| 2026-09-15 | Enriched Rukunuddin Barbak Shah and Saifuddin Firuz Shah in EN/BN with specific Sultanate-era context and localized SEO metadata; re-ran the figure audit. |
| 2026-09-15 | Enriched Khwaja Usman and Paragal Khan in EN/BN with specific historical context and localized SEO metadata; re-ran the figure audit. |
| 2026-09-15 | Enriched Alaol and Bhaskaravarman in EN/BN with specific contextual biographies and localized SEO metadata; re-ran the figure audit. |
| 2026-09-15 | Updated locale homepage titles and descriptions to make the English/Bangla history archive intent explicit; production redeployment and title-source verification remain pending. |
| 2026-08-19 | Fixed title double-append bug in 17 page files: removed hardcoded `\| Bengal Unfolded` suffixes so the root layout `title.template` handles appending once. Affected event, figure, period, place, movement, creator, resource, and utility pages. |
| 2026-08-19 | Full content rewrites for Mirza Mughal (EN + BN): Sipah Salar role, Delhi defense, Khooni Darwaza execution; added seoTitle/seoDescription. |
| 2026-08-19 | Full content rewrites for Mirza Khizr Sultan (EN + BN): Khooni Darwaza surrender/execution sequence, British criticism detail; updated seoTitle/seoDescription. First-batch status changed from `queued` to `changed`. |
| 2026-08-19 | Further content expansion for Mirza Abu Bakr (EN + BN): Khooni Darwaza execution context, fixed BN "তিনি/তারা" placeholder. |
| 2026-08-19 | Full content rewrite for Ishan Chandra Roy (EN + BN): from stub to substantive — peasant samiti, legal-agitation method, Bengal Tenancy Act 1885 outcome; added seoTitle/seoDescription; removed `content-gap` tag. |
| 2026-08-19 | Added seoTitle/seoDescription to Pabna Peasant Uprising event (EN + BN), anchoring the agrarian-resistance content cluster. |
| 2026-08-19 | Added seoTitle/seoDescription to Battle of Rajmahal event (EN + BN); differentiated three previously identical narrative sections. |
| 2026-08-19 | Updated site baseline to Baseline 2 (May 18–Aug 17, 2026): 47,758 impressions, 163 clicks, 0.34% CTR. |
| 2026-06-30 | Added explicit EN/BN figure `seoTitle` and `seoDescription` fields for Mirza Abu Bakr and Mir Madan; marked both first-batch rows as `changed`. |
| 2026-06-30 | Created weekly GSC optimization workflow and logged the first five opportunities from the Apr 29-Jun 27, 2026 Search Console export. |
