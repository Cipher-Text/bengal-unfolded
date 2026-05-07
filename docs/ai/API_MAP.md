# API Map (AI)

Last verified: 2026-05-08

This project has no backend HTTP API layer. The practical API is the content access module:

- `src/lib/content.ts`

## Content access functions

Core reads:
- `getHomeContent(locale)`
- `getEventMeta(locale, slug)`
- `getEventContent(locale, slug)`
- `getAllEvents(locale)`
- `getFigure(locale, figureId)`
- `getAllFigures(locale)`
- `getBook(locale, bookId)`
- `getAllBooks(locale)`
- `getResource(locale, resourceId)`
- `getAllResources(locale)`

Relationship/derived reads:
- `getPreviousAndNextEvents(locale, slug)`
- `getEventHierarchy(locale, slug)`
- `getEventRelationships(locale, slug)`
- `getEventsByFigureId(locale, figureId)`
- `getFiguresByEventSlug(locale, slug)`
- `getEventsByBookId(locale, bookId)`
- `getEventsByResourceId(locale, resourceId)`
- `getAllCreators(locale)`
- `getCreatorById(locale, creatorId)`
- `getResourcesByCreatorId(locale, creatorId)`

Period/movement/glossary:
- `getPeriod(locale, periodId)`
- `getAllPeriods(locale)`
- `getEventsByPeriodId(locale, periodId)`
- `getMovement(locale, movementId)`
- `getAllMovements(locale)`
- `getEventsByMovementId(locale, movementId)`
- `getGlossaryTerm(locale, termId)`
- `getAllGlossaryTerms(locale)`
- `getAllGlossaryTermIds()`

## Route -> data map

- `/:locale` -> `getHomeContent`, `getAllEvents`
- `/:locale/timeline` -> `getAllEvents`
- `/:locale/events/:slug` -> `getEventContent`, `getPreviousAndNextEvents`, `getEventHierarchy`, `getEventRelationships`
- `/:locale/events/:slug/figures` -> `getEventMetaForDisplay`, `getFiguresByEventSlug`
- `/:locale/events/:slug/resources` -> `getEventContent`, `getEventMetaForDisplay`
- `/:locale/figures` -> `getAllFigures`
- `/:locale/figures/:id` -> `getFigure`, `getEventsByFigureId`
- `/:locale/books/:id` -> `getBook`, `getEventsByBookId`
- `/:locale/resources/:id` -> `getResource`, `getEventsByResourceId`
- `/:locale/creators/:id` -> `getAllCreators`, `getResourcesByCreatorId`, `getEventsByResourceId`
- `/:locale/glossary` -> `getAllGlossaryTerms`
- `/:locale/glossary/:term` -> `getAllGlossaryTermIds`, `getGlossaryTerm`
- `/:locale/periods/:id` -> `getPeriod`, `getEventsByPeriodId`
- `/:locale/movements/:id` -> `getMovement`, `getEventsByMovementId`
- `/sitemap.xml` -> `getAllResourceIds`, `getAllGlossaryTermIds`, `getAllCreators`

## Validation pipeline

- `scripts/validate-content.mjs` is the enforcement gate for content file shape and cross-reference integrity.
