# Changelog

## 2026-10-13

### Completed

- Began the people-only birth/death metadata pass with A. A. K. Niazi, Muhammad Ali Jinnah, Sam Manekshaw, Tikka Khan, and Yahya Khan.
  - Content backfill: added bilingual birth and death years; Jinnah's disputed birth year is explicitly marked with `?` rather than presented as certain.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes; the people-only queue is now 437 of 489 profiles missing at least one year.
  - Risk/known gaps: living people, collective entities, and uncertain historical dates remain excluded from forced completion and require separate editorial review.

- Continued the living-person birth-year pass with Dr. Muhammad Yunus, Mirza Fakhrul Islam Alamgir, Adilur Rahman Khan, Syeda Rizwana Hasan, and Nahid Islam.
  - Content backfill: added verified birth years in both locales and intentionally left death years absent for living profiles.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes; 430 of 489 individual profiles still lack a birth year and 436 lack a death year.

- Completed the final five-profile D-tier figure-content batch: Justice Shahabuddin Ahmed, Tikka Khan, Abul Hashim, Mahatma Gandhi, and Nurul Amin.
  - Content backfill: replaced generic EN/BN contribution, context, and impact text with specific coverage of the 1990 caretaker transition, the 1971 Eastern Command context, the Bengal Muslim League and United Bengal debate, Gandhi's Noakhali peace intervention, and the early East Bengal language and representation crisis.
  - Sensitive-history handling: described Tikka Khan's documented command position and association with Operation Searchlight without converting disputed downstream allegations into settled fact; kept the language-movement claims about Nurul Amin time-bounded and attributed.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports C=406, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment and image review remain follow-up work for profiles with sensitive or incomplete histories.

- Completed the next 20-profile figure-content batch: Zahir Raihan, Zohra Tajuddin, Abdul Matin, Abdur Rashid Tarkabagish, Abul Kasem, Ataur Rahman Khan, M. A. G. Osmani, Manik Mia, Sarat Chandra Bose, Tofail Ahmed, Imam Ahmad Sirhindi, Ashraf Ali Thanwi, Farrukh Ahmad, Jibanananda Das, Karamat Ali Jaunpuri, Muhammad Iqbal, Munshi Mohammad Meherullah, Professor Abdur Razzaq, Maulana Qasim Nanautavi, and Rashid Ahmad Gangohi.
  - Content backfill: expanded bilingual contribution, context, and impact fields across Liberation War, language movement, constitutional, literary, cinematic, political, and Islamic intellectual histories.
  - Sensitive-history handling: preserved cautious wording for wartime disappearance, political transitions, partition alternatives, and religious-intellectual influence across Bengal and South Asia.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=5, C=401, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Completed the next 20-profile D-tier figure-content batch: Jawaharlal Nehru, Kazi Motahar Hossain, Khwaja Shahabuddin, Major M. A. Jalil, Major Zafar Imam, Matia Chowdhury, Maulana Akram Khan, Meghnad Saha, Mir Shawkat Ali, Mohammad Toaha, Mostafa Kamal, Moudud Ahmed, Muhammad Shahidullah, Muzaffar Ahmad, Nihar Ranjan Ray, R. C. Majumdar, S. A. Rahman, Selina Hossain, Somnath Lahiri, and Sufia Kamal.
  - Content backfill: expanded bilingual contribution, context, and impact fields with specific language-movement, Liberation War, Partition, scientific, literary, agrarian, constitutional, and civic-history detail.
  - Sensitive-history handling: preserved careful wording for wartime command, partition boundaries, political transitions, and historiographical interpretation.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=15, C=391, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Completed the next 20-profile D-tier figure-content batch: Shamsul Alam, Suranjit Sengupta, Tahmid Abdullah, Vallabhbhai Patel, Wasim Akram, Yamin, Zahid Hossain, Abdul Jalil, Abdul Malek Ukil, Abdur Razzaq, Dr Alim Chowdhury, Binod Bihari Chowdhury, C. R. Dutta, Cyril Radcliffe, Dhirendranath Datta, Ghyasuddin Ahmed, Humayun Azad, Humayun Kabir, Ila Mitra, and Jasimuddin.
  - Content backfill: expanded bilingual contribution, context, and impact fields with specific language-movement, Liberation War, Partition, anti-colonial, democratic, literary, agrarian, and cultural-history detail.
  - Sensitive-history handling: kept July 2024 casualty profiles time-bounded and cautious; retained historically precise wording for targeted killings, partition boundaries, and wartime political roles.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=35, C=371, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Completed the next 10-profile D-tier figure-content batch: Kiran Shankar Roy, Mir Madan, Mujahidul Islam Selim, Nazmul Huq, Nur Hossain, Prafulla Chandra Ghosh, Riya Gope, Satya Ranjan Bakshi, Shaheed Rudro, and Shahnaz Rahmatullah.
  - Content backfill: expanded bilingual contribution, context, and impact fields with specific United Bengal, Plassey, Liberation War, democratic-movement, protest-memory, post-partition, and cultural-history detail.
  - Sensitive-history handling: kept July 2024 casualty profiles explicitly cautious where public biographical detail is incomplete; retained source-aligned wording for Nur Hossain, Nazmul Huq, and contested 1947 histories.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=55, C=351, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or incomplete histories.

