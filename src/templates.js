function makeGenerationConstants(template, folder, nameField) {
    return {
        template,
        folder,
        nameField
    }
}
const StateTemplate = `
# {{State}}
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
const StateGenerationConfig = makeGenerationConstants(StateTemplate, "states", "State");
const ProvinceTemplate = `
# {{Province}}
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

const ProvinceGenerationConfig = makeGenerationConstants(ProvinceTemplate, "provinces", "Province");
export {
    StateGenerationConfig,
    ProvinceGenerationConfig,
}