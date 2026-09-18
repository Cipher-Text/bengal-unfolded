# Changelog

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
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Ishwar Chandra Vidyasagar.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; broad intellectual biographies without direct event packs remain linked to regional context rather than over-specific claims.

- Continued the figure-content SEO audit through the next 10 profiles: Anwar Hossain Manju, Begum Rokeya, Dinesh Chandra Sen, Fakhruddin Ahmed, Iajuddin Ahmed, Ikhtiyar al-Din Muhammad Bakhtiyar Khalji, Jadunath Sarkar, Jatin Das, Junaid Babunagari, and Kalpana Datta.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Political, emergency-rule, language, literary, medieval, and revolutionary histories are framed with specific chronology and contextual wording.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Mirza Fakhrul Islam Alamgir.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; broad biographies are linked conservatively to the nearest documented event context.

- Continued the figure-content SEO audit through the next 10 profiles: Mirza Fakhrul Islam Alamgir, General Moeen U Ahmed, Moin U Ahmed, Prafulla Chandra Ray, Shah Ahmad Shafi, Suniti Kumar Chatterji, Akbar, Bankim Chandra Chattopadhyay, Haji Shariatullah, and Imran H. Sarkar.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Contemporary political, emergency-rule, Shahbag, scientific, literary, medieval, and reform histories are framed with specific chronology and contextual wording.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Isa Khan.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; current political and counter-mobilization references are kept descriptive and time-bounded.

- Continued the figure-content SEO audit through the next 10 profiles: Walidad Khan, Washiqur Rahman, William Watts, Yar Latif Khan, Abdul Quader Mollah, Abdur Rab Serniabat, Abdus Sattar, Abul Kalam Azad, Abul Khair, and A. L. M. Fazlur Rahman.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. 1857, Shahbag, Plassey, constitutional, and Pilkhana wording distinguishes documented roles, public memory, and limits of the available record.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Anwar Hossain Manju.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; lesser-known regional and inquiry-era figures are described conservatively where source coverage is limited.

- Continued the figure-content SEO audit through the next 10 profiles: Anwar Hossain Manju, Begum Rokeya, Dinesh Chandra Sen, Fakhruddin Ahmed, Iajuddin Ahmed, Ikhtiyar al-Din Muhammad Bakhtiyar Khalji, Jadunath Sarkar, Jatin Das, Junaid Babunagari, and Kalpana Datta.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Political, emergency-rule, language, literary, and revolutionary histories are framed with specific chronology and contextual wording.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Mirza Fakhrul Islam Alamgir.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; several broad biographies are linked conservatively to the nearest documented event context.

- Continued the figure-content SEO audit through the next 10 profiles: Ranmat Singh, Rao Sahib Peshwa, Rao Tula Ram, Sahara Khatun, Shafiur Rahman, Shah Mal, Shahid Saber, Major General Shakil Ahmed, Sheikh Fazle Noor Taposh, and Sheikh Fazlul Karim Selim.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. 1857, Language Movement, Plassey, and Pilkhana wording distinguishes documented roles, public memory, and limits of the available record.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Surendra Sai.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; lesser-known regional and inquiry-era figures are described conservatively where source coverage is limited.

- Continued the figure-content SEO audit through the next 10 profiles: Surendra Sai, Surya Sen, Tamaddun Majlish, Tantia Tope, Tarique Ahmed Siddique, Teeka Singh, Titu Mir, Uda Devi Pasi, Umichand, and Veer Narayan Singh.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. 1857, Chittagong, Language Movement, Plassey, and Pilkhana wording distinguishes documented roles, public memory, and limits of the available record.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Walidad Khan.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; lesser-known regional and inquiry-era figures are described conservatively where source coverage is limited.

- Continued the figure-content SEO audit through the next 10 profiles: Novera Ahmed, Nur Mohammad, Ohiullah, Rabindranath Tagore, Rafiq Uddin Ahmed, Rai Durlabh Ram, Raja Nahar Singh, Rani Avantibai Lodhi, Rani Ishwari Kumari, and Rani Lakshmibai.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Language Movement, Partition, Plassey, and 1857 wording distinguishes documented roles, public memory, and limits of the surviving record.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Ranmat Singh.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; lesser-known regional figures are described conservatively where source coverage is limited.

- Continued the figure-content SEO audit through the next 10 profiles: Molla Fazle Akbar, Monirul Islam, Motiur Rahman Nizami, Muhammed Zafar Iqbal, Naba Singh Hazari, Nana Sahib, Narpat Singh, Nasiruddin Yousuff, Nawab Salimullah, and Niloy Neel.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Pilkhana, Shahbag, 1857, and Plassey wording separates documented association from broader interpretation and contested claims.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Novera Ahmed.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; inquiry-era and lesser-known regional figures are framed conservatively where records provide contextual rather than full biographical detail.

## 2026-09-17

### Completed

- Continued the figure-content SEO audit through the next 10 profiles: Mahmudur Rahman, Major General Mainul Islam, Mangal Pandey, Maulvi Ahmadullah Shah, Maulvi Liaquat Ali, Miran, Mirza Azam, Mohammad Jahangir Kabir Talukdar, Major General Mohammad Shamsul Alam Bir Pratik, and Mohanlal.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. 1857, Shahbag, Pilkhana, and Plassey language distinguishes documented roles from broader interpretation and contested accountability narratives.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Molla Fazle Akbar.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profiles retain their existing image assets; several inquiry-era and regional figures are described conservatively where public records provide contextual rather than full biographical detail.

- Continued the figure-content SEO audit through the next 10 profiles: Kamal Hossain, Khan Bahadur Khan Rohilla, Khwaja Abdul Hadi Khan, Khwaja Petruse, Khwaja Wajid, Kunwar Singh, Lord Curzon, Lucky Akter, Luke Scrafton, and Mahbub ul Alam Chowdhury.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and tags. Colonial, constitutional, Language Movement, and Shahbag wording is kept contextual and neutral.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Mahmudur Rahman.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: all ten profiles retain their existing image assets; lesser-known regional figures are framed conservatively where the source record is contextual.

## 2026-09-16

### Completed

- Continued the figure-content SEO audit through the next 10 profiles: Faisal Arefin Dipan, Firoz Shah, Ghaseti Begum, Ghulam Ghaus Khan, Gulab Singh Lodhi, Hamidur Rahman, Hasan Mahmud Khandaker, Jahangir Kabir Nanak, Jhalkari Bai, and Kadam Singh.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, source-linked FAQs, and tags. Sensitive publishing, Shahbag, tribunal, and Pilkhana wording distinguishes public association, allegations, and established findings.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Kamal Hossain.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: all ten profiles retain their existing image assets; some 1857 figures are documented primarily through regional or commemorative histories, so the wording avoids unsupported operational detail.

- Continued the figure-content SEO audit through the next 10 profiles: Amar Singh, Ananta Bijoy Das, Arif Jebtik, Asif Mohiuddin, Avijit Roy, Azimullah Khan, Bahadur Shah II, Bakht Bali, Bakht Khan, and Begum Hazrat Mahal.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, source-linked FAQs, and tags. Sensitive blogger-violence and Shahbag material distinguishes documented attacks from attribution and judicial findings.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Beni Madho Singh.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: all ten profiles retain their existing image assets; the 1857 profiles are framed as regional actors within a wider rebellion rather than as a single centrally directed movement.

- Continued the figure-content SEO audit through the next 10 profiles: Abul Kalam Shamsuddin, AFM Bahauddin Nasim, Ahmad Khan Kharal, Ahmed Rafiq, Ahmed Rajib Haider, Alauddin Al Azad, Ali Ahsan Mohammad Mujaheed, Ali Bahadur II, the All-Party State Language Action Committee, and Amanul Huq.
  - Content backfill: expanded bilingual contribution, context, impact, and highlight fields; added localized SEO titles/descriptions, short answers, temporal metadata where supported, aliases, event/place links, source-linked FAQs, and tags. Sensitive Shahbag, Pilkhana, and tribunal-related wording separates reported association, allegations, and judicial findings.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Amar Singh.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: all ten profiles retain their existing image assets; biographical details are limited where the linked event record provides only contextual association.

- Continued the figure-content SEO audit with Abul Barkat:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Dhaka University study, 21 February 1952 death, martyr memory, and Shaheed Minar connection; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, source-linked FAQs, and Language Movement tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abul Kalam Shamsuddin.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile retains its existing image asset; the account distinguishes the documented shooting and death from broader commemorative interpretation.

- Continued the figure-content SEO audit with Abdus Salam:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his civilian government employment, 21 February 1952 wounding, later death, and martyr memory; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, source-linked FAQs, and Language Movement tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abul Barkat.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile retains its existing image asset; the account distinguishes being wounded on 21 February from dying later in hospital.

- Continued the figure-content SEO audit with Abdul Wahed:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his documented arrest during the 1948 language protests and place in the longer organizing history before 1952; added localized SEO titles/descriptions, short answers, active-period metadata, aliases, event/place links, source-linked FAQs, and language-rights tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abdus Salam.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile retains its existing image asset; the account stays limited to the documented 1948 arrest and avoids assigning unsupported biographical details.

- Continued the figure-content SEO audit with Abdul Kahar Akond:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his CID role in the 2009 Pilkhana investigation, charge sheet, court-recorded dispute, and accountability context; added localized SEO titles/descriptions, short answers, active-period metadata, aliases, event/place links, and source-linked FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abdul Wahed.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile retains its existing image asset; sensitive allegations about investigative bias, torture, and trial fairness are attributed and separated from established procedural facts.

- Continued the figure-content SEO audit with Abdul Jabbar:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his civilian participation in the 21 February 1952 protest, fatal wounding, and martyr memory; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, source-linked FAQs, and Language Movement tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abdul Kahar Akond.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile retains its existing image asset; wording distinguishes his civilian status and reported fatal wounding from broader commemorative language.

- Continued the figure-content SEO audit with Abdul Gaffar Choudhury:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1952 lyric, writing and journalism career, and role in Ekushey memory; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, and source-linked FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abdul Jabbar.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile retains its existing image asset; cultural significance is described as public memory and commemoration rather than as an unqualified ranking.

- Continued the figure-content SEO audit with Musa Khan:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his succession to Isa Khan, Bhati leadership, resistance to Mughal expansion, and 1610 submission; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, and source-linked FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Abdul Gaffar Choudhury.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; dates and the transition into Mughal service are stated at the level supported by the available historical summaries.

- Continued the figure-content SEO audit with Siraj Sikder:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Sarbahara Party leadership, revolutionary politics, early-independence context, and contested custody death; added localized SEO titles/descriptions, short answers, temporal metadata, aliases, event/place links, source-linked FAQs, and political-history tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Musa Khan.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes reported custody death from later allegations about responsibility and avoids presenting contested claims as settled fact.

- Continued the figure-content SEO audit with Sher Shah Suri:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Afghan rise, 1538 capture of Gaur, 1539 Chausa victory, Sur imperial order, administrative legacy, and the limits of Mughal disruption; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, source-linked FAQs, and Gaur/Mughal-transition tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Siraj Sikder.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account separates Sher Shah's Bengal campaigns from his broader north Indian rule and avoids treating the Sur interlude as a permanent replacement for Mughal power.

- Continued the figure-content SEO audit with Shah A. M. S. Kibria:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1931–2005 life, diplomatic and UN career, 1996–2001 finance ministry, policy record, and 2005 assassination; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, FAQs, and diplomacy/finance-policy tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Sher Shah Suri.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account separates Kibria's documented offices and public legacy from responsibility and legal accountability for the attack that killed him.

- Continued the figure-content SEO audit with Shafiur Rahman:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1918–1952 life, 22 February 1952 death on Nawabpur Road, civilian/protester context, and Ekushey/Shaheed Minar memory; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, source-linked FAQs, and language-rights tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Shah A. M. S. Kibria.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes Shafiur Rahman's documented death and memorial role from broader claims about the movement's entire leadership or outcome.

- Continued the figure-content SEO audit with Salahuddin Quader Chowdhury:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his senior BNP and parliamentary career, 1971 accountability case, 2013 tribunal conviction, 2015 execution, and the distinction between court findings and criticism of the proceedings; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event links, active-period metadata, source-linked FAQs, and accountability/judiciary tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Shafiur Rahman.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; sensitive allegations and due-process criticism are attributed and kept separate from the tribunal's findings.

- Continued the figure-content SEO audit with Rafiq Uddin Ahmed:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1926–1952 life, 21 February 1952 martyrdom, language-rights context, and Ekushey/Shaheed Minar memory; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, source-linked FAQs, and language-memory tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Salahuddin Quader Chowdhury.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account avoids ranking Ahmed as the first martyr where historical summaries differ and keeps the memorial legacy distinct from claims about individual political leadership.

- Continued the figure-content SEO audit with Pulin Behari Das:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his founder-president role in the Dhaka Anushilan Samiti, Swadeshi-era organizing, colonial repression, and distinction from the later Chittagong Armoury Raid; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, source-linked FAQs, and revolutionary-network tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Rafiq Uddin Ahmed.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; later revolutionary events are retained as lineage context and are not attributed to Das as direct actions.

- Continued the figure-content SEO audit with Nizamul Huq:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his High Court and International Crimes Tribunal-1 roles, 2010 tribunal process, 2012 resignation, and the judicial-legitimacy debate around leaked communications; added localized SEO titles/descriptions, short answers, aliases, event links, active-period metadata, source-linked FAQs, and accountability/judiciary tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Pulin Behari Das.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; allegations about external influence are attributed to the controversy and are not presented as proof that any verdict was directed.

- Continued the figure-content SEO audit with Nawab Ali Chowdhury:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1863–1929 life, Dhanbari zamindari, Muslim League organizing, education patronage, and advocacy for Dhaka University; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, FAQs, and education/colonial-politics tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Nizamul Huq.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; Ali Chowdhury is described as a major advocate and contributor to Dhaka University rather than its sole founder.

- Continued the figure-content SEO audit with Nawab Abdul Ghani:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1813–1896 life, Dhaka Nawab status, waterworks, Buckland Bund and public-relief patronage, and the distinction between elite philanthropy and shared municipal/colonial delivery; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event/place links, active-period metadata, FAQs, and civic-history tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Nawab Ali Chowdhury.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the 1906 event link is retained as family/estate-era context, while Abdul Ghani's direct civic record is bounded to his lifetime.

