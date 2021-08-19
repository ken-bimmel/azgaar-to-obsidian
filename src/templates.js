import { STATE_FIELD, PROVINCE_FIELD, BURG_FIELD } from "./constants";

function makeGenerationConstants(template, filepathGenerator) {
    return {
        template,
        filepathGenerator
    }
};

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
`
function makeStateFileName(object) {
    return `states/${object[STATE_FIELD]}/${object[STATE_FIELD]}.md`
};
const StateGenerationConfig = makeGenerationConstants(StateTemplate, makeStateFileName);

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
function makeProvinceFileName(object) {
    return `states/${object[STATE_FIELD]}/${object[PROVINCE_FIELD]}/${object[PROVINCE_FIELD]}.md`
};
const ProvinceGenerationConfig = makeGenerationConstants(ProvinceTemplate, makeProvinceFileName);

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
function makeBurgFileName(object) {
    return `states/${object[STATE_FIELD]}/${object[PROVINCE_FIELD]}/${object[BURG_FIELD]}.md`
};
const BurgGenerationConfig = makeGenerationConstants(BurgTemplate, makeBurgFileName);
export {
    StateGenerationConfig,
    ProvinceGenerationConfig,
    BurgGenerationConfig,
}