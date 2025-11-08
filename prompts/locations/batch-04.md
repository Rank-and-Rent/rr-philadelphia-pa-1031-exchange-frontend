# LOCATIONS Content Generation — BATCH 04  Items 19 to 23

## Your Mission
Generate SEO optimized content for 5 locations near Philadelphia, PA that help users find replacement properties nationwide.

**Critical**
- No boilerplate
- Include Philadelphia, PA once in each body
- Rank and rent compliant language only
- Emphasize nationwide property identification support
- Use the assigned layout key

## Research Requirements
1) Search "[Location] [STATE] population 2024 2025"
2) Search "[Location] [STATE] major employers industries"
3) Search "[Location] [STATE] neighborhoods business districts"
4) Confirm map location and radius

## Locations In This Batch  5 total
1) west-chester-pa — West Chester, PA  Layout: map-first
2) doylestown-pa — Doylestown, PA  Layout: content-first
3) newtown-pa — Newtown, PA  Layout: sidebar-location
4) langhorne-pa — Langhorne, PA  Layout: minimal-location
5) remote — Nationwide Remote  Layout: detailed-location

## Content Requirements  for EACH Location
### 1. Main Description  180 to 260 words
- Local exchange drivers, asset types, any transfer or documentary tax notes
- One reference to Philadelphia, PA
- Mention national identification support
- Follow the assigned layout sections

### 2. Popular Paths  rank 1 to 6
- Order services or property types with 2 to 3 sentence rationale each

### 3. FAQs  4 items
- Include the location and state abbreviation in each answer

### 4. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "location":"[Location, STATE]", "situation":"...", "ourApproach":"...", "expectedOutcome":"..." }

## Output Format  TypeScript  write to /data/batches/locations/batch-04.ts
export const locationsBatch04 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}

