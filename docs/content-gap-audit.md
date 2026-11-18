# Bengal Unfolded Content Gap Audit

**Scope and method.** Snapshot of `content/` directories and the named contract/editorial/roadmap documents in this checkout, followed by comparison against Banglapedia, university curricula, archival collections, academic books, and institutional references. This is an editorial backlog, not a claim that every listed omission is equally urgent. “Missing” means no standalone event/profile/resource entity was found by slug/ID search; it does not mean the subject is wholly absent from summaries or linked resources. Proposed records must be checked against all current IDs before implementation.

## Existing Coverage Summary
- Total events: **168 event folders** (event slug is folder name).
- Total figures: **552 figure folders** (figure ID is folder name; index files are not counted).
- Total resources: **580 resource folders** (resource ID is folder name).
- Periods: **9** — ancient/pre-Sultanate; transition to Sultanate; independent Sultanate; Mughal incorporation; colonial rule/resistance; partition/late-colonial politics; Pakistan/national awakening; post-liberation state/democracy; contemporary memory/civic protest.
- Topics: **17**, from ancient Bengal and Pala-Sena to civic movements and Bangladesh history.
- Places: **60**, spanning Bengal, Bangladesh, cities, battle corridors, and selected frontier sites.
- Strongly covered periods: Sultanate through Mughal transition; Company/colonial resistance; 1905–1971 political sequence; 1971 war chapters; post-1971 coups, constitutional changes, elections, civic movements and recent politics.
- Weakly covered periods: ancient Bengal’s material/social life beyond dynastic and archaeological landmarks; Sultanate/Mughal economic, maritime and everyday history; colonial labour, public health, urban life and women’s history; post-1947 refugee/resettlement and minority experience; post-1971 economic, environmental and social history. The periods themselves are broad and political, so chronological coverage should not be mistaken for social-history depth.

**Inventory.** Event slugs: the 168 folder names in `content/events/`; figure IDs: the 552 folder names in `content/figures/`; resource IDs: the 580 folder names in `content/resources/`. The full inventories are intentionally left in those source directories to avoid duplicating hundreds of identifiers in a report. Period IDs: `ancient-and-pre-sultanate-bengal`, `transition-to-sultanate-formation`, `independent-bengal-sultanate-era`, `mughal-incorporation-and-consolidation`, `colonial-rule-and-resistance`, `partition-and-late-colonial-politics`, `pakistan-period-and-national-awakening`, `post-liberation-state-and-democracy`, `contemporary-memory-and-civic-protest`. Topic IDs: `ancient-and-early-medieval-bengal`, `bangladesh-history`, `bengal-culture-literature-and-memory`, `colonial-conquest-revenue-and-resistance`, `democracy-and-civic-movements`, `language-movement-and-mother-language-day`, `late-colonial-muslim-politics-and-agrarian-mobilization`, `liberation-war-1971`, `mughal-bengal-and-regional-resistance`, `pakistan-period-state-and-national-awakening`, `pala-sena-period-and-knowledge-culture`, `partition-and-identity`, `partition-of-bengal-1905`, `peasant-religious-and-rural-resistance`, `post-1971-state-crises-and-civic-contestation`, `state-formation-crisis-and-military-rule-1972-1990`, `sultanate-frontier-and-regional-islamization`. Place IDs are the 60 folders in `content/places/` (including `bengal-region`, `bangladesh`, `dhaka-jahangirnagar`, `calcutta-kolkata`, `murshidabad`, `sonargaon`, `chittagong-chattogram`, `sylhet`, `chittagong-hill-tracts`, `bhati-region`, `farakka`, and named war/border sites).

