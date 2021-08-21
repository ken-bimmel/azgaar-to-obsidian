import { STATE_FIELD, PROVINCE_FIELD, BURG_FIELD, RELIGION_FIELD } from "./constants";

/*
 * Templates
 */
const StateTemplate =
    `# {{State}}
---
| Attribute | Value |
| --- | --- |
| ID | {{Id}} |
| State | {{State}} |
| Form | [[{{Form}}]] |
| Color | {{Color}} |
| Capital | [[{{Capital}}]] |
| Culture | [[{{Culture}}]] |
| Type | [[{{Type}}]] |
| Expansionism | {{Expansionism}} |
| Cells | {{Cells}} |
| Burgs | {{Burgs}} |
| Area (mi^2) | {{Area}} |
| Total Population | {{TotalPopulation}} |
| Rural Population | {{RuralPopulation}} |
| Urban Population | {{UrbanPopulation}} |
---
**Tags:** #State #{{State}}
---

## Provinces
---
| Province | Area | Population |
| --- | --- | --- |
{{#provinces}}
| [[{{Province}}]] | {{Area}} | {{TotalPopulation}} |
{{/provinces}}
---

## Burgs
---
| Burg | Province | Population |
| --- | --- | --- |
{{#burgs}}
| [[{{Burg}}]] | [[{{Province}}]] | {{Population}} |
{{/burgs}}
---

{{#military}}
## Military Forces
---
### Land Forces
| Type | Number |
| --- | --- |
| Archers | {{military.Archers}} |
| Artillery | {{military.Artillery}} |
| Cavalry | {{military.Cavalry}} |
| Foot Infantry | {{military.Infantry}} |
| Total | {{military.LandTotal}} |

### Naval Forces
| Type | Number |
| --- | --- |
| Ships | {{military.Fleet}} |
| Naval Personnel | {{military.NavalTotal}} |

**Military Participation rate:** {{military.Rate}}
---
{{/military}}

## Diplomacy
---
| State | Relationship |
| --- | --- |
{{#diplomacy}}
| [[{{RelatedState}}]] | {{Relationship}} |
{{/diplomacy}}
`;

const ProvinceTemplate =
    `# {{Province}}
---
| Attribute | Value |
| --- | --- |
| ID | {{Id}} |
| Province | {{Province}} |
| Form | [[{{Form}}]] |
| State | [[{{State}}]] |
| Color | {{Color}} |
| Capital | [[{{Capital}}]] |
| Area (mi^2) | {{Area}} |
| Total Population | {{TotalPopulation}} |
| Rural Population | {{RuralPopulation}} |
| Urban Population | {{UrbanPopulation}} |
---
**Tags:** #Province #{{State}} #{{Province}}
---

## Burgs
---
| Burg | Population |
| --- | --- |
{{#burgs}}
| [[{{Burg}}]] | {{Population}} |
{{/burgs}}
---
`;

const BurgTemplate =
    `# {{ Burg }}
---
| Attribute | Value |
| --- | --- |
| ID | {{Id}} |
| Province | [[{{Province}}]] |
| State | [[{{State}}]] |
| Culture | [[{{Culture}}]] |
| Religion | [[{{Religion}}]] |
| Population | {{Population}} |
| Elevation (ft) | {{Elevation}} |
| Latitude | {{Latitude}} |
| Longitude | {{Longitude}} |
---
**Tags:** #Burg #{{State}} #{{Province}} #{{Burg}}
---

## Features

| Feature | Present in Burg? |
| --- | --- |
| Capital | {{Capital}} |
| Citadel | [{Citadel}} |
| Plaza | {{Plaza}} |
| Port | {{Port}} |
| Shanty Town | {{ShantyTown}} |
| Temple | {{Temple}} |
| Walls | {{Walls}} |
`;

const ReligionTemplate =
    `# {{Religion}}
---
| Attribute | Value |
| --- | --- |
| ID | {{Id}} |
| Deity | [[{{Deity}}]] |
| Form | {{Form}} |
| Type | {{Type}} |
| Color | {{Color}} |
| Number of believers | {{Believers}} |
| Area under sway | {{Area}} |
---
**Tags:** #Religion #{{Religion}} #{{Deity}}
---`
/*
 * File names
 */

function makeStateFileName(object) {
    return `states/${object[STATE_FIELD]}/${object[STATE_FIELD]}.md`
};
function makeProvinceFileName(object) {
    return `states/${object[STATE_FIELD]}/${object[PROVINCE_FIELD]}/${object[PROVINCE_FIELD]}.md`
};
function makeBurgFileName(object) {
    return `states/${object[STATE_FIELD]}/${object[PROVINCE_FIELD]}/${object[BURG_FIELD]}.md`
};
function makeReligionFileName(object) {
    return `religion/${object[RELIGION_FIELD]}/${object[RELIGION_FIELD]}.md`
}

/*
 * Configs
 */
function makeGenerationConfig(template, filepathGenerator) {
    return {
        template,
        filepathGenerator
    }
};

const StateGenerationConfig = makeGenerationConfig(StateTemplate, makeStateFileName);
const ProvinceGenerationConfig = makeGenerationConfig(ProvinceTemplate, makeProvinceFileName);
const BurgGenerationConfig = makeGenerationConfig(BurgTemplate, makeBurgFileName);
const ReligionGenerationConfig = makeGenerationConfig(ReligionTemplate, makeReligionFileName);


export {
    StateGenerationConfig,
    ProvinceGenerationConfig,
    BurgGenerationConfig,
    ReligionGenerationConfig,
}