- Continued the figure-content SEO audit with Mujibul Haque Chunnu:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Jatiya Party representation from Kishoreganj-3, labour-ministry role after the 2014 election, later secretary-general post, and the contested electoral context; added localized SEO titles/descriptions, short answers, aliases, event links, active-period metadata, FAQs, and parliamentary/labour-politics tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Nawab Abdul Ghani.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; office chronology is bounded to the documented parliamentary and party record, and the 2014 election is not presented as an uncontested democratic mandate.

- Continued the figure-content SEO audit with Man Singh I:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1594–1606 Bengal subahdari, 1595 establishment of Akbarnagar at Rajmahal, campaigns against Isa Khan and the Bhati resistance networks, and the limits of Mughal consolidation; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, source-linked FAQs, and Rajmahal/Baro-Bhuyans tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Mujibul Haque Chunnu.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes Man Singh's administrative and military reach from a complete or immediate Mughal conquest of eastern Bengal.

- Continued the figure-content SEO audit with Jamiat-e-Ulema-e-Islam Bangladesh:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with the party's ulama-oriented identity and cautious role in post-1990 religious-political, coalition, Shahbag-related, and 2026 election contexts; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, FAQs, and political-context tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Man Singh I.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the available record does not support assigning a specific 2026 result or treating Jamiat as interchangeable with other Islamist organizations.

- Continued the figure-content SEO audit with Farrukhsiyar:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1713–1719 reign, 1717 confirmation of Murshid Quli Khan, and the distinction between Mughal suzerainty and Bengal's growing provincial autonomy; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, source-linked FAQs, and administration/imperial-politics tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Jamiat-e-Ulema-e-Islam Bangladesh.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the 1717 settlement is described as an institutional development within Mughal sovereignty, not as immediate Bengali independence.

- Continued the figure-content SEO audit with Tarique Rahman:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his BNP chairmanship, return after 17 years in exile, and date-bounded leadership of the 2026 election campaign and post-election transition; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, source-linked FAQs, and party-leadership/political-transition tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Farrukhsiyar.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; contemporary election and transition claims are explicitly date-bounded and do not attribute the election or later reforms to Rahman alone.

- Continued the figure-content SEO audit with Sumi Abedin:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with her survivor-witness role after the 2012 Tazreen Fashions fire and documented 2013 international safety-campaign appearances; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, source-linked FAQs, and labor/factory-safety tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Tarique Rahman.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; it describes Abedin as a survivor-witness and campaign participant without attributing sector-wide reforms to her alone.

- Continued the figure-content SEO audit with Andaleeve Rahman Partho, the highest-priority unfinished profile at the start of this pass:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with date-bounded 2026 election and parliamentary-reform context; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Barrister Asaduzzaman Fuaad.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; contemporary political claims remain bounded to the 2026 election context and should be revisited as later reporting develops.
- Continued the figure-content SEO audit with Barrister Asaduzzaman Fuaad:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Barishal-3 candidacy, public campaign-funding appeal, and election-environment statements; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Badiul Alam Majumdar.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; campaign-finance figures and contemporary political positions remain attributed to dated reporting and should be revisited as later reporting develops.
- Continued the figure-content SEO audit with Badiul Alam Majumdar:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Electoral System Reform Commission leadership, 2025 recommendations, and 2026 election relevance; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Bhavadeva.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; commission recommendations are described as proposals and should not be read as evidence that every reform was adopted or implemented.
- Continued the figure-content SEO audit with Bhavadeva:
  - Content backfill: replaced generic English and Bangla copy with cautious inscriptional and archaeological context for the early Deva dynasty, Samatata, Devaparvata, and Mainamati; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, and FAQs; replaced the `content-gap` tag with `archaeology`/`প্রত্নতত্ত্ব`.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now David Hare.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the chronology is intentionally approximate because surviving inscriptional evidence does not provide a complete political narrative.
- Continued the figure-content SEO audit with David Hare:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with Hare's role in Hindu College, the Calcutta School-Book Society, the Calcutta School Society, Hare School, and the Young Bengal educational setting; added localized SEO titles/descriptions, short answers, aliases, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Debendranath Tagore.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the profile distinguishes Hare's institutional and patronage role from Derozio's later classroom leadership and the broader Young Bengal movement.
- Continued the figure-content SEO audit with Debendranath Tagore:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with the Tattvabodhini Sabha, Brahmo Samaj leadership, Tattvabodhini Patrika, Brahma Dharma, and later organizational divisions; added localized SEO titles/descriptions, short answers, birth/death years, aliases, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Dudu Miya.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account separates Debendranath's organizational and theological role from later Brahmo factions and does not treat the movement's influence as socially uniform.
- Continued the figure-content SEO audit with Dudu Miya:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his succession to Haji Shariatullah, agrarian mobilization, panchayat and khalifa organization, and conflicts with landlords and indigo planters; added localized SEO titles/descriptions, short answers, birth/death years, aliases, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Fazlur Rahman.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes peasant protection and social-justice aims from the movement's coercive conflicts and parallel dispute-resolution structures.
- Continued the figure-content SEO audit with Fazlur Rahman:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his BNP leadership, freedom-fighter identity, Kishoreganj-4 constituency, and 2026 election victory; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, and identity-disambiguation FAQs separating him from A. L. M. Fazlur Rahman.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Henry Louis Vivian Derozio.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; constituency and election-result details are bounded to the 2026 election record and should be revisited if official results or biographical records change.
- Continued the figure-content SEO audit with Henry Louis Vivian Derozio:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his 1826 Hindu College appointment, English literature and history teaching, 1828 Academic Association, 1831 dismissal, poetry, journalism, and Young Bengal legacy; added localized SEO titles/descriptions, short answers, birth/death years, aliases, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Maulana Junayed Al Habib.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes Derozio's influence on Young Bengal from the later student current's limited social reach.
- Continued the figure-content SEO audit with Maulana Junayed Al Habib:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his senior Jamiat role, BNP-led alliance seat-sharing, Brahmanbaria-2 constituency, date-palm candidacy, and loss to independent Rumeen Farhana; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Kalpona Akter.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account is bounded to the 2026 election record and avoids inferring broader religious or ideological positions from the candidacy alone.
- Continued the figure-content SEO audit with Kalpona Akter:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with her former garment-worker background, Bangladesh Centre for Worker Solidarity work, and advocacy after the Tazreen fire and Rana Plaza collapse; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, and FAQs; replaced the `content-gap` tag with labor-rights and factory-safety tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Keshab Chandra Sen.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; claims about post-disaster influence are phrased as advocacy and public participation rather than sole causation.
- Continued the figure-content SEO audit with Keshab Chandra Sen:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Brahmo Samaj leadership, 1866 Brahmo Samaj of India, 1880 New Dispensation, and the movement's internal divisions; added localized SEO titles/descriptions, short answers, birth/death years, aliases, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Khan Bahadur Ahsanullah.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes Sen's reform leadership from the broader Brahmo movement and notes later divisions rather than presenting the movement as internally uniform.
- Continued the figure-content SEO audit with Khan Bahadur Ahsanullah:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his education administration, writing, Muslim educational work, Ahsanullah institutions, and association with the educational planning around Dhaka University; added localized SEO titles/descriptions, short answers, birth/death years, aliases, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Koodi Molla.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; institutional attribution is phrased as association with educational planning and later Ahsania initiatives, not sole credit for their creation.
- Continued the figure-content SEO audit with Koodi Molla:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his place as a follower of Ishan Chandra Roy and organizer associated with the 1873 Pabna Raiyats’ League; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, FAQs, and agrarian-history tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Krishak Praja Party.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes Koodi Molla’s documented follower and organizer role from sole leadership of the wider uprising.
- Continued the figure-content SEO audit with Krishak Praja Party:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with the party’s 1936 formation, peasant-tenant program, 1937 election, coalition ministry, and organizational limits; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, FAQs, and political-history tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Mahdi Amin.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; agrarian promises, coalition participation, and later organizational tensions are described as distinct parts of the party’s history rather than as a single consistent program.
- Continued the figure-content SEO audit with Mahdi Amin:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his BNP election-steering spokesperson role, chairman’s adviser role, January–February 2026 briefings, and attribution of campaign claims; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Matangini Hazra.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; contemporary statements are explicitly framed as BNP positions or projections rather than independent election findings.
- Continued the figure-content SEO audit with Matangini Hazra:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with her Salt Satyagraha, anti-chowkidari-tax activism, Gandhian organizing, and 1942 Quit India procession; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Mohammad Ali Jauhar.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account uses dated biographical and government sources and avoids expanding her documented role beyond the Tamluk and Midnapore context.
- Continued the figure-content SEO audit with Mohammad Ali Jauhar:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Khilafat and Non-Cooperation leadership, The Comrade and Hamdard journalism, Jamia Millia Islamia connection, and 1923 Congress presidency; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event links, active-period metadata, FAQs, and journalism tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Rumeen Farhana.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account separates his early Khilafat and Non-Cooperation alliance from later political developments rather than implying a single unchanging position.
- Continued the figure-content SEO audit with Rumeen Farhana:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with her barrister and former BNP lawmaker background, 2026 independent candidacy, Brahmanbaria-2 victory, and party-nomination context; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, FAQs, and parliament/women-in-politics tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Salahuddin Ahmed.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; constituency, expulsion, and election-result claims are bounded to the 2026 election record and attributed to election reporting.
- Continued the figure-content SEO audit with Salahuddin Ahmed:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his BNP standing-committee role, Cox’s Bazar-1 victory, and 2026 appointment as Home Affairs Minister; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, FAQs, and parliamentary/governance tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Shah Jalal.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; current ministerial and constituency details are bounded to the 2026 election and government record and should be revisited if officeholders change.
- Continued the figure-content SEO audit with Shah Jalal:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with the 1303 Sylhet transition, shrine culture, Ibn Battuta’s 1345–46 reference, and the distinction between inscriptional evidence and later hagiographic traditions; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Shaukat Ali.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; exact biographical details and miracle narratives are presented cautiously because the surviving record mixes inscriptional, literary, travel, and later devotional sources.
- Continued the figure-content SEO audit with Shaukat Ali:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his Ali Brothers leadership, Khilafat organization, Non-Cooperation alliance, and colonial imprisonment; added localized SEO titles/descriptions, short answers, birth/death years, aliases, event links, active-period metadata, FAQs, and anti-colonial tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Sikandar Khan Ghazi.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account distinguishes the Ali Brothers’ Khilafat–Non-Cooperation alliance from the movement’s later decline and changing political context.
- Continued the figure-content SEO audit with Sikandar Khan Ghazi:
  - Content backfill: expanded the English and Bangla contribution, context, impact, and highlight fields with his military role in the 1303 Sylhet campaign, the 1512 inscriptional attribution, and the distinction between political-military and spiritual-historical narratives; added localized SEO titles/descriptions, short answers, aliases, event/place links, active-period metadata, and FAQs.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Srichandra.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the account treats later inscriptional and literary evidence as support for the conquest while avoiding unwarranted certainty about the campaign’s detailed chain of command.
- Continued the figure-content SEO audit with Srichandra:
  - Content backfill: replaced generic English and Bangla copy with inscription-led context for the Chandra dynasty, tenth-century southeastern Bengal, Samatata–Harikela, copperplate grants, Buddhist identity, and religious patronage; added localized SEO titles/descriptions, short answers, aliases, active-period metadata, FAQs, and epigraphy/archaeology tags.
  - Documentation: regenerated `docs/figure-content-audit.csv`; the next highest-priority unfinished profile is now Sumi Abedin.
  - Model/validation/UI: no schema, validator, or runtime changes required. `pnpm content:validate` passes for all 168 events.
  - Risk/known gaps: the profile remains image-free pending editorial image review; the reign’s chronology and territorial extent remain approximate because the surviving record is inscriptional and incomplete.

## 2026-09-15

### Completed