**Contract implications.** The present schema already supports optional event `quickAnswer`, `causes`, `consequences`, `misconceptions`, `faq`, `mapPoints`, SEO fields, sourced interpretive sections and claim citations; figure aliases, active dates, FAQs and event/place relations; resource quality/evidence and relation IDs; topic summaries, FAQs and learning paths; and richer place coordinates/names/history. Use `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, `docs/EDITORIAL_GUIDELINES.md`, and `scripts/validate-content.mjs` as the implementation authority. High-value event work should build source-backed timeline claims, source IDs, and EN/BN parity, and sensitive/contested claims should use the required metadata. This audit proposes no schema change.

## Missing High-Priority Events

The 1770 and 1943 famines already exist as events (`1770-great-bengal-famine`, `1943-bengal-famine`); they are listed under Undercovered Existing Events, not here.

### 1. Late-colonial 1937–1946 agrarian and provincial political realignment
- Suggested slug: `1936-1937-krishak-praja-party-rise-and-bengal-politics`
- Title EN: Krishak Praja Party and Bengal’s Agrarian Political Realignment
- Title BN: কৃষক প্রজা পার্টি ও বাংলার কৃষিভিত্তিক রাজনৈতিক পুনর্বিন্যাস
- Period: `partition-and-late-colonial-politics`
- Why important: Current 1937 ministry/election coverage can be strengthened with a clear account of peasant politics, Fazlul Huq’s coalition, Muslim League competition, landlord/tenant structures and the 1941–43 ministry changes. Do not reduce provincial Muslim politics to a single communal explanation.
- Suggested related figures: `ak-fazlul-huq`, `huseyn-shaheed-suhrawardy`, `khwaja-nazimuddin`, `abul-hashim`.
- Suggested source types: Bengal Legislative Assembly records, Banglapedia, scholarly provincial politics and agrarian history.
- Priority: high.

### 2. East Bengal refugee displacement and rehabilitation after 1947
- Suggested slug: `1947-1960-east-bengal-refugees-and-resettlement`
- Title EN: Partition Refugees and Resettlement in East Bengal
- Title BN: দেশভাগ-পরবর্তী পূর্ববঙ্গের উদ্বাস্তু ও পুনর্বাসন
- Period: `partition-and-late-colonial-politics` (or Pakistan period if date range requires; use actual period boundaries in validator).
- Why important: Partition, Radcliffe implementation and Sylhet referendum are well represented, but displacement, migration in both directions, citizenship/property, urban settlement and later rehabilitation are not visible as an event chapter. Treat Hindu and Muslim experiences and differing regional trajectories with balance.
- Suggested related figures: `jogendranath-mandal`, `cyril-radcliffe`, `sheikh-mujibur-rahman` only where evidence directly connects.
- Suggested source types: census/administrative records, refugee memoirs, archival newspapers, scholarly partition and migration studies.
- Priority: high; **needs careful sourcing** for communal violence, displacement figures and uneven records.

### 3. 1971 refugee crisis and international relief
- Suggested slug: `1971-bangladesh-refugee-crisis-and-international-response`
- Title EN: Bangladesh Refugee Crisis and International Response
- Title BN: ১৯৭১-এর বাংলাদেশি শরণার্থী সংকট ও আন্তর্জাতিক প্রতিক্রিয়া
- Period: `pakistan-period-and-national-awakening`
- Why important: The war has many military and political chapters but the mass flight to India, camps, relief, diplomatic pressure and return/displacement are not a dedicated event. It broadens the story beyond battles and national leadership.
- Suggested related figures: `indira-gandhi`, `tajuddin-ahmad`, `sheikh-mujibur-rahman` (source-check), refugee and relief organizations as institutions.
- Suggested source types: UNHCR/UN records, Indian parliamentary and government records, contemporary press, refugee testimony, scholarly work.
- Priority: high.

### 4. 1972–1975 reconstruction, nationalization and economic debate
- Suggested slug: `1972-1975-reconstruction-nationalization-and-economic-policy`
- Title EN: Reconstruction and Economic Policy in Early Bangladesh
- Title BN: স্বাধীনতার পর পুনর্গঠন, জাতীয়করণ ও অর্থনৈতিক নীতি
- Period: `post-liberation-state-and-democracy`
- Why important: The current sequence emphasizes constitution, famine and political crisis; it underexplains reconstruction, nationalization, aid, industrial policy and economic constraints. Present competing policy assessments with attribution.
- Suggested related figures: `sheikh-mujibur-rahman`, `tajuddin-ahmad`, `rehman-sobhan` (check if profile exists before linking).
- Suggested source types: planning documents, budgets, World Bank/ADB archival reports, scholarly political economy, memoirs.
- Priority: high.

### 5. Bengal maritime commerce and port networks, c. 1500–1750
- Suggested slug: `1500-1750-bengal-maritime-trade-and-port-networks`
- Title EN: Bengal’s Maritime Trade and Port Networks
- Title BN: বাংলার সামুদ্রিক বাণিজ্য ও বন্দর নেটওয়ার্ক
- Period: `mughal-incorporation-and-consolidation`
- Why important: The Mughal sequence is politically rich but trade, shipbuilding, ports, merchant communities and Indian Ocean connections are thin. Oxford’s *The Archaeology of Coastal Bengal* and Chaudhury’s work on precolonial companies and commerce offer strong bases. Keep coastal change and the limits of the evidence explicit.
- Suggested related figures: `shaista-khan`, `islam-khan-chishti`, `khwaja-wajid`.
- Suggested source types: archaeological reports, port/customs records, European company archives, academic maritime/economic histories.
- Priority: high.

### 6. Bengal’s jute industrialization and labour politics
- Suggested slug: `1855-1947-bengal-jute-industry-and-labour`
- Title EN: Bengal’s Jute Industry and Labour
- Title BN: বাংলার পাটশিল্প ও শ্রমিকজীবন
- Period: `colonial-rule-and-resistance`
- Why important: Industrial and labour history is markedly underrepresented against political biographies and rebellions. Jute connected rural cultivation, mill towns, migration, gendered work and global markets. Samita Sen’s *Women and Labour in Late Colonial India* is a strong scholarly anchor.
- Suggested related figures: `kalpana-datta`, `surendranath-banerjea` only for sourced connections; add worker/organizer figures only after source review.
- Suggested source types: factory/Company records, labour inquiry reports, union records, oral histories, scholarly economic and gender history.
- Priority: high.

### 7. 1969 mass uprising as a people’s movement chapter (review depth)
- Suggested slug: Existing `1969-mass-uprising`; enrich rather than duplicate.
- Title EN: 1969 Mass Uprising in East Pakistan
- Title BN: ১৯৬৯-এর গণঅভ্যুত্থান
- Period: `pakistan-period-and-national-awakening`
- Why important: It is present, but undercovered relative to its role linking the Six-Point movement, student politics, workers, rural protest and end of Ayub’s rule. This should be treated as enrichment, not a missing event.
- Suggested related figures: `abdul-hamid-khan-bhashani`, `sheikh-mujibur-rahman`, `matiur-rahman`, `shamsuzzoha`, student and worker groups.
- Suggested source types: contemporary newspapers, student/union records, oral histories, Banglapedia and scholarly work.
- Priority: medium.

### 8. Post-1971 women’s movement and gendered citizenship
- Suggested slug: `1970s-1990s-bangladesh-womens-movement-and-citizenship`
- Title EN: Women’s Movements and Citizenship in Bangladesh
- Title BN: বাংলাদেশে নারী আন্দোলন ও নাগরিকত্ব
- Period: `post-liberation-state-and-democracy`
- Why important: Women’s participation is named in some war and political pages, but organized women’s movements, legal reform, labour and public citizenship lack a coherent event chapter. Anchor in organizations and dated campaigns rather than a generic narrative.
- Suggested related figures: `sufia-kamal`, `rokeya-kabir`, `kalpona-akter`, `matia-chowdhury`.
- Suggested source types: organization archives, legal records, interviews/oral histories, scholarly gender history, Banglapedia.
- Priority: medium.

## Missing High-Priority Figures

Figure additions should be cross-checked against all 552 IDs and alternate-name variants before creation. Several prominent people may already be represented under a different transliteration; add only after confirming absence.

- Suggested figure ID: `taraman-bibi` | Name EN: Taraman Bibi | Name BN: তারামন বিবি | Role: Freedom fighter and Bir Pratik | Period: 1971 Liberation War | Related events: `1971-liberation-war`, `1971-mujibnagar-government` | Why important: A named woman combatant widens a war archive currently weighted toward male commanders and national leaders; Banglapedia’s “Women” entry documents her direct participation. | Suggested source types: official gallantry records, oral history, Banglapedia, archival interviews. | Priority: high.
- Suggested figure ID: `kakon-bibi` | Name EN: Kakon Bibi | Name BN: কাঁকন বিবি | Role: Freedom fighter and intelligence contributor | Period: 1971 Liberation War | Related events: `1971-liberation-war`, `1971-battle-of-sylhet` (verify exact links) | Why important: Significant woman participant from the border region; her biography should distinguish documented details from later popular retellings. | Suggested source types: official records, contemporaneous and later interviews, scholarly biographies. | Priority: medium; **needs careful sourcing** if claims vary.
- Suggested figure ID: `chittaprosad-bhattacharya` | Name EN: Chittaprosad Bhattacharya | Name BN: চিত্তপ্রসাদ ভট্টাচার্য | Role: Artist and famine documentarian | Period: 1943 famine / colonial Bengal | Related events: existing `1943-bengal-famine` event | Why important: His famine sketches offer a major visual record and a way to discuss art, witness and representation alongside Zainul Abedin. | Suggested source types: museum catalogues, archival prints, scholarly art history. | Priority: medium.
- Suggested figure ID: `samita-sen` | Name EN: Samita Sen | Name BN: সমিতা সেন | Role: Historian of gender and labour | Period: Late colonial Bengal | Related events: proposed jute/labour chapter | Why important: Key scholarly voice and source anchor for women’s labour in Bengal jute industry. | Suggested source types: university profile, peer-reviewed scholarship, book bibliography. | Priority: medium.
- Suggested figure ID: `sushil-chaudhury` | Name EN: Sushil Chaudhury | Name BN: সুশীল চৌধুরী | Role: Historian of Bengal commerce and merchant networks | Period: Precolonial/Mughal Bengal | Related events: proposed maritime trade chapter; `1690-english-settlement-calcutta` | Why important: Scholarship on merchants, companies, textiles and Bengal Suba broadens economic coverage and supplies reliable interpretive context. | Suggested source types: academic books/articles, university profiles. | Priority: medium.
- Suggested figure ID: `zainul-abedin` | Existing ID; enrich profile rather than add. | Name EN: Zainul Abedin | Name BN: জয়নুল আবেদিন | Role: Artist and famine witness | Period: Colonial Bengal / 1943 famine | Related events: proposed famine chapter | Why important: Already present; connect documented famine sketches and artistic record to social history, with source-backed image/provenance. | Suggested source types: Bangladesh National Museum, art-history scholarship, Banglapedia. | Priority: high (enrichment).
- Suggested figure ID: `women-jute-workers-bengal` | Name EN: Bengal Jute Mill Women Workers (collective profile) | Name BN: বাংলার পাটকলের নারী শ্রমিকেরা | Role: Collective historical actors | Period: Late colonial Bengal | Related events: proposed jute/labour chapter | Why important: A carefully scoped collective profile can make structural labour history visible where individual records are sparse; avoid inventing representative biographies. | Suggested source types: mill records, labour reports, oral histories, Samita Sen’s research. | Priority: medium; **needs careful sourcing**.

## Missing High-Priority Resources

Resource inventory is already large; prioritize authoritative, directly usable source anchors and avoid adding low-quality duplicate explainers. Confirm resource IDs and actual availability before implementation.

- Suggested resource ID: `famine-inquiry-commission-bengal-1945` | Title: *Report of the Famine Inquiry Commission* | Author/institution: Government of India Famine Inquiry Commission | Type: report/document | Quality guess: primary (official inquiry record; interpretive findings should still be compared with later scholarship) | Related events/figures: proposed 1943 famine; Zainul Abedin | Why useful: Government inquiry and contemporary administrative evidence for policy, chronology and mortality disputes. | Priority: high.
- Suggested resource ID: `transfer-of-power-1942-1947-vol-iv-bengal-famine` | Title: *The Transfer of Power, 1942–47*, Volume IV | Author/institution: P. N. S. Mansergh and E. W. R. Lumby, editors; UK official records | Type: archive/document collection | Quality guess: archive/primary | Related events/figures: 1943 famine; Quit India; Bengal provincial government | Why useful: Contemporary correspondence and official records; Banglapedia’s entry specifically identifies the famine volume and India Office records as valuable. | Priority: high.
- Suggested resource ID: `sen-poverty-and-famines-entitlement-approach` | Title: *Poverty and Famines: An Essay on Entitlement and Deprivation* | Author/institution: Amartya Sen | Type: book | Quality guess: secondary/academic | Related events/figures: proposed 1943 famine | Why useful: Foundational analytical interpretation for famine entitlement and causation; pair with the Famine Inquiry Commission and newer research. | Priority: high.
- Suggested resource ID: `women-and-labour-late-colonial-india-samita-sen` | Title: *Women and Labour in Late Colonial India: The Bengal Jute Industry* | Author/institution: Samita Sen, Cambridge University Press | Type: book | Quality guess: secondary/academic | Related events/figures: proposed jute/labour chapter; women workers | Why useful: Directly fills gendered labour and industrial history gaps with a scholarly monograph. | Priority: high.
- Suggested resource ID: `companies-commerce-merchants-bengal-precolonial-chaudhury` | Title: *Companies, Commerce and Merchants: Bengal in the Pre-Colonial Era* | Author/institution: Sushil Chaudhury | Type: book | Quality guess: secondary/academic | Related events/figures: proposed maritime trade chapter; Mughal Bengal | Why useful: Detailed coverage of merchant networks, trade privileges and textiles in Bengal Suba. | Priority: high.
- Suggested resource ID: `archaeology-of-coastal-bengal` | Title: *The Archaeology of Coastal Bengal* | Author/institution: Oxford University Press academic volume | Type: book | Quality guess: secondary/academic | Related events/figures: proposed maritime trade chapter; coastal places | Why useful: Adds archaeological and settlement evidence, complicating trade-only accounts of coastal development. | Priority: medium.
- Suggested resource ID: `liberation-war-of-bangladesh-documents-volumes` | Title: *Liberation War of Bangladesh: Documents* (multi-volume series) | Author/institution: Government of Bangladesh / Ministry of Information; reprinted by Ministry of Liberation War Affairs | Type: archive/document | Quality guess: primary/archive | Related events/figures: 1971 war, Mujibnagar, refugee crisis, operations | Why useful: The 15-volume series includes administration, armed struggle, genocide/refugees, foreign reaction and interviews; valuable but should be contextualized as an official collection and compared with independent archives. | Priority: high.
- Suggested resource ID: `bangladesh-refugee-crisis-1971-unhcr-archives` | Title: UN and contemporary records on the 1971 refugee crisis | Author/institution: UNHCR and relevant UN agencies (identify exact records before entry) | Type: archive/document | Quality guess: archive/primary | Related events/figures: proposed refugee-crisis event | Why useful: Supplies dated relief and displacement records outside national military narratives. | Priority: high.
- Suggested resource ID: `poverty-and-famines-amartya-sen` | Title: *Poverty and Famines: An Essay on Entitlement and Deprivation* | Author/institution: Amartya Sen, Oxford University Press | Type: book | Quality guess: secondary/academic | Related events/figures: 1943 Bengal famine | Why useful: Foundational account of entitlement-based famine analysis; useful when paired with famine inquiry records and subsequent scholarship. | Priority: high.
- Suggested resource ID: `bangladesh-reader-history-culture-politics` | Title: *The Bangladesh Reader: History, Culture, Politics* | Author/institution: Meghna Guhathakurta and Willem van Schendel, editors; Duke University Press | Type: book | Quality guess: secondary/academic | Related events/figures: social/cultural and postcolonial topics | Why useful: Broad collection of primary texts and scholarship for cultural, political and everyday-life enrichment; first search inventory for an existing edition/title variant. | Priority: medium.

## Undercovered Existing Events

- `1770-great-bengal-famine`: Keep the existing event, but add a stronger evidence-based account of Company policy, revenue, crop/weather context and the limits of mortality estimates. Include competing causal interpretations and avoid monocausal claims. Possible sources: Banglapedia famine entry; Company records; famine/economic scholarship.
- `1943-bengal-famine`: The standalone event exists. Enrich it with social history, war policy, food distribution, regional differences and source-backed historiography. Keep the Famine Inquiry Commission and Sen’s entitlement interpretation in dialogue rather than collapsing the debate.
- `1741-1751-maratha-raids-bengal`: Add chronology and region-specific effects, with careful distinction between later memory terms and contemporaneous documentation; connect agrarian disruption and migration where sourced.
- `1666-mughal-conquest-of-chittagong` and `1632-mughal-attack-on-portuguese-hooghly`: Add maritime and port context, local communities, trade and source limitations; several current source IDs appear Wikipedia-derived and should be supplemented by Banglapedia/academic work.
- `1793-permanent-settlement-in-bengal`: Expand beyond the policy enactment to subsequent land-tenure, rent and peasant consequences; link `1873-1876-pabna-peasant-uprising` and later tenancy legislation. Banglapedia’s Permanent Settlement entry identifies multiple 1870s/1880s eastern Bengal peasant movements that are currently not standalone event chapters.
- `1818-faraizi-movement-begins-in-eastern-bengal`: Add the movement’s phases, rural organization and agrarian context; avoid reducing religious reform to an economic proxy or vice versa.
- `1946-1947-tebhaga-movement`: Strengthen chronology, regional variation, women’s participation and relationship to wartime/famine dislocation. Include movement sources and scholarly debate.
- `1947-partition-and-eastern-bengal`, `1947-radcliffe-award-border-demarcation-implementation`, `1947-sylhet-referendum`: Add migration and resettlement, lived border implementation, citizenship/property and local variation. Preserve separate narratives for different communities and locations.
- `1969-mass-uprising`: Make student, worker and rural participation more visible; map sequence and connect to 1966 Six Points and 1970 election without implying a single inevitable path to 1971.
- `1971-liberation-war`, `1971-mujibnagar-government`, `1971-operation-searchlight-crackdown`, and battle/massacre pages: Add women, refugees, relief, local civilian experience and source triangulation. Each claim about deaths, sexual violence, responsibility or perpetrators needs specific citations and careful treatment.
- `1974-famine-emergency-and-state-crisis`: Separate event chronology from interpretations of policy/famine causation; incorporate food distribution, international aid, rural/urban differences and source-attributed estimates.
- `1997-chittagong-hill-tracts-peace-accord`: Strengthen Indigenous/ Jumma perspectives, land and implementation history, with source pluralism. Do not treat signature as resolution of all underlying conflicts.
- `2013-shahbag-movement` and `2013-shapla-chattar-crackdown`: Provide a sourced bridge explaining the International Crimes Tribunal context and divergent public/legal interpretations. Distinguish established chronology, allegations and adjudicated outcomes.
- `2018-a-year-of-protest-control-and-contested-legitimacy`, `2018-election`, `2024-anti-discrimination-movement`, `2024-july-crackdown-and-internet-shutdown`: Recent and politically sensitive content needs explicit time-stamped evidence, balanced source coverage, and clear separation between contemporaneous reporting, official statements and later findings. Revisit as records mature.

## Undercovered Existing Figures

- `zainul-abedin`: Enrich with sourced profile of the 1943 famine sketches, archival provenance, artistic choices and image rights; directly connect to famine event and famine visual resources.
- `begum-rokeya`: Add fuller historical context for educational reform, writing, institutional work and Muslim women’s public life; connect to a women’s movement/literary learning path.
- `sufia-kamal`: Expand role across literature, women’s organizing and civic politics, with dated organizational/event links and first-person/archive sources where available.
- `kalpana-datta` and `pritilata-waddedar`: Improve context on revolutionary networks, gender, colonial policing and later memory; ensure each account distinguishes documented actions from commemorative retelling.
- `ak-fazlul-huq`: Profile provincial governance, peasant politics, Lahore Resolution role, coalition changes and political disagreements; connect to 1937/1940/1943 events with sources.
- `jogendranath-mandal`: Add deeper context on Dalit politics, constitutional representation, Pakistan, resignation and partition; use multiple scholarly perspectives and primary correspondence.
- `manabendra-narayan-larma`: Add context on Indigenous political organizing, autonomy demands and the CHT conflict’s roots; connect to 1972 constitution and 1997 accord.
- `haji-shariatullah`, `dudu-miya`, `titu-mir`: Improve differentiation between reform, agrarian resistance and later nationalist memory; link primary/near-contemporary sources and scholarly discussion.
- `khwaja-wajid`, `jagat-seth`, `khwaja-salimullah`: Strengthen economic and institutional context (merchant banking, nawabi finance, Muslim political organization) with documented events rather than personality-only narrative.
- `taraman-bibi` and `kakon-bibi`: These are candidate missing profiles, subject to exact ID/alias search; prioritize women’s participation in 1971 and source-backed biography.
- Across figures: profile quality should be audited for contribution/context, exact birth/death or active dates, alternate names, primary event/place links, localized FAQ and source-backed image. The 552-profile count does not establish completeness or depth.

## Recommended Next 20 Additions

Ranked across new event chapters, figure profiles/enrichments, and source resources. Resource additions count only after duplicate-ID checks.

1. **Enrich the 1943 Bengal famine event** — it exists, but remains a major opportunity for stronger social history, source comparison and interpretation.
2. **1770 famine event enrichment** — keep existing event; add robust debate, sources and consequences.
3. **1947 refugee displacement/resettlement event** — addresses a major consequence missing from the political partition sequence.
4. **1971 refugee crisis/international relief event** — adds civilian and international dimensions.
5. **Early Bangladesh reconstruction/economic policy event** — fills the post-1971 social/economic gap.
6. **Bengal jute industry and labour event** — high-value economic and working-class history.
7. **Mughal/precolonial maritime commerce event** — gives substance to thin trade/port coverage.
8. **1937 agrarian/provincial political realignment chapter** — connects existing elections, Muslim politics and peasant mobilization.
9. **Post-1971 women’s movement chapter** — makes organized gender politics legible across decades.
10. **Taraman Bibi profile** — absence checked against `content/figures/` (no match); prominent, sourceable woman freedom fighter.
11. **Kakon Bibi profile** — absence checked against `content/figures/` (no match); add with careful biographical source review.
12. **Famine Inquiry Commission report resource** — primary official record for 1943 famine debate.
13. **Transfer of Power, 1942–47, Vol. IV resource** — archival record base for famine and wartime administration.
14. **Samita Sen, *Women and Labour in Late Colonial India* resource** — scholarly foundation for gendered jute-labour history.
15. **Sushil Chaudhury, *Companies, Commerce and Merchants* resource** — precolonial commerce and merchant networks.
16. **UNHCR/UN archival record set for 1971 refugees** — identify exact stable, citable records, then add.
17. **Enrich Zainul Abedin profile** — link famine art to event, provenance and visual record.
18. **Chittaprosad Bhattacharya profile** — famine witness/artist absence checked against `content/figures/` (no match).
19. **Enrich Jogendranath Mandal profile** — strengthen Dalit, partition and Pakistan-period history.
20. **Enrich Manabendra Narayan Larma profile** — strengthen Indigenous political history and CHT context.

## Research References and Source Anchors

- [Banglapedia, “Famine, 1943”](https://en.banglapedia.org/index.php?title=Famine%2C_1943) — sets out chronology, the Famine Inquiry Commission account and Sen’s entitlement interpretation; useful model for handling debate.
- [Banglapedia, “Peasant Movements”](https://en.banglapedia.org/index.php?title=Peasant_Movements) — overview of peasant mobilization and its historiographical limits.
- [Banglapedia, “Permanent Settlement”](https://en.banglapedia.org/index.php?title=Permanent_Settlement%2C_The) — identifies multiple eastern Bengal peasant movements in the 1870s and 1880s beyond the existing Pabna chapter.
- [Banglapedia, “Women”](https://en.banglapedia.org/index.php?title=Women) — women’s political, literary and Liberation War participation; names Taraman Bibi and other war participants.
- [Banglapedia, “Liberation War of Bangladesh: Documents”](https://en.banglapedia.org/index.php?title=Liberation_War_of_Bangladesh%3A_Documents) — describes the government’s multi-volume records, including refugee, genocide, armed struggle, foreign reaction and interview volumes.
- [Banglapedia, “Transfer of Power, 1942–47”](https://en.banglapedia.org/index.php/Transfer_of_Power%2C_1942-47) — identifies the famine-focused Volume IV and India Office Records.
- [Banglapedia, “Bengal Legislative Assembly”](https://en.banglapedia.org/index.php/Bengal_Legislative_Assembly) — election/ministry context for provincial coalition politics.
- [Banglapedia, “Islam, Bengal”](https://en.banglapedia.org/index.php?title=Islam%2C_Bengal) — long-run religious/political context; read critically alongside specialist scholarship.
- [Banglapedia, “Pala Rule”](https://en.banglapedia.org/index.php?title=Pala_Rule) and [“Political Geography”](https://en.banglapedia.org/index.php?title=Political_Geography) — useful ancient/early medieval baseline, but supplement with archaeological and inscriptional scholarship.
- [Oxford Academic, *The Archaeology of Coastal Bengal*](https://academic.oup.com/book/27641) — scholarly coastal settlement and archaeology; expressly complicates trade-as-single-cause explanations.
- [Cambridge University Press, *Women and Labour in Late Colonial India: The Bengal Jute Industry*](https://www.cambridge.org/core/books/women-and-labour-in-late-colonial-india/9F1BBD8ACD8B0A1B44E5595A84447BD) — gendered labour and jute industry scholarship (confirm stable edition URL at implementation).
- [Routledge, *Companies, Commerce and Merchants: Bengal in the Pre-Colonial Era*](https://www.routledge.com/Companies-Commerce-and-Merchants-Bengal-in-the-Pre-Colonial-Era/Chaudhury/p/book/9781315276830) — scholarship on merchants, textiles and precolonial companies.
- [UK National Archives education resource, “The Independence of Bangladesh in 1971”](https://cdn.nationalarchives.gov.uk/documents/education/independence-of-bangladesh-1971.pdf) — accessible teaching chronology and British archival context; use with records/scholarship rather than as sole authority.
- [Bangladesh Open University MA/MSS History handbook](https://bou.ac.bd/fontend/handbook/sshl/Handbook_MA_MSS.pdf) and [University of Dhaka history curriculum](https://duap.du.ac.bd/upload/download/MA_in_History_2018-19.pdf) — demonstrate recognized curriculum coverage for Bengal textiles/trade, women and social history; useful for gap checking, not primary historical evidence.

**Editorial caveat:** Banglapedia is a valuable reference base, but its entries may be dated and may reproduce contested claims. For politically sensitive episodes, pair it with primary records, peer-reviewed work, archives and independent institutional documentation. Validate every proposed source’s title, edition, stable URL, language, access status and quality label before creating resource metadata.