- Began the D-tier figure-content enrichment pass with Mofazzal Haider Chaudhury.
  - Content backfill: replaced generic contribution, context, and impact text in EN/BN with source-backed academic, literary, and 1971 historical detail; added birth/death years, a sourced FAQ, and a martyred-intellectuals tag.
  - Sources: added Banglapedia and University College London reference records in both locales and linked them from the figure FAQ.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=92, C=316, B=90, A=54.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without an image asset; the remaining D-tier profiles require separate source-backed enrichment.

- Continued the D-tier figure-content enrichment pass with Kazi Arif Ahmed.
  - Content backfill: replaced generic EN/BN contribution, context, and impact text with sourced coverage of student organizing, the 1969 movement, Liberation War links, Jatiya Samajtantrik Dal leadership, and his 1999 killing; added a contextual FAQ and political-history tags.
  - Sources: added Daily Star and Prothom Alo retrospective records in both locales and linked them from the figure FAQ.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=91, C=316, B=91, A=54.
  - Risk/known gaps: the sources are editorial retrospectives, so political interpretation remains attributed and the profile does not add unsupported claims about the 1990 movement.

- Continued the D-tier figure-content enrichment pass with K. M. Obaidur Rahman.
  - Content backfill: replaced generic EN/BN contribution, context, and impact text with sourced coverage of student politics, the 1969 uprising, the 1971 non-cooperation movement and Liberation War, parliamentary service, and later party leadership; added biographical years, a sourced FAQ, and tags.
  - Sources: added Bangladesh Sangbad Sangstha and New Age records in both locales and linked them from the figure FAQ.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=90, C=316, B=92, A=54.
  - Risk/known gaps: the sources are editorial reports; the profile avoids expanding into the 1975 jail-killing allegations without a dedicated judicial source review.

- Completed the next 10-profile D-tier figure-content batch: Muhammad Kamaruzzaman, Rokeya Kabir, Selina Parvin, Shah Azizur Rahman, Shahidullah Kaiser, Shamsur Rahman, Sheikh Fazlul Haque Moni, Syed Shamsul Haq, Abdul Jabbar, and Abdul Mannan.
  - Content backfill: replaced generic or shallow EN/BN contribution, context, and impact text with profile-specific political, literary, cultural, and Liberation War context; expanded active periods where supported by existing event links and reference research.
  - Sensitive-history handling: kept Kamaruzzaman's tribunal history distinct from defence challenges; preserved attributed wording around Shah Azizur Rahman's wartime position, the 1975 killing, and the martyred-intellectual profiles.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=80, C=326, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: this batch improved profile depth but did not add image assets or new resource records; dedicated source-record backfills remain appropriate for the most sensitive profiles before further expansion.