- Added automatic figure-photo discovery: figure detail pages now use `/figures/<figure-id>.webp` whenever the matching asset exists, so new default photos do not require EN/BN metadata edits. Explicit `image` metadata remains available for exceptions.
- Hardened figure-image ingestion and documentation:
  - Updated the ChatGPT/uploader prompt with anti-reconstruction rules, master-versus-production output guidance, and no-text/no-watermark constraints.
  - Standardized new photographic production assets on WebP, max 1200px width, quality 85; retained SVG support for existing organization marks/logos.
  - Added figure image path, locale-parity, extension, and file-existence checks to `scripts/validate-content.mjs`.
  - Removed homepage figure-photo rendering so figure images follow the documented detail-page-only policy; figure detail pages continue to use `object-contain`.
  - Updated the image workflow to require both `pnpm content:validate` and `node scripts/audit-figure-images.mjs`.
  - Current audit baseline: 551 figures, 391 metadata-linked images, 160 missing images, zero broken references, zero invalid paths, zero locale mismatches, and zero orphan assets.
  - Improved locale homepage SEO metadata with descriptive English/Bangla titles and source-backed archive descriptions; no schema, validator, or content-model changes required. Production redeployment and verification remain pending because the live `/en` title previously showed a duplicated site name.
  - Added `pnpm content:audit:figures`, which ranks all figure profiles by generic language, content depth, SEO metadata completeness, image coverage, and event linkage in `docs/figure-content-audit.csv`.
  - Enriched Alaol and Bhaskaravarman in both locales with specific literary, political, and historical context; removed their generic profile copy and added localized SEO metadata.
  - Enriched Khwaja Usman and Paragal Khan in both locales with specific resistance, administration, literary, and regional context; removed their generic profile copy and added localized SEO metadata.
  - Enriched Rukunuddin Barbak Shah and Saifuddin Firuz Shah in both locales with specific Sultanate-era political, administrative, literary, and architectural context; removed their generic profile copy and added localized SEO metadata.
  - Expanded Shaista Khan in both locales with his 1664–1688 governorship, administrative role, 1666 Chittagong campaign, and Dhaka building activity; strengthened localized SEO metadata.
  - Expanded Islam Khan Chishti in both locales with the Bhati and Afghan campaigns, 1610 capital transfer to Dhaka, and the limits of Mughal control in 1613; added localized SEO metadata.
  - Enriched Sulaiman Khan Karrani in both locales with late Afghan rule, Tanda, Orissa expansion, Akbar-era diplomacy, and localized SEO metadata; replaced generic profile copy.
  - Enriched Fakhruddin Mubarak Shah in both locales with Sonargaon state formation, Chittagong expansion, Ibn Battuta's trade account, and localized SEO metadata; replaced generic profile copy.
  - Enriched Munim Khan in both locales with Akbar's Bengal campaign, the 1575 Battle of Tukaroi, Treaty of Katak, and the limits of early Mughal control; added localized SEO metadata.
  - Enriched Todar Mal in both locales with Mughal revenue administration, Bengal campaign activity, the 1582 settlement, and localized SEO metadata; replaced generic profile copy.
  - Enriched Shah Muhammad Sagir in both locales with the Yusuf-Zulekha tradition, Ghiyasuddin Azam Shah's patronage, Bengali literary form, and localized SEO metadata; replaced generic profile copy.
  - Enriched Atisha Dipankara Srijnana in both locales with Vikramapura origins, Vikramashila scholarship, Pala-era Buddhist networks, Tibet, and localized SEO metadata; replaced generic profile copy.
  - Enriched C. R. Das in both locales with Alipore case advocacy, Non-cooperation, Swaraj Party, Bengal Pact, Calcutta Corporation, and localized SEO metadata; replaced generic profile copy.
  - Enriched Manabendra Narayan Larma in both locales with Kaptai displacement, Jumma identity, PCJSS, Shanti Bahini, and Peace Accord context; added localized SEO metadata.
  - Enriched Dinabandhu Mitra in both locales with Nil Darpan, indigo resistance, Bengali theatre, James Long's translation, and localized SEO metadata; replaced generic profile copy.
  - Enriched Harish Chandra Mukherjee in both locales with Hindoo Patriot editorship, indigo-rayiats reporting, social reform, and localized SEO metadata; replaced generic profile copy.
  - Enriched Job Charnock in both locales with the 1690 Sutanuti settlement, Mughal commercial context, 1698 zamindari transition, and a nuanced Calcutta-origin account; added localized SEO metadata.
  - Enriched Mir Qasim in both locales with revenue and military reforms, dastak conflict, Monghyr, Buxar, and the transition toward Company Diwani; replaced generic profile copy and added localized SEO metadata.
  - Enriched Sikandar Shah in both locales with Iliyas Shahi consolidation, Ekdala's defence, Adina Mosque, and localized SEO metadata; replaced generic profile copy.
  - Enriched Mahipala I in both locales with the Pala revival, regional recovery, Somapura patronage, public works, and localized SEO metadata; replaced generic profile copy.
  - Enriched Vijaya Sena in both locales with the Sena rise, Pala transition, regional expansion, Deopara Prashasti, and localized SEO metadata; replaced generic profile copy.
  - Enriched Ballala Sena in both locales with Sena succession, Danasagara, Adbhutasagara, cautious Kulinism context, and localized SEO metadata; replaced generic profile copy.
  - Enriched Syed Sultan in both locales with Chittagong literary context, Nabibangsha, related devotional works, vernacular Islamic learning, and localized SEO metadata; replaced generic profile copy.
  - Enriched Warren Hastings in both locales with Diwani administration, revenue and judicial restructuring, the Regulating Act, and a balanced colonial legacy; added localized SEO metadata.
  - Enriched Shah Alam II in both locales with the Buxar aftermath, 1765 Treaty of Allahabad, Bengal Diwani grant, and unequal Mughal-Company relationship; added localized SEO metadata.
  - Enriched Devapala in both locales with Pala expansion, cautious inscriptional context, Nalanda patronage, and Southeast Asian Buddhist networks; added localized SEO metadata.
  - Enriched Dharmapala in both locales with Pala state formation, the Kanauj-centered tripartite struggle, cautious inscriptional context, Vikramashila, and Somapura; added localized SEO metadata.
  - Enriched Gopala I in both locales with the post-conflict political context, cautious interpretation of the election tradition, Pala foundation, and Magadha expansion; added localized SEO metadata.
  - Enriched Jalaluddin Muhammad Shah in both locales with the Raja Ganesh succession crisis, conversion and legitimacy context, territorial consolidation, diplomacy, urban development, and localized SEO metadata.
  - Enriched Raja Ganesh in both locales with his Bhaturia rise, Iliyas Shahi power struggle, cautious treatment of persecution narratives, Bengali-script coinage, and succession impact; added localized SEO metadata.
  - Enriched Raja Sitaram Ray in both locales with Bhusna and Fathabad, Muhammadpur fortification, zamindari autonomy, the 1714–16 suppression campaign, and localized SEO metadata.
  - Enriched Chand Rai in both locales with Vikrampur and Bhati context, the 1593 Bhusna operation, cautious genealogy, Bara-Bhuiyan networks, and localized SEO metadata.
  - Enriched Kedar Rai in both locales with Sripur and Vikrampur authority, naval warfare, Bhusna campaigns, shifting alliances, Arakanese and Portuguese connections, and localized SEO metadata.
  - Enriched Lakshmana Sena in both locales with Sena court culture, Sanskrit literary patronage, Nadia and Vikramapura, the 1204–05 conquest, and eastern-Bengal continuity; added localized SEO metadata.
  - Enriched Pratapaditya in both locales with Jessore and Dhumghat, Karrani-to-Mughal transition, naval power, 1608–09 diplomacy, the 1611–12 campaign, and localized SEO metadata.
  - Enriched Nusrat Shah in both locales with Hussain Shahi succession, Tirhut, the Ghogra settlement with Babur, Afghan-Mughal diplomacy, Portuguese trade, and localized SEO metadata.
  - Enriched Alauddin Husain Shah in both locales with Hussain Shahi state formation, territorial expansion, Chittagong and Kamarupa, plural administration, Bengali literature, and localized SEO metadata.
  - Enriched Krishnachandra Ray of Nadia in both locales with Nadia zamindari, Company-era political alignment, Mir Qasim imprisonment, Bengali and Sanskrit patronage, and localized SEO metadata.
  - Enriched Mukunda Ray of Bhusna in both locales with Bhusna's strategic geography, Bara-Bhuiyan context, cautious source framing, family continuity, and localized SEO metadata.
  - Enriched A. A. K. Niazi in both locales with Eastern Command responsibility, the 1971 military and political context, the Dhaka surrender, prisoner-of-war aftermath, and localized SEO metadata; replaced generic profile copy.
  - Enriched Lalon Shah in both locales with Baul philosophy, Cheuriya akhda context, cautious treatment of disputed biography, cultural influence, and localized SEO metadata.
  - Enriched Satyajit Ray in both locales with Bengali cinematic practice, literary family roots in present-day Kishoreganj, major works, global influence, and localized SEO metadata.
  - Enriched Sayyid Ahmad Barelvi in both locales with Tariqah-i-Muhammadiya reform, Calcutta visits, Titu Mir's connection, Bengal networks, and the 1831 Balakot context; added localized SEO metadata.
  - Enriched Jagadish Chandra Bose in both locales with electromagnetic-wave experiments, plant physiology, Presidency College, Bose Institute, Bengal roots, and localized SEO metadata.
  - Enriched AB Party in both locales with its 2020 formation, 2024 Election Commission registration, reform-oriented public programme, eagle symbol, and dated leadership context; added localized SEO metadata.
  - Enriched Abu Jafar Shamsuddin in both locales with journalism, major fiction and essays, Language Movement participation, Kagmari Conference context, and localized SEO metadata.
  - Enriched Akhtar Ahmed in both locales with Election Commission Secretariat responsibilities, his dated 2024 appointment, 2026 election administration, and time-sensitive localized SEO metadata.
  - Enriched A. M. M. Nasir Uddin in both locales with his Election Commission leadership, civil-service background, 2024 appointment, 2026 election cycle, and evidence-conscious localized SEO metadata.

## 2026-09-01

### Completed

- Redesigned the bilingual homepage as a curated historical discovery experience:
  - Added live archive counts from events, figures, periods, and resources.
  - Added exploration paths, featured chapter, six-milestone timeline preview, people, places, topics, connected-history chain, methodology, and contribution panels.
  - Reused existing `EventMeta.relatedEvents`, figure/place/topic loaders, locale routes, theme tokens, and archival components; no schema or validator changes required.
  - Added the homepage presentation module at `src/components/home/HomeDiscovery.tsx` and kept full pagination/interactivity on `/[locale]/timeline` and entity indexes.

## 2026-08-19

### Completed

- SEO metadata title double-append bug fix (all page types):
  - UI/runtime:
    - Removed hardcoded `| Bengal Unfolded` suffix from title strings in 17 `generateMetadata` functions across events, figures, movements, periods, places, creators, resources, timeline, topics, paths, compare, and both event sub-page types (figures and resources sub-pages).
    - The root `layout.tsx` already applies a `%s | Bengal Unfolded` Next.js title template; the duplicated suffix caused every fallback title to render as `"… | Bengal Unfolded | Bengal Unfolded"` in Google and browser tabs.
    - Simplified event fallback title formula from `"title, year: subtitle"` (up to 187 chars, subtitle not meant for SERP) to `"title (year)"`.
    - Fixed figures index page title from `"Figures | EN | Bengal Unfolded"` to `"Historical Figures"` (locale-aware).
  - Model/validation/backfill:
    - No schema or validator changes required.

- GSC-driven content depth expansion (second optimization batch):
  - Content backfill:
    - Mirza Mughal (`mirza-mughal`, EN + BN): expanded stub content (63 words, no SEO fields) to include Sipah Salar appointment, four-month Delhi siege coordination, capture by Hodson, and Khooni Darwaza execution on 22 September 1857; added `seoTitle` and `seoDescription` in both locales.
    - Mirza Khizr Sultan (`mirza-khizr-sultan`, EN + BN): replaced generic "associated with military mobilization" text with specific Khooni Darwaza execution detail and criticism of post-surrender killings; strengthened `seoDescription` beyond "Profile of X…" pattern.
    - Mirza Abu Bakr (`mirza-abu-bakr`, EN + BN): replaced placeholder "he/they" text (BN) with specific Khooni Darwaza surrender and execution sequence; improved `seoDescription` from "Profile of X…" to substantive differentiation.
    - Ishan Chandra Roy (`ishan-chandra-roy`, EN + BN): expanded stub to include peasant samiti formation, legal-agitation emphasis, court-based resistance model, and connection to Bengal Tenancy Act 1885; added `seoTitle` and `seoDescription` in both locales; removed `content-gap` tag.
    - Pabna Peasant Uprising (`1873-1876-pabna-peasant-uprising`, EN + BN): added `seoTitle` and `seoDescription` in both locales.
    - Battle of Rajmahal (`1576-battle-of-rajmahal`, EN + BN): added `seoTitle` and `seoDescription`; differentiated `whyItMatters`, `longTermLegacy`, and `identityMemoryNotes` which had been copy-pasted identically across all three fields; updated BN `claimCitations` to reflect the differentiated section text.
  - Documentation:
    - Updated `docs/SEO_GSC_OPTIMIZATION_LOG.md` with the new site baseline from the May 18–Aug 17, 2026 GSC export; logged the second optimization batch; marked changed items in the first batch.
  - Model/validation/UI:
    - No schema, validator-rule, or runtime changes required.
    - `pnpm content:validate` passes for all 168 events.

## 2026-06-30

### Completed

- Search Console optimization loop:
  - Content backfill:
    - Added localized `seoTitle` and `seoDescription` fields for `mirza-abu-bakr` and `mir-madan` in both EN and BN figure metadata.
  - Documentation:
    - Added `docs/SEO_GSC_OPTIMIZATION_LOG.md` with the weekly GSC export workflow, opportunity criteria, tracking fields, first baseline snapshot, and first five queued optimization targets.
    - Updated `docs/SEO_GSC_OPTIMIZATION_LOG.md` to mark the Mirza Abu Bakr and Mir Madan snippet updates as changed.
    - Marked `RM-SEO-005` complete in `docs/ROADMAP.md`.
  - Model/validation/UI:
    - No schema, validator-rule, or runtime changes were required.

## 2026-06-28

### Completed

- Consolidated duplicate Syed Ameer Ali figure content:
  - Content backfill:
    - Replaced live references to placeholder `syed-amir-ali` with the richer canonical `syed-ameer-ali` figure record.
    - Removed duplicate `syed-amir-ali` figure metadata in both EN and BN locales.
  - Model/validation/UI:
    - Removed `syed-amir-ali` from `SUPPORTED_FIGURE_IDS`.
    - No schema, validator, or UI changes required.

## 2026-06-23

### Completed

- Documentation alignment for shipped public pages:
  - Documentation:
    - Updated `docs/CONTENT_MODEL.md` with an explicit public route inventory covering the live locale routes for resources, Source Directory, places, comparison, methodology, join, topics, paths, glossary, and timeline surfaces.
    - Updated `docs/ROADMAP.md` so shipped route surfaces are represented as completed items, including the Resource Directory, Source Directory, places pages, and public collaboration page.
    - Renamed the future roadmap place-page item to clarify that only the richer expanded place experience remains pending, not the already shipped basic place pages.
  - Model/validation/UI/backfill:
    - No schema, validator, runtime, or content-data changes were required for this pass.

## 2026-06-22

### Completed

- Before/after event navigation cards:
  - UI/runtime:
    - Upgraded event detail page before/after navigation into visual adjacent-chapter cards with summaries, years, period context, and clearer timeline boundary states.
    - Preserved the existing chronological previous/next lookup and locale-aware event routes.
  - Model/validation:
    - No schema or validator changes required; the cards use existing `EventMeta` fields.
  - Content backfill:
    - No content-data changes required.

## 2026-06-21

### Completed

- Removed obsolete dedicated book pages:
  - UI/runtime:
    - Deleted the `/{locale}/books/{id}` route.
    - Removed `/books/*` entries from the generated sitemap.
    - Kept academic books discoverable through the Resources surface as `academic-books`.
  - Model/validation:
    - Removed dedicated `Book` IDs/types and book-specific reverse lookup helpers from the runtime content layer.
    - No content JSON backfill required; existing book-like records remain normal resources.
  - Documentation:
    - Updated the content model to state that books are resources, not dedicated page entities.

- Removed live placeholder event content:
  - Content backfill:
    - Removed the generic `1920s-1930s` event pack and all references from topic, place, and resource metadata.
    - Left concrete surrounding chapters such as `1919-1924-khilafat-movement-bengal`, `1923-bengal-pact`, `1937-bengal-provincial-election-and-coalition-ministry`, and `1946-1947-tebhaga-movement` as the discoverable late-colonial sequence.
  - Model/validation:
    - Removed the placeholder slug from `SUPPORTED_EVENT_SLUGS`.
    - No schema changes required.

