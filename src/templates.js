const STATE_FIELD = "State";
const PROVINCE_FIELD = "Province";
const BURG_FIELD = "Burg";

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
**Tags:** #State
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
**Tags:** #Province
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
**Tags:** #Burg
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