- Completed the following 10-profile D-tier figure-content batch: Abdus Samad Azad, Abu Saleh Mohammad Akram, Amir Hossain Amu, Badiul Alam, Bidhan Chandra Roy, Bijan Kumar Mukherjea, Faisal Ahmed Shanto, Farhan Faiyaaz, Fazle Rabbi, and Hamidur Rahman.
  - Content backfill: expanded bilingual contribution, context, and impact fields with political, Partition, Liberation War, urban-resistance, martyred-intellectual, and 2024 protest-memory context.
  - Sensitive-history handling: retained uncertainty around 2024 casualty circumstances and used restrained wording for wartime targeted-killing and protest-memory claims.
  - Model/validation/UI: no schema or runtime changes required. `pnpm content:validate` passes for all 168 events; the figure audit now reports D=65, C=341, B=92, A=54, with zero generic-language flags and zero incomplete SEO profiles.
  - Risk/known gaps: image coverage remains unchanged at 156 profiles without image assets; source-record enrichment remains a follow-up for profiles with sensitive or disputed histories.

## 2026-09-18

### Completed

- Completed the remaining figure-content SEO metadata pass for Humayun, Ivy Rahman, Altaf Mahmud, Brigadier General Gulzar Uddin Ahmed, Kazi Nazrul Islam, Michael Madhusudan Dutt, Daud Khan Karrani, and Raja Rammohun Roy.
  - Content backfill: added localized SEO titles/descriptions, short answers, and documented event/place links or aliases where direct repository relationships existed; sensitive political and violence-related profiles retain time-bounded, legally precise wording.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the audit now reports zero profiles with incomplete SEO metadata and zero generic-language flags. The remaining queue is content-depth expansion and image review.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: 158 profiles remain without image assets, tracked separately from SEO completion.

- Continued the figure-content SEO audit through the next 10 profiles: Ahmad Sofa, Siddique ul-Islam (Bangla Bhai), Charu Majumdar, Khan Jahan Ali, Mufti Abdul Hannan, National Citizen Party, Shafiqur Rahman, Shambhu Nath Pal, Syed Abdullah Mohammad Taher, and Zainul Abedin.
  - Content backfill: added localized SEO titles/descriptions and short answers for all ten; preserved legal-status and political uncertainty wording for sensitive profiles and retained existing documented event/place links.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority profile with incomplete SEO metadata is now Humayun.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: image review remains separate from SEO completion; contemporary political profiles retain the repository’s existing time-bounded framing.

- Continued the figure-content SEO audit through the next 10 profiles: Shah Waliullah Dehlawi, Sheikh Abdur Rahim, Shibli Nomani, Syed Ahmad Khan, Syed Ameer Ali, Jagat Seth, Mir Jafar, Siraj ud-Daulah, Surendranath Banerjea, and Dhaka University Students.
  - Content backfill: added localized SEO titles/descriptions and short answers for all ten; expanded bilingual contribution, context, impact, and highlight fields for the event-linked historical profiles and added documented event/place links and aliases.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Ahmad Sofa.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: image-less intellectual profiles remain conservatively linked or unlinked where the event record does not document a direct relationship; image review remains separate from SEO completion.

- Continued the figure-content SEO audit through the next 10 profiles: Jibanananda Das, Karamat Ali Jaunpuri, Muhammad Iqbal, Munshi Mohammad Meherullah, Professor Abdur Razzaq, Maulana Qasim Nanautavi, Rashid Ahmad Gangohi, Robert Clive, Shah Abdul Aziz Dehlawi, and Shah Ismail Dehlawi.
  - Content backfill: added localized SEO titles/descriptions and short answers for all ten; expanded Robert Clive’s bilingual contribution, context, impact, and highlight fields and added documented event/place links. Existing image-less intellectual and religious profiles were not assigned speculative event links or image assets.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Shah Waliullah Dehlawi.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: broad intellectual and religious biographies remain conservatively framed around their existing Bengal-linked context; image review remains separate from SEO completion.