- Linked period and movement detail pages:
  - UI/runtime:
    - Event overview period and movement chips now link to their detail pages when IDs exist.
    - Added period and movement detail pages to the generated sitemap.
  - Model/validation:
    - No schema changes required.

## 2026-06-18

### Completed

- Source Directory copy refresh:
  - UI/runtime:
    - Renamed the public `/[locale]/creators` index experience to Source Directory in English and `সূত্রপঞ্জি` in Bengali, replacing creator-oriented page copy.
    - Updated hero, search helper text, listing heading, stats labels, empty state, card CTA, and header navigation copy so the page reads as a historical source/reference directory.
    - Kept route names, filtering, pagination, archive visual design, and bilingual behavior unchanged.
  - Model/validation/backfill:
    - No schema changes required; the page still reuses internally derived `Creator` records from existing resource attribution metadata.
    - No validation-rule or content backfill changes required.
  - Documentation:
    - Updated content-model and agent-facing docs to distinguish the public Source Directory naming from the internal `Creator` type/API names.

## 2026-06-16

### Completed

- Content relationship and topic-link audit:
  - Content backfill:
    - Rewrote placeholder bilingual metadata for `1828-brahmo-samaj-and-bengal-social-reform` and `1975-november-7-sepoy-janata-uprising` with specific, source-backed summaries, why-it-matters copy, period/place/movement placement, and related-event links.
    - Corrected the 1975 cluster classification and links across the August 15 assassination, jail killing, November 7 uprising, Zia assassination, and Ershad coup sequence.
    - Fixed the `2024-anti-discrimination-movement` map point from `pilkhana-dhaka` to `dhaka-university`.
    - Connected previously stranded resources into event resource lists, resource metadata, and topic hubs for post-1991 politics and civic movements.
  - Model/validation:
    - No schema, enum, or validator changes required.
  - UI/runtime:
    - No UI changes required; existing event, resource, Source Directory, topic, and place routes consume the revised relationships.
  - Validation:
    - `pnpm content:validate` passes.

## 2026-06-15

### Completed

- 2010 tribunal-origin chapter:
  - Content backfill:
    - Added bilingual event packs for `2010-international-crimes-tribunal-begins` with source-backed event metadata, timeline, quotes, figure links, and resource links.
    - Positioned the chapter as the missing bridge between `1971-liberation-war` and the 2013 justice-politics chain.
    - Rewired `2013-shahbag-movement` and `2013-shapla-chattar-crackdown` so the tribunal-era sequence is explicit in event relationships and topic discovery.
    - Integrated the chapter into the `post-1971-state-crises-and-civic-contestation`, `democracy-and-civic-movements`, and `liberation-war-1971` topic hubs.
  - Model/validation:
    - Registered the new event slug in `src/types/content.ts`.
    - No schema or validator-rule changes were required beyond the slug registry update.
  - UI/runtime:
    - No UI changes required; existing event and topic routes consume the new content pack.
  - Validation:
    - `pnpm content:validate` passes.

- 1996 caretaker-system formation chapter:
  - Content backfill:
    - Added bilingual event packs for `1996-thirteenth-amendment-and-caretaker-government` with source-backed event metadata, timeline, quotes, figure links, and resource links.
    - Linked the new chapter to the 1991 democratic-return event and to the later caretaker-crisis and caretaker-abolition chapters.
    - Integrated the chapter into the `post-1971-state-crises-and-civic-contestation`, `democracy-and-civic-movements`, and `bangladesh-history` topic hubs.
  - Model/validation:
    - Registered the new event slug in `src/types/content.ts`.
    - No schema or validator-rule changes were required beyond the slug registry update.
  - UI/runtime:
    - No UI changes required; existing event and topic routes consume the new content pack.
  - Validation:
    - `pnpm content:validate` passes.

- 1971 declaration/proclamation chapter:
  - Content backfill:
    - Added bilingual event packs for `1971-declaration-and-proclamation-of-independence` with source-backed event metadata, timeline, quotes, figure links, and resource links.
    - Positioned the chapter between the March crisis and Mujibnagar sequence in Liberation War topic discovery.
    - Linked the new chapter into the `1971-liberation-war` relationship cluster and the macro `bangladesh-history` topic.
  - Model/validation:
    - Registered the new event slug in `src/types/content.ts`.
    - No schema or validator-rule changes were required beyond the slug registry update.
  - UI/runtime:
    - No UI changes required; existing event and topic routes consume the new content pack.
  - Validation:
    - `pnpm content:validate` passes.

- Content planning audit:
  - Documentation:
    - Added `docs/content-gap-priority-events.md` to convert the repo audit into a concrete backlog of missing major event chapters.
    - Prioritized six high-value event candidates with proposed slugs, topic placement, related-event context, and repo-local source anchors.
    - Marked the generic `1920s-1930s` chapter for replacement by concrete late-colonial peasant-politics events.
  - Model/validation/UI:
    - No schema, validator, UI, or content-data changes in this pass.

## 2026-06-14

### Completed

- Key-figure image backfill:
  - Content backfill:
    - Added sourced figure images for `all-india-muslim-league`, `indian-national-congress`, `islam-khan-chishti`, `shaista-khan`, `asaduzzaman-khan-kamal`, `rao-farman-ali`, `nawab-abdul-latif`, and `syed-ameer-ali`.
    - Updated both EN and BN figure metadata with matching `image` paths.
  - Documentation:
    - Updated `docs/figure-image-sources.md` with source and license/status notes.
    - Refreshed `docs/figure-images-audit.md` and regenerated `docs/missing-images-report.csv`.
  - Validation:
    - `pnpm content:validate` passes.
  - Model/UI:
    - No schema or UI changes required; the backfill uses the existing optional figure `image` field.

## 2026-06-13

### Completed

- External resource link audit:
  - Content backfill:
    - Crawled all external `content/resources/*/meta.en.json` `href` values and revised stale 404/ENOTFOUND/ECONNREFUSED links where reliable replacements were available.
    - Updated EN/BN resource metadata together when source attribution changed, including stale Banglapedia, ILO, UN Peacemaker, Daily Star, Penguin, and document-archive links.
    - Preserved publisher/paywall/access-blocked links where the crawl returned 401/403 but the source remains a valid scholarly, institutional, or publisher reference.
  - Model/validation:
    - No schema or validator changes required.
  - UI/runtime:
    - No UI changes required; resource pages consume the existing `href`, attribution, and source-quality fields.
  - Validation:
    - `pnpm content:validate` passes.
    - Final crawl found no confirmed 404s; one Daily Star URL timed out during automated crawl and should be treated as transient unless it repeats.

## 2026-06-11

### Completed

- Content gap batch from repo/source audit:
  - Content backfill:
    - Added bilingual event packs for Wari-Bateshwar, the Chandra-Deva-Mainamati regional polity, Khan Jahan Ali and Bagerhat-Khalifatabad, the Pabna Peasant Uprising, Ziaur Rahman's assassination, Operation Clean Heart, the Fifteenth Amendment/caretaker abolition, and the Tazreen Fashions fire.
    - Split the 2024 Anti-Discrimination Movement into child chapters for the July crackdown/internet shutdown, the 5 August Hasina resignation, and the Yunus interim government formation while preserving the existing parent overview.
    - Added missing bilingual figure records for `srichandra`, `bhavadeva`, `ishan-chandra-roy`, `koodi-molla`, `shambhu-nath-pal`, `kalpona-akter`, and `sumi-abedin`; linked the existing `khan-jahan-ali` figure to the new Bagerhat event.
    - Added bilingual resource records for the new event pages using Banglapedia, UNESCO, HRW, Amnesty, ILO, Clean Clothes Campaign, and constitutional/reference sources.
    - Enriched thin 1971 battle/massacre pages with fuller source-backed timeline entries and contextual quote cards.
  - Model/validation:
    - Registered the new event slugs and figure IDs in `src/types/content.ts`.
    - No schema or validator rule changes required; existing content validation rules covered the new files.
  - UI/runtime:
    - No UI changes required; event, figure, source, and child-event rendering use existing runtime paths.
  - Risk/known gaps:
    - Several new pages intentionally use broad existing place nodes because adding precise places requires validator/type allowlist expansion.
    - Sensitive/contested entries use cautious framing and should be revisited when higher-quality primary records become available.
  - Validation:
    - `pnpm content:validate` passes.

## 2026-06-07

### Completed

- Place coverage backfill:
  - Content backfill:
    - Relinked 17 existing events from generic `bengal-region` to existing specific places including Sylhet, Chittagong/Chattogram, Calcutta/Kolkata, Lahore, Dhaka University, Racecourse/Suhrawardy Udyan, Mujibnagar, Chittagong Hill Tracts, and Shahbag.
    - Added 10 bilingual place records for high-value missing sites: `hilli`, `garibpur`, `kamalpur`, `kushtia`, `chuknagar`, `jinjira-keraniganj`, `old-dhaka`, `gulshan-holey-artisan`, `dhanmondi-32`, and `dhaka-central-jail`.
    - Relinked the matching battle, massacre, and Dhaka urban-site events to the new place records.
  - Model/validation:
    - Added the new place IDs to `SUPPORTED_PLACE_IDS`.
    - Added the new place IDs to `scripts/validate-content.mjs` allowed place validation.
  - Documentation:
    - Refreshed AI project inventory counts after the place backfill.
  - Validation:
    - `pnpm content:validate` passes.
  - UI/runtime:
    - No UI changes required; event and place pages consume the existing `placeId`/`placeLabel` fields.

- Figure image backfill:
  - Content backfill:
    - Added sourced WEBP images for 10 high-priority key figures: `aak-niazi`, `sam-manekshaw`, `daud-khan-karrani`, `ishwar-chandra-vidyasagar`, `jahangir-mughal`, `raja-rammohun-roy`, `akbar`, `atisha-dipankara-srijnana`, `haji-shariatullah`, and `manabendra-narayan-larma`.
    - Updated both EN and BN figure metadata with matching `image` paths.
  - Documentation:
    - Added `docs/figure-image-sources.md` with source and license/status notes.
    - Refreshed `docs/figure-images-audit.md` with current coverage, inventory, and remaining gaps.
    - Regenerated `docs/missing-images-report.csv` so completed figures no longer appear in the priority list.
    - Updated `docs/ADDING_FIGURE_IMAGES.md` to require source tracking.
  - Validation:
    - `pnpm content:validate` passes.
  - Model/UI:
    - No schema or UI changes required; the backfill uses the existing optional figure `image` field.

## 2026-06-06

### Completed

- RM-VIS-002 Cause -> event -> effect visual chain:
  - UI/runtime:
    - Added a bilingual visual chain on event detail pages that maps causes to the current event and then to consequences.
    - Included linked cause/effect chapters from existing typed relationships when available.
    - Added the chain to event page jump navigation.
  - Model/validation/backfill:
    - No schema changes required; the component uses existing `causes`, `consequences`, and `relatedEvents` data.
    - No content backfill required.

## 2026-06-04

### Completed

- Figure entity and group consistency audit:
  - Model:
    - Extended `Figure.group` to include `intellectual` and `revolutionary` alongside existing figure groups.
  - Validation:
    - Added strict figure `group` validation in `scripts/validate-content.mjs`.
  - UI/runtime:
    - Added localized labels and list-filter options for `intellectual` and `revolutionary`.
    - Confirmed entity-type inference derives `person`, `party`, `alliance`, and `organization` from explicit party/alliance IDs plus organization/collective groups.
  - Content backfill:
    - Corrected individual cultural figures previously marked as `collective`.
    - Corrected plural 1990 organizer records from `coordinator` to `collective`.
    - Normalized Jamaat-e-Islami Bangladesh from `collective` to `organization`.
  - Risk/known gaps:
    - Entity type remains derived rather than stored directly in figure JSON.

## 2026-05-29

### Completed

- Manual SEO controls for high-impression entity/resource pages:
  - Model:
    - Added optional `EventResource.seoTitle` and `EventResource.seoDescription` fields.
    - Existing optional event and figure SEO fields remain backward-compatible.
  - Validation:
    - Added localized optional validation for resource `seoTitle`/`seoDescription`.
    - Tightened figure `seoTitle`/`seoDescription` validation when present.
  - UI/runtime:
    - Event, figure, and resource metadata generation now prefers manual `seoTitle`/`seoDescription` and falls back to the existing generated title/description logic.
    - Resource metadata descriptions now use the shared `normalizeMetaDescription` helper.
  - Content backfill:
    - Added EN/BN manual SEO titles and descriptions for priority event pages: 1765 Diwani Rights, 1793 Permanent Settlement, and 1906 Muslim League founding in Dhaka.
    - Added EN/BN manual SEO titles and descriptions for priority figures: Mirza Khizr Sultan and Shaista Khan.
    - Added EN/BN source-context SEO metadata for the Reuters 2024 violence death-toll resource and the Mirza Khizr Sultan Wikipedia resource.
    - Renamed the Mirza Khizr Sultan Wikipedia resource title so it no longer duplicates the main figure page title.
  - Risk/known gaps:
    - Resource detail pages still need richer explanatory body sections in a follow-up pass.
    - Locale-aware `<html lang>` remains a separate technical SEO/accessibility task.

- Source Directory:
  - UI/runtime:
    - Added `/[locale]/creators` list page with keyword search, source type filter, resource category filter, minimum resource count filter, and pagination.
    - Added source counts and resource previews so users can browse resource-linked people and institutions before opening detail pages.
  - SEO/discovery:
    - Added localized metadata, sitemap entries, and header navigation for the directory.
  - Model/validation/backfill:
    - No schema changes required; the page reuses internally derived `Creator` records from existing resource attribution metadata.
    - No content backfill required.

- RM-011 Glossary hover/tooltips:
  - UI/runtime:
    - Upgraded inline glossary links in event narrative and timeline detail text with localized hover/focus previews.
    - Kept glossary links navigable to `/{locale}/glossary/[term]` while exposing definitions through accessible labels and CSS tooltips.
    - Extended controlled glossary linking to render multiple terms per narrative string.
  - Model/validation/backfill:
    - No schema changes required; previews reuse existing glossary term definitions.
    - No content backfill required.

