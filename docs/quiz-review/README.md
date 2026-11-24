# Bengali review of the quiz text

Reviewer pack for the Bengali (and English meaning-match) text of the Bengal Unfolded quiz. Nothing here is published yet: every quiz question is still `draft`, and the quiz stays hidden on the site until the review is done and the questions are set to `published`.

## What to review

Open `bengali-review.csv` in Google Sheets or Excel (UTF-8; if Bengali looks broken in Excel, import it as UTF-8). It has 288 rows (questions marked HELD are waiting for a source and may still change; review them last):

- 40 quiz questions on the Liberation War topic: each question, each answer option and each explanation, in English and Bengali.
- The quiz's site copy: the intro line, the disclaimer, the four result titles and messages, and the short feedback lines.
- The quiz's on-screen labels: buttons, messages, the share card text, menu and page text.

Columns:

| Column | Meaning |
| --- | --- |
| Item ID | Where the text lives (for example `lib-001.question`, `lib-001.option.b`, `site.tier.story-keeper.title`). Do not change it. |
| Area, Role | What the text is. For answer options, Role says whether it is the correct answer or a wrong option, so you can check the Bengali keeps the same meaning. |
| English | The source meaning. |
| Bengali (current) | The text as written now. |
| Reviewer correction | Write the corrected Bengali here. Leave blank if the current text is fine. |
| Reviewer note | Any comment, for example why you changed it. |
| Author's question for reviewer | A phrase the author is unsure about. Please answer these first. |

## What to check

1. Does the Bengali say the same thing as the English? Do not change facts or meaning. If the English itself looks wrong, say so in the note.
2. Is it natural, correct Bengali (spelling, grammar, word choice, tone)? The tone should be warm and curious, not stiff or exam-like.
3. Are names, places and terms spelled the way the rest of the site spells them (for example গরীবপুর/গরিবপুর, কামালপুর, হিলি, বেলোনিয়া, আখাউড়া, দরুইন, মুক্তিবাহিনী, মুজিবনগর)?
4. Do the four result titles feel right? Current: কৌতূহলী পাঠক, গল্পের সন্ধানী, কাহিনির রক্ষক, বাংলার অভিযাত্রী.
5. Do wrong options still read as clearly wrong, without being silly or offensive, and does a correct option never give itself away?
6. Is the wording of sensitive topics (the 1971 war, the killings of intellectuals, the war crimes tribunal) neutral and respectful?

## Notes on the text

- Keep placeholders such as `${n}`, `${total}`, `${topic}` or `${tier}` exactly as they are. They are filled in by the site.
- Numbers inside questions use Bengali numerals. Dates and names should match how the event pages write them.
- Sentences end with the danda (।).
- The English column is not final marketing copy. If an English line reads badly, mention it in the note.

## Returning your edits

Send the filled CSV back. The author will apply each non-blank correction to the matching file by Item ID, re-run the content checks, and only then publish the approved questions.