- Continued the figure-content SEO audit with Jahangir:
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, birth/death years, active period, aliases, event/place links, and search tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Jibanananda Das.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes.
  - Risk/known gaps: the profile stays focused on Bengal’s Mughal consolidation and Dhaka/Jahangirnagar; no new image asset was introduced.

- Continued the figure-content SEO audit with Ishwar Chandra Vidyasagar:
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, birth/death years, active period, aliases, event/place links, and search tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Jahangir.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes.
  - Risk/known gaps: reform and education claims are kept within the existing documented event context; no new image asset was introduced.

- Continued the figure-content SEO audit through the next 10 profiles: Isa Khan, Murshid Quli Khan, Nawab Abdul Latif, Shamsuddin Ilyas Shah, Abul Fazal, Imam Ahmad Sirhindi, Alivardi Khan, Ashraf Ali Thanwi, Ayub Khan, and Farrukh Ahmad.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields where needed; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Sultanate, Mughal, reform, literary, and East Pakistan political histories are framed with specific chronology and contextual wording.

# 2026-10-16

- Enriched Ashraf Ali Thanwi's English and Bengali profiles with scholarly context on Deobandi print culture, Bihishti Zewar, and his qualified political engagement with the Muslim League.
  - Sources: added bilingual Cambridge research article and book-chapter records; profile FAQs link directly to the supporting studies.
  - Relationships: retained his broad South Asian/Bengal context while clarifying he was based in North India; added no direct Bengal event link.
  - Model/validation/UI: no schema or UI changes; existing figure FAQ source validation is used.
  - Risk/known gaps: the profile avoids treating his advice to the Muslim League as unqualified endorsement or claiming a direct Bengal event role.

- Enriched Imam Ahmad Sirhindi's English and Bengali profiles with his Naqshbandi teaching, Maktubat, Mughal-era context, and carefully bounded Bengal connection through the order's networks.
  - Sources: added a bilingual Encyclopaedia Iranica reference record and linked the profile FAQs to it.
  - Relationships: retained Bengal as a regional connection through Naqshbandi networks; added no direct event link because the event catalog does not establish a direct role.
  - Model/validation/UI: no schema or UI changes; existing figure FAQ source validation is used.
  - Risk/known gaps: scholarly interpretations of Sirhindi's influence differ; the profile avoids presenting influence on Jahangir or Mughal policy as settled.

- Enriched Abul Fazal's English and Bengali figure profiles with biographical chronology, education and teaching career, Muslim Sahitya Samaj involvement, selected works, public positions, and literary recognition.
  - Sources: added the bilingual Banglapedia biography record and linked profile FAQs to it.
  - Relationships: added Chittagong as a relevant place; no event link was added because the current event records do not document a direct role.
  - Model/validation/UI: no schema or UI changes; the existing figure FAQ source validation is used.
  - Risk/known gaps: the profile follows Banglapedia's dates and summary; further literary analysis would need additional specialist sources.

- Revised the existing Haji Shariatullah figure profile in English and Bengali with a fuller, source-linked account of the Faraizi movement's formative phase, birth/death years, place context, and bilingual FAQs.
  - Content relationships: restricted `primaryEventIds` to the documented 1818 Faraizi movement chapter and linked the profile to Faridpur; removed unrelated Titu Mir and Rangpur uprising associations.
  - Documentation: clarified in `EDITORIAL_GUIDELINES.md` that movement figures should only receive primary event links when a direct role is documented.
  - Model/validation/UI: no schema, validator, or UI changes; existing figure fields and FAQ source validation are used.
  - Backfill: EN/BN figure metadata revised together; existing event figure and source relationships already covered this profile.
  - Risk/known gaps: details follow the existing Banglapedia reference record; its broader claims about agrarian politics are framed as context rather than unqualified conclusions.