- RM-010 Content density controls:
  - UI/runtime:
    - Added event-page reading mode controls for `quick read` and `deep read`.
    - Quick read keeps the event overview, quick answer, and why-it-matters sections visible while hiding deeper reference sections.
    - Deep read remains the default complete chapter view with timeline, figures, resources, citations, debates, and legacy sections.
  - Model/validation/backfill:
    - No schema changes required; quick mode uses existing `quickAnswer` when present and falls back to `summary`.
    - No content backfill required.

- Glossary expansion batch 1:
  - Content/backfill:
    - Added 26 bilingual high-value glossary entries covering ancient Bengal, Pala-Sena history, Sultanate and Mughal administration, colonial revenue and peasant resistance, late-colonial constitutional politics, Pakistan period, Liberation War, and contemporary Bangladesh.
    - Expanded glossary coverage from 8 to 34 terms.
  - UI/runtime:
    - Added controlled term-linking patterns for the new glossary entries in EN/BN narrative text.
    - Updated the glossary index to display terms chronologically from ancient Bengal to contemporary Bangladesh, grouped by historical era.
  - Model/validation:
    - No schema changes required; entries use the existing `GlossaryTerm` contract.

- RM-008/RM-011A/RM-011B/RM-011F Learning paths:
  - UI/runtime:
    - Added `/[locale]/paths` learning-path discovery with static mode filters: beginner, student, researcher, and exam-prep.
    - Added `/[locale]/paths/[slug]` detail pages derived from existing `Topic.learningPath[]` metadata.
    - Added roadmap-style numbered step UI for guided reading across events, figures, resources, places, periods, and topics.
    - Added topic-backed difficulty labels (`beginner`, `intermediate`, `advanced`) without progress tracking or badge logic.
  - SEO/discovery:
    - Added localized metadata for path index/detail routes.
    - Added `/paths` and `/paths/[slug]` routes to sitemap alternates and header navigation.
  - Model/validation/backfill:
    - No new JSON schema fields required; pages reuse already-validated `Topic.learningPath[]`.
    - No content backfill required because current topic hubs already include bilingual learning-path data.

- RM-007 Compare events view (`/{locale}/compare`):
  - UI/runtime:
    - Added a static, server-rendered bilingual compare page for selecting two events via query params.
    - Shows side-by-side event chronology, period, movement, place, importance, evidence posture, overview, why-it-matters text, causes, consequences, and chapter links.
    - Adds shared-context blocks for overlapping figures, resources, and related chapters.
  - SEO/discovery:
    - Added localized metadata for the compare route.
    - Added `/compare` to header navigation and sitemap alternates.
  - Model/validation/backfill:
    - No schema changes required.
    - No content backfill required; the page uses existing event, figure, resource, and relationship metadata.

## 2026-05-25

### Completed

- Place backfill batch for `/[locale]/places` coverage:
  - Activated 30 place IDs in `src/types/content.ts` and `scripts/validate-content.mjs`:
    - `bengal-region`, `bangladesh`, `east-bengal`, `east-pakistan`, `west-bengal`, `mahasthangarh`, `somapura-mahavihara`, `gaur-lakhnauti`, `nadia-nabadwip`, `sonargaon`, `sylhet`, `dhaka-jahangirnagar`, `murshidabad`, `chittagong-chattogram`, `rajmahal`, `hooghly`, `calcutta-kolkata`, `palashi-plassey`, `buxar`, `faridpur`, `barasat-narkelberia`, `noakhali`, `dhaka-university`, `dhaka-medical-college`, `central-shaheed-minar`, `racecourse-suhrawardy-udyan`, `mujibnagar`, `farakka`, `shahbag-dhaka`, `pilkhana-dhaka`.
  - Added bilingual place metadata files (`meta.en.json`, `meta.bn.json`) for the newly introduced place IDs under `content/places/<place-id>/`.
  - Applied combined historical/modern display naming for core dual-name places:
    - `Dhaka / Jahangirnagar`, `Gaur / Lakhnauti`, `Calcutta / Kolkata`, `Chittagong / Chattogram`, `Palashi / Plassey`, `Nabadwip / Nadia`.

- Historical place system expansion (RM-REL-009 enhancement):
  - Model:
    - Extended `PlaceMeta` in `src/types/content.ts` with time-aware fields:
      - `placeType: PlaceType` — expanded taxonomy (region | city | capital | district | division | river | port | battlefield | religious-site | educational-site | archaeological-site | frontier | route | other)
      - `coordinateConfidence?: CoordinateConfidence` — exact | approximate | representative | unknown
      - `nameHistory?: NameHistoryEntry[]` — time-aware name timeline with language, period, and sources
      - `administrativeHistory?: AdministrativeHistoryEntry[]` — time-aware governance timeline
      - `modernAdministrativeUnit?: string`
      - `relatedTopicIds?: string[]`
      - `relatedPeriodIds?: PeriodId[]`
      - `seoTitle?: string`, `seoDescription?: string`
      - `faq?: FaqItem[]`, `sourceIds?: string[]`
    - Deprecated `regionType` in favor of `placeType` (backward compatible)
    - Added 24 new place IDs to `SUPPORTED_PLACE_IDS` for specific historical places:
      - bangladesh, west-bengal, dhaka-jahangirnagar, gaur-lakhnauti, murshidabad, sonargaon
      - mahasthangarh, somapura-mahavihara, sylhet, chittagong-chattogram, chittagong-hill-tracts
      - nadia-nabadwip, rajmahal, palashi-plassey, buxar, calcutta-kolkata, hooghly, satgaon
      - farakka, noakhali, mujibnagar, dhaka-university, pilkhana-dhaka, shahbag-dhaka
  - Validation:
    - Added `placeType` enum validation with 14 allowed types
    - Added `coordinateConfidence` enum validation
    - Added `nameHistory` shape validation (name, language, period, year range, sourceIds)
    - Added `administrativeHistory` shape validation (label, authority, year range, sourceIds)
    - Added validation for `relatedTopicIds`, `relatedPeriodIds`, `seoTitle`, `seoDescription`, `faq`, `sourceIds`
    - Added warning when place has lat/lon but no coordinateConfidence
    - Added warning when historical place (with historicalNames or nameHistory) has no mapNote
    - Updated allowed place IDs to include all 25 places
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` with comprehensive historical place schema documentation
    - Added place type taxonomy explanation and examples
    - Added Dhaka/Jahangirnagar complete example with nameHistory and administrativeHistory
    - Added rule: "Historical boundaries changed. Do not pretend modern coordinates represent historical borders exactly."
  - Content backfill (Phase 1):
    - Created 2 high-priority places with full historical metadata:
      - `dhaka-jahangirnagar` — Capital with 9 related events, complete nameHistory (4 entries) and administrativeHistory (5 eras from Mughal to modern Bangladesh)
      - `palashi-plassey` — 1757 battlefield with 3 related events, nameHistory, and administrative transitions
    - Both places include: placeType, coordinateConfidence, modernCountry, historicalNames, nameHistory, administrativeHistory, relatedEventIds, relatedPeriodIds, mapNote, seoTitle, seoDescription, faq
    - Updated `bengal-region` to use new `placeType` field with coordinateConfidence and mapNote
    - Activated 2 places in SUPPORTED_PLACE_IDS (22 remaining for future backfill)
  - UI:
    - Place index and detail pages working with new schema fields
    - TODO (future): Render nameHistory and administrativeHistory timelines on place detail pages
    - TODO (future): Group place index by placeType (capitals, battlefields, sites, etc.)
    - TODO (future): Add coordinateConfidence indicator to map displays

## 2026-05-25

### Completed

- Resource creator identity hardening:
  - Model/runtime:
    - Added optional resource `creatorId` support so derived creator routes can use locale-stable keys while preserving localized attribution labels.
    - Kept attribution-derived IDs as a legacy fallback.
  - Validation:
    - Added resource `creatorId` slug validation.
    - Added EN/BN creator ID consistency checks.
    - Added resource `creatorType` enum validation and locale consistency checks.

- Resource system revision for historical trust + SEO + linking:
  - Model:
    - Upgraded resource taxonomy in `src/types/content.ts` from legacy broad groups to 10 trust/learning categories:
      - `primary-sources`, `academic-books`, `reference-sources`, `research-articles-and-papers`, `memoirs-and-eyewitness-accounts`, `maps-and-visual-sources`, `documentary-and-video`, `cultural-and-literary-resources`, `news-and-contemporary-reports`, `further-reading`
    - Made `EventResource.subcategory` string-based to support curated sublabels without repeated type churn.
  - Validation:
    - Added hard validation for resource `category` against the 10-category taxonomy.
    - Added hard validation for non-empty `subcategory`.
    - Added hard validation that `href` (if present) is absolute `http(s)`.
  - UI/runtime:
    - Updated resource card and resource index/event-resource pages to use the revised category labels and ordering.
    - Event resource pages now sort within category/subcategory by trust precedence (`sourceQuality`, then `evidenceLevel`) so strongest sources appear first.
    - Content loader now maps legacy category values (`read/watch/explore/understand`) to new taxonomy for backward compatibility.
  - Backfill:
    - Normalized all `content/resources/*/meta.en.json` and `meta.bn.json` entries:
      - category/subcategory normalization
      - standardized `sourceQuality`
      - standardized `evidenceLevel`
      - added/fixed `whyItMatters`
      - added reverse topic linking via `relatedTopicIds` where topic hubs referenced resource IDs
      - removed non-absolute `href` values
    - Curated strong resource sets and resource-based learning-path entries in major topic hubs.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` with 2026 resource taxonomy rules and quality/evidence mapping.
    - Updated `docs/seo-audit.md` with resource SEO strategy revision.

- Topic hub revision for historical balance + SEO structure:
  - Model/content:
    - Reworked `content/topics/**` into a 17-topic BN/EN hub system with clearer historical sequencing and search-friendly naming.
    - Preserved existing indexed topic slugs wherever possible (no breaking slug migrations for existing hubs).
    - Added four new topic hubs:
      - `pala-sena-period-and-knowledge-culture`
      - `peasant-religious-and-rural-resistance`
      - `state-formation-crisis-and-military-rule-1972-1990`
      - `bengal-culture-literature-and-memory`
    - Added/standardized per-topic optional metadata fields:
      - `seoTitle`, `seoDescription`, `beginnerSummary`, `advancedSummary`
      - `primaryKeywords`, `secondaryKeywords`, `resourceIds`, `faq`, `learningPath`
  - Validation/backfill:
    - Ensured each topic has both BN and EN metadata files with required core fields and valid event mappings.
    - Removed future-sensitive `2026-election` from topic hubs to avoid presenting future events as settled history.
  - UI/runtime:
    - Updated topic detail page (`src/app/[locale]/topics/[slug]/page.tsx`) to render stronger internal links:
      - connected events
      - related figures
      - related resources
      - structured learning path (event/figure/resource/place/period/topic links)
      - FAQ block
    - Topic metadata generation now prioritizes `seoTitle`/`seoDescription` when present.
  - Docs:
    - Updated `docs/seo-audit.md` with revised topic hub status and next priority topic pages.
    - Updated `docs/CONTENT_MODEL.md` topic example to align with the new topic-hub SEO/learning structure.

## 2026-05-23

### Completed

- Content schema extension for SEO, relationships, maps, learning paths, and backend-readiness:
  - Model:
    - Added optional Figure metadata fields in `src/types/content.ts`:
      - `seoTitle`, `seoDescription`, `shortAnswer`, `birthYear`, `deathYear`, `activePeriod`
      - `primaryEventIds`, `relatedPlaceIds`, `alternateNames`, `searchAliases`, `faq`
    - Added optional Event metadata fields:
      - `seoTitle`, `seoDescription`, `quickAnswer`
      - `causes`, `consequences`, `misconceptions`, `faq`, `mapPoints`
    - Added optional Topic metadata fields:
      - `seoTitle`, `seoDescription`, `beginnerSummary`, `advancedSummary`
      - `primaryKeywords`, `secondaryKeywords`, `faq`, `learningPath`
    - Added optional Resource metadata fields:
      - `sourceQuality`, `evidenceLevel`, `relatedEventIds`, `relatedFigureIds`, `relatedTopicIds`, `whyItMatters`
    - Added optional Place metadata fields:
      - `lat`, `lon`, `modernCountry`, `historicalNames`, `relatedEventIds`, `relatedFigureIds`, `mapNote`
    - Added shared helper types for FAQ, misconceptions, map points, and learning-path items.
  - Validation:
    - Added optional-field checks in `scripts/validate-content.mjs` without requiring backfill:
      - FAQ entry shape validation (`question`, `answer`, optional `sourceIds`)
      - Event `mapPoints` shape and `placeId` existence checks
      - Topic `learningPath` type/id shape checks with entity-aware ID validation
      - Figure `alternateNames` and `searchAliases` string-array validation
      - Resource `sourceQuality` and `evidenceLevel` enum validation
      - Added Place/Resource/Figure optional relation/metadata checks
  - UI/runtime:
    - Updated normalization in `src/lib/content.ts` to safely pass through new optional Figure/Resource fields when present.
  - Backfill:
    - No historical content backfill required; all new fields are optional.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` with optional-field definitions, rationale, examples, and migration note.
    - Updated `docs/AI_CONTRACT.md` contract rule for optional metadata extension validation.

## 2026-05-22

### Completed

- RM-TRUTH-002 source reliability rubric completion:
  - Model:
    - Updated `EventResource.quality` in `src/types/content.ts` from optional to required.
  - Validation:
    - Updated `scripts/validate-content.mjs` to require `quality` on every `content/resources/*/meta.<locale>.json`.
    - Kept strict enum enforcement for `quality` values: `primary | secondary | archive | editorial`.
  - Backfill:
    - Added missing `quality: "secondary"` for `content/resources/caretaker-government-banglapedia/meta.en.json` and `meta.bn.json`.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md` resource schema to explicitly include `quality`.
    - Updated `docs/AI_CONTRACT.md` contract rules to require resource `quality` classification and reference `docs/SOURCE_QUALITY.md`.
    - Marked RM-TRUTH-002 complete in `docs/ROADMAP.md`.

- RM-TRUTH-003 primary vs secondary distinction completion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No new validator checks required beyond required `quality` enum enforcement already implemented in RM-TRUTH-002.
  - Policy/docs:
    - Expanded `docs/SOURCE_QUALITY.md` with explicit primary-vs-secondary decision tests and examples (origin, processing, proximity, reproduction, commentary boundary).
    - Updated `docs/EDITORIAL_RULES.md` with a hard rule against mislabeling interpretive sources as `primary`.
    - Updated `docs/AI_CONTRACT.md` to require using the rubric distinction tests for `primary` vs `secondary` assignment.
    - Marked RM-TRUTH-003 complete in `docs/ROADMAP.md`.

- RM-TRUTH-006 editorial neutrality guideline completion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator code changes required; existing sensitive/contested metadata checks remain the enforcement baseline.
  - Policy/docs:
    - Added published neutrality policy: `docs/EDITORIAL_NEUTRALITY.md`.
    - Linked neutrality policy from `docs/EDITORIAL_RULES.md`.
    - Added neutrality-policy requirement to `docs/AI_CONTRACT.md`.
    - Marked `RM-TRUTH-006` complete in `docs/ROADMAP.md`.
    - Marked governance checkpoint `Written editorial neutrality policy published` as complete in `docs/ROADMAP.md`.

- RM-TRUTH-007 sensitive political history writing guideline completion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator code changes required; existing sensitive/contested metadata checks remain in effect.
  - Policy/docs:
    - Added published policy document: `docs/SENSITIVE_POLITICAL_HISTORY.md`.
    - Linked policy from `docs/EDITORIAL_RULES.md`.
    - Added policy requirement to `docs/AI_CONTRACT.md`.
    - Marked `RM-TRUTH-007` complete in `docs/ROADMAP.md`.
    - Marked governance checkpoint `Written sensitive history writing policy published` as complete in `docs/ROADMAP.md`.

- RM-TRUTH-008 deferment UX clarification (static phase):
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Added a localized placeholder note on event detail pages clarifying that public revision history is planned for backend phase B5.
    - Added a direct link from that note to `/{locale}/methodology` for trust-method explanation.
  - Docs:
    - Roadmap deferment state remains unchanged for RM-TRUTH-008 (backend B5 dependency preserved).

- RM-SEO-001 contextual figure title rewrite:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Updated figure page metadata title generation to use contextual formula on `/{locale}/figures/{id}` pages.
    - EN format: `{Name} — {Role} in {Historical Context} | Bengal Unfolded`.
    - BN format: locale-adapted contextual equivalent with graceful fallback when role/context is missing.
  - Docs:
    - Marked `RM-SEO-001` complete in `docs/ROADMAP.md`.

- RM-SEO-002 contextual figure meta-description rewrite:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Updated figure page metadata description generation on `/{locale}/figures/{id}` to include:
      - who (person + role)
      - why (highlight/contribution value proposition)
      - period (derived from chronological linked events)
      - reader outcome (what the page helps the reader understand)
    - Added locale-aware EN/BN description templates with graceful fallbacks and length clamp.
  - Docs:
    - Marked `RM-SEO-002` complete in `docs/ROADMAP.md`.

- RM-SEO-003 related blocks on figure pages:
  - Model:
    - No schema/type changes required.
  - Validation:
    - No validator changes required.
  - UI/runtime:
    - Added `Related` section to `/{locale}/figures/{id}` pages with four blocks:
      - related figures (co-occurrence across linked events)
      - related events
      - related places
      - related resources
    - Added localized EN/BN labels and empty-state messages for each block.
  - Docs:
    - Marked `RM-SEO-003` complete in `docs/ROADMAP.md`.

- RM-SEO-006 structured data consistency for figure/event pages:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Added JSON-LD serialization helper in `src/lib/seo.ts` to safely escape `<` characters in structured data payloads.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Figure detail pages (`/{locale}/figures/{id}`):
      - Kept `Person` schema and expanded it with `@id` and `mainEntityOfPage`.
      - Added `BreadcrumbList` schema.
    - Event detail pages (`/{locale}/events/{slug}`):
      - Added `Event` schema.
      - Added `Article` schema linked to the event entity.
      - Added `BreadcrumbList` schema.
    - Switched figure/event JSON-LD script serialization to shared safe serializer.
  - Docs:
    - Marked `RM-SEO-006` complete in `docs/ROADMAP.md`.

- RM-SHARE-004 canonical URL and locale-aware metadata consistency checks:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Added central metadata consistency guards in `src/lib/seo.ts`:
      - `canonicalPath` must start with locale prefix (`/en` or `/bn`).
      - `languagePathWithoutLocale` must not include locale prefix.
      - `canonicalPath` must exactly match `/${locale}${languagePathWithoutLocale}` when language path is provided.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - `buildPageMetadata` now emits absolute canonical URLs and absolute Open Graph page URLs derived from `CANONICAL_ORIGIN`.
    - Existing page-level metadata calls now inherit strict locale/canonical consistency checks automatically.
  - Docs:
    - Marked `RM-SHARE-004` complete in `docs/ROADMAP.md`.

- RM-SHARE-001 social metadata baseline for event/figure/book pages:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Added shared metadata description normalizer `normalizeMetaDescription` in `src/lib/seo.ts` (trim, fallback, max-length clamp).
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Event pages (`/{locale}/events/{slug}`): metadata now uses normalized description with locale-aware fallback text.
    - Figure pages (`/{locale}/figures/{id}`): metadata description now uses shared normalizer for consistent clamp/fallback behavior.
    - Book pages (`/{locale}/books/{id}`): metadata now uses normalized description with locale-aware fallback text.
    - Dynamic OG image baseline for event/figure/book remains active via existing `buildDynamicOgImagePath` integration.
  - Docs:
    - Marked `RM-SHARE-001` complete in `docs/ROADMAP.md`.

- RM-SEO-007 figure-page content depth expansion:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Reused existing normalized figure/event/resource data model; no validator rule changes required.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Expanded `/{locale}/figures/{id}` page structure with explicit depth sections:
      - biography summary
      - timeline placement
      - legacy summary
      - references
      - related events (retained via existing related blocks)
    - Added derived timeline placement metrics from linked events:
      - first appearance year
      - latest appearance year
      - active span
      - linked event count
    - Promoted source-backed reference visibility by creating a dedicated references section from related resources with citation frequency (`cited in N events`).
  - Docs:
    - Marked `RM-SEO-007` complete in `docs/ROADMAP.md`.

- RM-SHARE-005 downloadable share card images:
  - Model:
    - No schema/type changes required.
  - Validation:
    - Reused existing dynamic OG image endpoint (`/api/og`) and URL builder.
    - Lint verification run (`pnpm lint`) completed with warnings only (no errors).
  - UI/runtime:
    - Extended `ShareActions` with optional download-card action (`downloadImagePath`, `downloadFileName`, localized label).
    - Added manual download controls on detail pages:
      - `/{locale}/events/{slug}`
      - `/{locale}/figures/{id}`
      - `/{locale}/books/{id}`
    - Download action points to corresponding dynamic OG image URL and suggests deterministic file names for manual posting workflows.
  - Docs:
    - Marked `RM-SHARE-005` complete in `docs/ROADMAP.md`.

## 2026-05-20

### Completed

- RM-TRUTH-004 / RM-TRUTH-005 contested-history rollout:
  - Model:
    - Added `contested`, `historicalDebate`, `historicalDebateSourceIds`, and `historicalDebateEvidenceLevel` to `EventMeta` in `src/types/content.ts`.
  - Validation:
    - Added shape checks for `contested` and `historicalDebate`.
    - Added `historicalDebateSourceIds -> historicalDebateEvidenceLevel` requirement.
    - Added `contested=true` requirement for non-empty `historicalDebate` and `historicalDebateSourceIds`.
    - Extended event source-integrity validation to cover `historicalDebateSourceIds`.
  - UI/runtime:
    - Added a contested-history badge to event overview metadata on event detail pages.
    - Added localized `Historical Debate` jump-nav entry and debate block on event pages with inline citations and evidence badge rendering.
  - Backfill:
    - Backfilled contested-history metadata for `1905-partition-of-bengal`, `1947-partition-and-eastern-bengal`, and `1947-united-bengal-proposal` in EN/BN using already-linked event resources.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-TRUTH-010 public methodology page rollout:
  - Model: No schema/type additions required.
  - Validation: No validator changes required.
  - UI/runtime:
    - Added localized methodology page at `/{locale}/methodology`.
    - Added page metadata and locale alternates through the existing SEO helper.
    - Added methodology route entries to `src/app/sitemap.ts`.
    - Added a footer link so the page is reachable from all locale views.
  - Backfill: No content backfill required.
  - Docs: Updated roadmap checkbox state in `docs/ROADMAP.md`.

- Figure registry sync for existing 1971 content:
  - Content: No content-file changes required; existing bilingual figure metadata already existed for `major-rafiqul-islam`, `m-hamidullah-khan`, `mk-bashar`, `mohiuddin-jahangir`, and `major-ma-manzur`, and those IDs were already referenced by existing event content.
  - Model: Added the missing figure IDs to `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` so runtime loaders and static generation recognize the existing figures.
  - Validation: No validator rule changes required.

## 2026-05-09

### Completed

- 2024 figure backfill for Sharif Osman Hadi:
  - Content: Added `sharif-osman-hadi` figure metadata in EN/BN as a 2024 student-activist / Inquilab Mancha spokesperson profile.
  - Content: Linked the figure into `content/events/2024-anti-discrimination-movement/figure-ids.json` and the `democracy-and-civic-movements` and `bangladesh-history` topic hubs for discoverability.
  - Model: Updated `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` so the figure route and loaders recognize the new profile.
  - Validation: No new validator rules were required; existing figure ID and EN/BN parity checks cover the backfill.
  - Docs: Added this changelog entry to record the content sync.

- Historical timeline expansion with three new Bengal/Bangladesh chapters:
  - Added event chapters `1764-battle-of-buxar` (Battle of Buxar), `1770-great-bengal-famine` (Great Bengal Famine), `1935-government-of-india-act-1935` (Government of India Act 1935), and `1937-bengal-provincial-election-and-coalition-ministry` (Bengal Provincial Election and Coalition Ministry) with full EN/BN event packs.
  - Added event chapter `2007-2008-emergency-caretaker-rule` (Emergency-era Caretaker Rule) with full EN/BN event packs.
  - Added supporting resource entries for Buxar, the 1770 famine, the 1935 constitutional framework, and the 1937 Bengal provincial election.
  - Updated `2006-caretaker-crisis-and-emergency-rule` child-event wiring to include `2007-2008-emergency-caretaker-rule` so the cluster remains parent-child consistent.
  - Updated `SUPPORTED_EVENT_SLUGS` in `src/types/content.ts` to register the new event routes.
  - Validation: `pnpm content:validate` passed after the additions.

## 2026-05-08

### Completed

- RM-TRUTH-001 claim-level citation model rollout:
  - Model:
    - Added `EventClaimCitation` schema in `src/types/content.ts` with `id`, `section`, `claim`, `sourceIds`, and `evidenceLevel`.
    - Added `claimCitations?: EventClaimCitation[]` to `EventMeta`.
  - Validation:
    - Added strict shape checks for `claimCitations` entries, unique per-event claim IDs, allowed section enum values, and non-empty source arrays.
    - Added source integrity checks for `claimCitations.sourceIds` against event `resource-ids.json` and global resource set.
    - Added `importance=major|landmark` requirement for non-empty `claimCitations`.
  - UI/runtime:
    - Added localized claim-level citations section on event detail pages with jump-nav anchor, glossary-linked claim text, inline citations, and evidence badge rendering.
  - Backfill:
    - Backfilled `claimCitations` for EN/BN event metadata using existing cited narrative blocks (`summary`, `whyItMatters`, `longTermLegacy`, `culturalImpact`, `identityMemoryNotes`) where source and evidence metadata already existed.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-013 identity and memory notes rollout:
  - Model:
    - Added `identityMemoryNotes`, `identityMemorySourceIds`, and `identityMemoryEvidenceLevel` to `EventMeta` in `src/types/content.ts`.
  - Validation:
    - Added `identityMemoryNotes` shape checks.
    - Added `identityMemorySourceIds -> identityMemoryEvidenceLevel` requirement.
    - Added `importance=major|landmark` requirement for non-empty `identityMemoryNotes`.
    - Added source ID integrity checks for `identityMemorySourceIds` against event `resource-ids.json` and global resources.
  - UI/runtime:
    - Added localized `Identity and Memory Notes` section to event detail pages with glossary-linked text, inline citations, and evidence badge.
    - Added jump-nav anchor/link for the new section.
  - Backfill:
    - Populated identity-memory fields for all `importance=major` and `importance=landmark` chapters in EN/BN using existing validated narrative/citation metadata as base.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-010 book/resource-to-event reverse mapping rollout:
  - Model: No schema/type additions required.
  - Validation: No validator rule changes required.
  - UI/runtime:
    - Added `getEventsByBookIdChronological(locale, bookId)` and `getEventsByResourceIdChronological(locale, resourceId)` in `src/lib/content.ts`.
    - Updated book detail page to render referenced events in chronological timeline view.
    - Updated resource detail page to render referenced events in chronological timeline view.
    - Localized timeline-view labels for EN/BN on both pages.
  - Backfill: No content backfill required.
  - Docs: Updated `docs/CONTENT_MODEL.md` runtime accessor list and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-009 place-to-event timeline view rollout:
  - Model:
    - Added `SUPPORTED_PLACE_IDS`, `PlaceId`, `PlaceMeta`, and `Place` in `src/types/content.ts`.
    - Added `placeId?: PlaceId` and `placeLabel?: string` to `EventMeta`.
  - Validation:
    - Extended `scripts/validate-content.mjs` with allowed `placeId` checks on event metadata.
    - Added place directory validation (`content/places/<id>/meta.en.json`, `meta.bn.json`) with required field checks and EN/BN parity enforcement.
  - UI/runtime:
    - Added place loaders in `src/lib/content.ts` (`getPlace`, `getAllPlaces`, `getEventsByPlaceId`, `getEventsByPlaceIdChronological`).
    - Added place timeline detail pages at `/{locale}/places/{id}`.
    - Added place badge/link on event detail pages to navigate to place timelines.
    - Updated `src/app/sitemap.ts` to include localized place detail routes.
  - Backfill:
    - Added bilingual place entity `content/places/bengal-region/`.
    - Backfilled `placeId` and localized `placeLabel` for all event metadata files in EN/BN.
  - Docs:
    - Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- RM-SHARE-002 dynamic localized Open Graph image rollout:
  - Model: No schema/type additions required.
  - Validation: No validator rule changes required.
  - UI/runtime:
    - Added dynamic OG image endpoint at `src/app/api/og/route.tsx` using `ImageResponse`.
    - Added localized (EN/BN) OG card labels and rendering variants for content types (`event`, `figure`, `book`).
    - Extended SEO helper in `src/lib/seo.ts` with `buildDynamicOgImagePath(...)` and `ogImagePath` support in `buildPageMetadata(...)`.
    - Updated metadata generation for event, figure, and book detail pages to use content-specific dynamic OG image URLs.
  - Backfill: No content backfill required.
  - Docs: Updated roadmap checkbox state in `docs/ROADMAP.md`.

- RM-SHARE-003 share action UI rollout:
  - Model: No schema/type additions required.
  - Validation: No validator rule changes required.
  - UI/runtime:
    - Added reusable client-side `ShareActions` component in `src/components/ShareActions.tsx` with localized `Share` and `Copy link` actions.
    - Added native share support via `navigator.share` where available.
    - Added copy-to-clipboard fallback with success/error status messaging.
    - Integrated share actions into event, figure, and book detail hero sections.
  - Backfill: No content backfill required.
  - Docs: Updated roadmap checkbox state in `docs/ROADMAP.md`.

- RM-REL-011 long-term legacy fields for major events rollout:
  - Model: Added `longTermLegacy`, `longTermLegacySourceIds`, and `longTermLegacyEvidenceLevel` to `EventMeta` in `src/types/content.ts`.
  - Validation:
    - Added `longTermLegacy` shape checks.
    - Added `longTermLegacySourceIds -> longTermLegacyEvidenceLevel` requirement.
    - Added `importance=major` requirement for non-empty `longTermLegacy`.
    - Added source ID integrity checks for event-level citation arrays (`summarySourceIds`, `whyItMattersSourceIds`, `longTermLegacySourceIds`) against event `resource-ids.json` and global resource set.
  - UI/runtime: Added a dedicated localized `Long-Term Legacy` section on event detail pages with glossary-linked text, inline citations, and evidence badge, plus jump-nav anchor.
  - Backfill: Populated long-term legacy fields for all `importance=major` chapters in both locales (31 event chapters), reusing existing why-it-matters source/evidence metadata where needed.
  - Docs: Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state.

- RM-REL-008 figure-to-event timeline view rollout:
  - Model: No schema/type additions required; existing figure-event relationship model already supported this view.
  - Validation: No validator rule changes required; existing relationship and event integrity checks remain sufficient.
  - UI/runtime:
    - Added `getEventsByFigureIdChronological(locale, figureId)` in `src/lib/content.ts` to return figure-linked events in global chronology order.
    - Updated `/{locale}/figures/{id}` page to render a timeline-style vertical sequence for related events instead of a flat card list.
  - Backfill: No content backfill required.

- RM-006E sensitive-event metadata rollout:
  - Model: Added `sensitive?: boolean`, `contentWarnings?: string[]`, and `requiresSources?: boolean` to `EventMeta` in `src/types/content.ts`.
  - Validation: Extended `scripts/validate-content.mjs` with type checks for all three fields, `contentWarnings` entry validation, and `requiresSources=true` enforcement for non-empty `summarySourceIds` and `whyItMattersSourceIds`.
  - UI/runtime: Updated event detail page UI to show a localized sensitive-content badge and warning panel with optional warning labels and source requirement note.
  - Backfill: Marked an initial curated set of high-sensitivity chapters in EN/BN (`1946-direct-action-day-and-the-great-calcutta-killing`, `1971-liberation-war`, `1974-famine-emergency-and-state-crisis`, `2009-bdr-mutiny-pilkhana-massacre`, `2013-shahbag-movement`, `2014-10th-parliamentary-election`, `2018-digital-security-act`, `2024-anti-discrimination-movement`) with `sensitive`, `contentWarnings`, and `requiresSources`.
  - Docs: Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and roadmap checkbox state in `docs/ROADMAP.md`.

- Historical timeline gap backfill (6 chapters) with full EN/BN content packs:
  - Added event chapters: `1874-assam-reorganization-and-sylhet-s-administrative-detachment`, `1930-chittagong-armoury-raid`, `1948-language-question-becomes-a-mass-political-issue`, `1949-founding-of-awami-muslim-league`, `1962-education-movement-in-east-pakistan`, `1968-agartala-conspiracy-case`.
  - Added shared source entities: `assam-banglapedia`, `surya-sen-banglapedia`, `awami-league-britannica`, `agartala-conspiracy-case-banglapedia`.
  - Updated chronology wiring for parent/child integrity around `1911 -> 1930`, `1947 -> 1948`, and `1958 -> 1962 -> 1966 -> 1968 -> 1969`.
  - Updated `SUPPORTED_EVENT_SLUGS` in `src/types/content.ts` for all six new chapters.

- Dynamic topic hub system rollout (multi-topic, content-driven):
  - Model: Added `TopicMeta` / `Topic` types in `src/types/content.ts` with `slug`, localized presentation fields, and linked entity arrays (`eventSlugs`, `figureIds`, `resourceIds`, `keywords`).
  - Validation: Extended `scripts/validate-content.mjs` with topic directory checks for EN/BN parity, required fields, slug parity, non-empty `eventSlugs`, duplicate prevention, and linked ID integrity against events/figures/resources.
  - UI/runtime: Replaced hardcoded topic route behavior with data-driven loaders:
    - Added topic loaders in `src/lib/content.ts` (`getAllTopicSlugs`, `getTopic`, `getAllTopics`, `getTopicsByEventSlug`, `getTopicsByFigureId`, `getTopicsByResourceId`).
    - Updated `/{locale}/topics` index to render cards from topic content.
    - Updated `/{locale}/topics/[slug]` to generate static params dynamically from topic directories and render topic-specific metadata/JSON-LD/content.
    - Updated event/figure/resource detail pages to show related topic links based on topic membership instead of a fixed hardcoded topic.
    - Updated `src/app/sitemap.ts` to include all topic slugs per locale dynamically.
  - Backfill: Added six bilingual topic hubs under `content/topics/`:
    - `bangladesh-history`
    - `partition-and-identity`
    - `democracy-and-civic-movements`
    - `liberation-war-1971`
    - `language-movement-and-mother-language-day`
    - `partition-of-bengal-1905`
  - Docs: Updated `docs/CONTENT_MODEL.md`, `docs/AI_CONTRACT.md`, and `docs/ROADMAP.md` for the new topic model and completed roadmap item.
  - Follow-up enhancement: Added optional topic `priority` for editorial ordering, validator enforcement, and sorted rendering on topic index/related blocks.

- Added five pre-1204 foundational event chapters with full EN/BN content structure:
  - `content/events/0400bce-0300bce-mahasthangarh-urban-emergence/`
  - `content/events/0600-0637-shashanka-gauda-kingdom/`
  - `content/events/0750-1170-pala-dynasty-foundation/`
  - `content/events/0800-1200-somapura-mahavihara/`
  - `content/events/1178-1204-sena-transition/`
  - Content: Included bilingual `meta`, `timeline`, `quotes`, `figure-ids`, and `resource-ids` files for each event.
  - Model: Updated `SUPPORTED_EVENT_SLUGS` in `src/types/content.ts` to register all five new chapters for runtime routing and loading.
  - Sources: Added new shared resource entities in `content/resources/` for UNESCO and Britannica references used by these chapters.
  - Validation: No validator schema changes required; existing checks cover the added data shape.
  - Model: Added a new period ID `ancient-and-pre-sultanate-bengal` for pre-1204 chapters.
  - Validation: Updated allowed period IDs in `scripts/validate-content.mjs`.
  - Backfill: Reassigned all five newly added pre-1204 chapters from `transition-to-sultanate-formation` to `ancient-and-pre-sultanate-bengal` with updated EN/BN `periodLabel`.

## 2026-05-06

### Completed

- Figure data correction and expansion for `2013-shahbag-movement` (Shahbag / Gonojagoron Moncho):
  - Content: Replaced mismatched event figure links in `content/events/2013-shahbag-movement/figure-ids.json` with movement-relevant profiles.
  - Content: Added missing figure entities with EN/BN metadata for core 2013 movement actors.
  - Content: Expanded the `2013-shahbag-movement` chapter with additional related actors requested during curation.
  - Model: Updated `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` for all newly added figure IDs.
  - Validation: No validator logic changes required; integrity enforced through existing ID checks.
  - Backfill: EN/BN parity maintained for all newly created figure metadata files.

- Key-figure rollout for `2009-bdr-mutiny-pilkhana-massacre` (BDR Mutiny / Pilkhana Massacre):
  - Content: Added event-level key figures in `content/events/2009-bdr-mutiny-pilkhana-massacre/figure-ids.json`.
  - Content: Added EN/BN figure metadata for primary 2009 crisis actors, then expanded with additional investigation-era/testimony-linked figures as requested.
  - Model: Updated `SUPPORTED_FIGURE_IDS` in `src/types/content.ts` for all newly added 2009 figure IDs.
  - Validation: Existing `content:validate` checks passed after updates.

- Figure image integrity and recovery workflow hardening:
  - Content QA: Audited referenced figure media for corrupted/non-renderable binaries.
  - Content fix: Removed broken `image` fields from affected figure metadata so UI collapses media sections cleanly without placeholders.
  - Recovery tracking: Updated unresolved-image backlog in `image_sync_recovery_report.json` and retry artifacts for subsequent crawl passes.
  - UI behavior note: Figure/event media display now relies on optional presence of valid `image` metadata; broken references are avoided at content level.

## 2026-05-05

### Completed

- Period-level refactor for the long arc from `1204-bakhtiyar-khalji-s-conquest-of-nadia` to `1757-battle-of-plassey`:
  - Model: Added three historical period IDs in `src/types/content.ts`:
    - `transition-to-sultanate-formation` (`1204–1352`)
    - `independent-bengal-sultanate-era` (`1352–1576`)
    - `mughal-incorporation-and-consolidation` (`1576–1757`)
  - Validation: Extended `scripts/validate-content.mjs` `allowedPeriodIds` to enforce the new period IDs.
  - Content: Added new period metadata entities in `content/periods/` (EN/BN) for all three periods.
  - Backfill: Assigned `periodId`/`periodLabel` across pre-colonial event chapters (`1204-bakhtiyar-khalji-s-conquest-of-nadia`, `1352-bengal-sultanate-independence-and-unification`, `1414-raja-ganesha-seizes-power-in-bengal`, `1494-alauddin-husain-shah-begins-hussain-shahi-rule-in-bengal`, `1576-battle-of-rajmahal`, `1612-mughal-conquest-phase-in-bengal-largely-completed`, `1704-murshid-quli-khan-shifts-the-capital-to-murshidabad`) while keeping `1757-battle-of-plassey` in `colonial-rule-and-resistance` as the transition boundary.
  - Docs: Updated `docs/CONTENT_MODEL.md` supported period ID list.
  - UI/runtime: No code-path changes required because period pages and event-period filters already consume period IDs generically.
- Added a new `2018-a-year-of-protest-control-and-contested-legitimacy` event cluster with four child chapters:
  - Content: Created bilingual parent metadata plus four bilingual child event chapters for the Quota Reform Movement, Safe Road Movement, Digital Security Act, and 11th Parliamentary Election.
  - Sources: Added shared resources for Human Rights Watch's `Creating Panic` report, Human Rights Watch's road-safety protest statement, and Amnesty International's Digital Security Act coverage.
  - Hierarchy: Inserted `2018-a-year-of-protest-control-and-contested-legitimacy` under `1990-mass-uprising` and attached the four sub-events with `parentEvent` / `childEventIds`.
- Added the missing `2014-10th-parliamentary-election` chapter for the `10th Parliamentary Election`:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/2014-10th-parliamentary-election/`.
  - Sources: Added shared resources for Human Rights Watch's 2014 election violence report and Al Jazeera's reporting on the immediate parliamentary aftermath.
  - Hierarchy: Inserted `2014-10th-parliamentary-election` as a child chapter of `2013-shahbag-movement`, linking the Shahbag-era political climate to the contested January 5 election.
- Added the missing `2009-bdr-mutiny-pilkhana-massacre` Bangladesh chapter for the `BDR Mutiny / Pilkhana Massacre`:
  - Content: Created bilingual event metadata, timeline, quotes, and resource links under `content/events/2009-bdr-mutiny-pilkhana-massacre/`.
  - Sources: Added shared resources for Banglapedia's Bangladesh Rifles entry and Human Rights Watch's reporting on the mutiny's aftermath.
  - Hierarchy: Inserted `2009-bdr-mutiny-pilkhana-massacre` as a child chapter of `2006-caretaker-crisis-and-emergency-rule`, linking the post-emergency transition to the Pilkhana crisis.
- Added the missing `1982-ershad-s-coup-and-the-return-of-military-rule` authoritarian-transition chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1982-ershad-s-coup-and-the-return-of-military-rule/`.
  - Sources: Added shared resources for Ershad's political order and broader 1980s Bangladesh history.
  - Figures: Added `hussain-muhammad-ershad` and `abdus-sattar`.
  - Hierarchy: Rewired the late post-liberation chain from `1975 -> 1990` to `1975 -> 1982 -> 1990`.
- Added the missing `1974-famine-emergency-and-state-crisis` crisis chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1974-famine-emergency-and-state-crisis/`.
  - Sources: Added shared resources for the 1974 famine, Banglapedia's famine history, and the Special Powers Act.
  - Hierarchy: Rewired the post-liberation crisis chain from `1972 -> 1975` to `1972 -> 1974 -> 1975`.
- Added the missing `1972-state-formation-and-the-1972-constitution` state-formation chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1972-state-formation-and-the-1972-constitution/`.
  - Sources: Added shared resources for the 1972 Constitution, constitutional development, and early post-independence political transition.
  - Figures: Added `kamal-hossain`.
  - Hierarchy: Rewired the immediate postwar chain from `1971 -> 1975` to `1971 -> 1972 -> 1975`.
- Added the missing `1970-bhola-cyclone-and-the-1970-election` prewar crisis chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1970-bhola-cyclone-and-the-1970-election/`.
  - Sources: Added shared resources covering the Bhola cyclone, the 1970 general election, and Banglapedia background on Pakistan and the Liberation War.
  - Figures: Added `yahya-khan`.
  - Hierarchy: Rewired the autonomy-to-war chain from `1969 -> 1971` to `1969 -> 1970 -> 1971`.
- Added the missing `1946-direct-action-day-and-the-great-calcutta-killing` Direct Action Day chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1946-direct-action-day-and-the-great-calcutta-killing/`.
  - Sources: Added dedicated shared resources for Direct Action Day and the 1946 Calcutta riot.
  - Hierarchy: Rewired the late-colonial partition cluster from `1940 -> 1947` to `1940 -> 1946 -> 1947`.
- Added the missing `1940-lahore-resolution` Lahore Resolution chapter:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1940-lahore-resolution/`.
  - Sources: Added dedicated shared resources for Banglapedia and Britannica coverage of the Lahore Resolution.
  - Hierarchy: Rewired `1947-partition-and-eastern-bengal` to use `1940-lahore-resolution` as its parent event, making the late-colonial partition path clearer in timeline discovery.
- Added the missing `1905-partition-of-bengal` event chapter for the Partition of Bengal:
  - Content: Created bilingual event metadata, timeline, quotes, figure links, and resource links under `content/events/1905-partition-of-bengal/`.
  - Sources: Added dedicated shared resources for the 1905 partition, Swadeshi movement, and Dhaka Nawab family context.
  - Figures: Added `lord-curzon`, `rabindranath-tagore`, `surendranath-banerjea`, and `nawab-salimullah`.
  - Hierarchy: Rewired the timeline cluster so `1905-partition-of-bengal` is the parent event for `1906-all-india-muslim-league-founded-in-dhaka` and `1911-annulment-of-bengal-partition`, aligning event discovery with the historical sequence.

## 2026-05-04

### Completed

- RM-REL-007 (Movement/theme-to-event linking):
  - Model: Added `SUPPORTED_MOVEMENT_IDS` constant and `MovementId`, `MovementMeta`, `Movement` types.
  - Model: Added `movementId?: MovementId` to `EventMeta` for movement association.
  - Content: Created 5 movement entities in `content/movements/` with EN and BN metadata:
    - colonial-capture-and-resistance (1757–1905)
    - partition-and-political-representation (1905–1947)
    - language-autonomy-and-liberation (1947–1971)
    - state-power-and-democratic-transition (1971–1990)
    - memory-justice-and-civic-dissent (1990–present)
  - Validation: Added movement directory validation checking id parity and required fields (title, description).
  - Validation: Added event-level `movementId` validation to ensure references are valid.
  - Backfill: All 19 events have been assigned appropriate `movementId` values corresponding to their historical movement.
  - Content loaders: Added `isMovementId()`, `assertSupportedMovementId()`, `getMovement(locale, id)`, `getAllMovements(locale)`, and `getEventsByMovementId(locale, id)` functions with caching.
  - UI: Created movement detail pages at `/{locale}/movements/[id]` that display movement metadata and all events within that movement.
  - Static generation: Added `generateStaticParams()` for pre-rendering all locale + movement ID combinations.
  - Build verification: Confirmed successful Next.js build with all 10 movement pages (5 movements × 2 locales) pre-rendered.
- RM-REL-006 (Period-to-event linking):
  - Model: Added `SUPPORTED_PERIOD_IDS` constant and `PeriodId`, `PeriodMeta`, `Period` types.
  - Model: Added `periodId?: PeriodId` to `EventMeta` for period association.
  - Content: Created 5 period entities in `content/periods/` with EN and BN metadata:
    - colonial-rule-and-resistance (1757–1905)
    - partition-and-late-colonial-politics (1905–1947)
    - pakistan-period-and-national-awakening (1947–1971)
    - post-liberation-state-and-democracy (1971–1990)
    - contemporary-memory-and-civic-protest (1990–2024)
  - Validation: Added period directory validation checking id parity and required fields (title, description, startYear, endYear).
  - Validation: Added event-level `periodId` validation to ensure references are valid.
  - Backfill: All 19 events have been assigned appropriate `periodId` values corresponding to their historical period.
  - Content loader: Added `getPeriod(locale, id)`, `getAllPeriods(locale)`, and `getEventsByPeriodId(locale, id)` functions with caching.
  - UI: Created period detail pages at `/{locale}/periods/[id]` that display period metadata and all events within that period.
  - Static generation: Added `generateStaticParams()` for pre-rendering all locale + period ID combinations.
- RM-REL-005 (Why this matters explanation):
  - Model: Added `whyItMatters: string`, `whyItMattersSourceIds?: string[]`, `whyItMattersEvidenceLevel?: EvidenceLevel` to EventMeta.
  - Validation: Event metadata validates that if `whyItMattersSourceIds.length > 0`, then `whyItMattersEvidenceLevel` must be a valid evidence level.
  - UI: Event detail pages render the `Why This Event Matters Today` section with glossary-linked text, inline source citations, and evidence badges.
  - Backfill: All 19 supported events have `whyItMatters` content and citations in both EN and BN locales. Evidence levels set appropriately.
- Typed event relationship rollout:
  - Added typed `relatedEvents` support with `cause`, `effect`, `background`, `parallel`, `legacy`, and `contrast`.
  - Added relationship validation for relation type, target slug integrity, and duplicate prevention.
  - Added `getEventRelationships` in the content access layer.
  - Added event-page relationship sections for historical causality, aftermath, parallel reading, legacy, background, and contrast.
  - Backfilled typed relationships for landmark and key bridge chapters across EN/BN event metadata.
  - Marked roadmap items RM-REL-001 and RM-REL-002 complete.
- Timeline hierarchy and discovery rollout:
  - Added event hierarchy metadata fields across all event locale meta files:
    - `importance`
    - `parentEvent`
    - `childEventIds`
    - `relatedEventIds`
    - `periodLabel`
    - `movementLabel`
  - Extended the content model and validation rules to enforce hierarchy integrity and valid importance values.
  - Added `getEventHierarchy` in the content access layer.
  - Upgraded the full timeline explorer with importance filtering and period-based grouped results.
  - Added timeline-context blocks on event detail pages for parent, cluster, and related chapter discovery.
  - Marked roadmap items RM-006A and RM-006D complete.
- Performance and delivery guardrails:
  - Added `docs/PERFORMANCE.md` with `/bn` Lighthouse + CWV targets, component/image/font/JS policies, and measurement log template.
  - Added performance check commands to README (`pnpm build`, `pnpm lighthouse:mobile`, `pnpm lighthouse:desktop`).
- Homepage roadmap alignment:
  - Implemented RM-006B by limiting landing timeline to 15 landmark events while keeping `Explore Full Timeline` CTA flow.
- Reduced homepage client-side JS cost:
  - Replaced `framer-motion` usage in landing path animations with lightweight CSS animation.
  - Converted animation wrapper to server-compatible rendering.
  - Deferred homepage timeline client bundle with dynamic import + loading placeholder.
- Citation system rollout (RM-001):
  - Added inline timeline claim citation markers (`[1]`, `[2]`) linked to source chips.
  - Extended event narrative rendering to support inline claim-level citation markers.
  - Added optional event metadata fields:
    - `summarySourceIds`
    - `whyItMattersSourceIds`
  - Backfilled citation fields for all event locale metadata files and validated content integrity.
  - Performed manual QA refinement for key events (`1757-battle-of-plassey`, `1906-all-india-muslim-league-founded-in-dhaka`, `2024-anti-discrimination-movement`) to improve claim-to-source pairing quality.
- Roadmap synchronization:
  - Marked RM-006B as complete.
  - Marked RM-001 as complete with full-coverage note.
  - Marked RM-REL-003 as complete (event detail relationship section already shipped).
  - Marked RM-REL-004 as complete (localized Before this / After this navigation on event pages).
- Multi-agent AI integration governance:
  - Added `docs/AI_CONTRACT.md` as the canonical cross-agent schema/validation/change protocol.
  - Added `docs/EDITORIAL_RULES.md` for source policy, neutrality, and localization parity standards.
  - Updated `AGENTS.md` with mandatory contract-following and validator-gated schema-change rules.
  - Updated `docs/ROADMAP.md` with AI integration completion criteria for roadmap item closure.
  - Linked contract docs from `docs/CONTENT_MODEL.md`.
- Source quality badges groundwork (RM-002 foundation):
  - Added `EventResource.quality` support (`primary`, `secondary`, `archive`, `editorial`) in model + content normalization.
  - Added quality badge rendering in resource cards and timeline source chips.
  - Extended `content:validate` to validate allowed `quality` values in resource metadata.
  - Backfilled quality fields for resources used by landing (landmark) events.
  - Added source-quality rubric doc: `docs/SOURCE_QUALITY.md`.
- Source quality editorial curation completion (RM-002):
  - Reviewed and curated quality assignments for all 55 landmark-linked shared resources (EN/BN metadata).
  - Standardized landmark evidence labels with explicit per-resource mapping (including `archive` and `editorial` exceptions such as archive collections and video/novel sources).
- Evidence metadata rollout (RM-005):
  - Added `evidenceLevel` to timeline items and event narrative claim metadata (`summaryEvidenceLevel`, `whyItMattersEvidenceLevel`).
  - Added event-page and timeline UI evidence badges (EN/BN labels).
  - Extended content validation to enforce allowed evidence levels and require timeline evidence levels where citations exist.
  - Backfilled evidence levels across all event locale metadata and timeline entries based on referenced source-quality composition.
- Glossary rollout (RM-003):
  - Added glossary content model and seeded bilingual glossary term entries under `content/glossary/*`.
  - Added SSG glossary routes: `/{locale}/glossary` and `/{locale}/glossary/[term]`.
  - Added controlled glossary term-linking in event summary, why-it-matters, and timeline detail text.
  - Added glossary validation checks and sitemap coverage for glossary index/term routes.
  - Added glossary discoverability link in header navigation.
- Timeline theme filters rollout (RM-004):
  - Added timeline theme metadata support (`language`, `democracy`, `war`, `culture`, `economy`) to timeline model.
  - Backfilled theme values for all event timeline entries (EN/BN).
  - Added theme filter chips to event/home timelines.
  - Added theme filtering in full timeline explorer query flow (`theme` parameter + filter UI + pagination preservation).
  - Extended content validation to enforce non-empty timeline themes with allowed values.
- Section jump navigation rollout (RM-006):
  - Added localized `Jump to` anchor navigation on long event pages.
  - Added in-page anchors for Overview, Timeline, Figures, Resources, Quotes, and Why It Matters sections.
  - Added scroll offset-friendly section targets for sticky-header behavior.

## 2026-05-03

### Completed

- Added full timeline explorer route:
  - `/{locale}/timeline`
  - Includes search, year filter, and pagination.
- Added homepage CTA to open full timeline explorer.
- Added localized timeline explorer entries to sitemap.
- Expanded timeline citations rollout to all events:
  - Added `sourceIds` across timeline entries for `1757-battle-of-plassey`, `1857-sipahi-revolt`, `1947-partition-and-eastern-bengal`, `1969-mass-uprising`, `1971-liberation-war`, `1990-mass-uprising`, and `2024-anti-discrimination-movement` (EN/BN).
- Tightened content validation rules (`pnpm content:validate`):
  - Every timeline item must include non-empty `sourceIds`.
  - Every `sourceId` must exist in both global resources and the event-level `resource-ids.json`.
- Added optional timeline citations support:
  - `TimelineItem.sourceIds` in content type model.
  - Event timeline UI now renders source chips/links when `sourceIds` exist.
  - Event page now passes shared resources to timeline for source label resolution.
- Seeded citations for 1952 timeline entries in both locales:
  - `content/events/1952-language-movement/timeline.en.json`
  - `content/events/1952-language-movement/timeline.bn.json`
- Added new event content chapters:
  - `1757-battle-of-plassey` (Battle of Plassey / পলাশীর যুদ্ধ)
  - `1857-sipahi-revolt` (Sipahi Revolt / সিপাহী বিদ্রোহ)
  - `1969-mass-uprising` (Mass Uprising / গণঅভ্যুত্থান)
- Updated supported event slug registry in `src/types/content.ts`.
- Expanded figure dataset with new chapter-specific profiles and localization:
  - Added Plassey-related figure profiles for `1757-battle-of-plassey`.
  - Added 40 figure profiles for `1857-sipahi-revolt` (EN/BN metadata).
- Fixed `content/site/home.bn.json` malformed JSON string causing prerender failure.
- Updated root layout script handling to use `next/script` for initialization scripts.
- Synced docs with current content contract:
  - Event folder structure includes `book-ids.json`.
  - Content model event file contracts include `book-ids.json`.

## 2026-04-29

### Completed

- Refactored resources to normalized shared model:
  - events reference resources via `resource-ids.json`
  - shared resource records live under `content/resources/<resource-id>/meta.<locale>.json`
- Migrated existing event resource entries (including full 1971 resource set) to shared resources.
- Added content accessor support for shared resources:
  - `getResource`
  - `getEventsByResourceId`
- Updated `getEventContent` to resolve resources by IDs (strict normalized model).
- Synced documentation with current UI and implementation.
- Updated docs to reflect normalized shared resource model.
- Documented event full-figures route: `/{locale}/events/{slug}/figures`.
- Documented event resources categories route: `/{locale}/events/{slug}/resources`.
- Documented timeline progressive loading (`Show more` / `আরও দেখুন`).
- Documented timeline type badge support.
- Documented figure index optimization (`content/figures/index.en.json`, `index.bn.json`).

## 2026-04-28

### Completed

- Implemented light/dark theme support with persistent preference.
- Added early theme initialization in root layout to avoid first-paint mismatch.
- Replaced text-based theme toggle with color-based indicator toggle in header.
- Added timeline `Details` action per event on locale home page.
- Removed separate event card grid from locale home page.
- Refactored content model to normalized relationships:
  - events reference figures via `figure-ids.json`
  - events reference books via `book-ids.json`
- Added dedicated figure detail routes:
  - `/{locale}/figures/{id}`
- Added dedicated book detail routes:
  - `/{locale}/books/{id}`
- Added reverse-lookup content queries:
  - `getEventsByFigureId`
  - `getEventsByBookId`
- Added event-specific figure list route:
  - `/{locale}/events/{slug}/figures`
- Added event-specific categorized resources route:
  - `/{locale}/events/{slug}/resources`
- Added event page top-5 figures + `See full list` flow.
- Added resources by category + subcategory structure (`Read`, `Watch`, `Explore`, `Understand`).
- Added pagination for large figure lists.
- Moved and organized documentation into `docs/` and `docs/archive/`.

### Technical notes

- `src/lib/content.ts` remains the single content access layer.
- Runtime now uses `resource-ids.json` + shared `content/resources/*` for event resources.
- Legacy per-event `figures.<locale>.json` files are removed and unused.
