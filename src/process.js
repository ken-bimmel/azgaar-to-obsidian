import Papa from "papaparse";
import Mustache from "mustache";
import { StateTemplate } from "./templates";

async function parseField(field) {
    if (field === null) {
        return field;
    }
    const parsedField = await Papa.parse(field, { header: true, skipEmptyLines: true });
    console.log(parsedField);
    if (parsedField.errors.length > 0) {
        throw new Error(parsedField.errors[0].message)
    }
    return parsedField.data;
}

function cleanStateFieldNames(statesParsed) {
    console.log(statesParsed);
    return statesParsed.map((element) => {
        const area = element["Area mi2"] || element["Area km2"];
        const totalPop = element["Total Population"];
        const ruralPop = element["Rural Population"];
        const urbanPop = element["Urban Population"];
        return {
            ...element,
            "Area": area,
            "TotalPopulation": totalPop,
            "RuralPopulation": ruralPop,
            "UrbanPopulation": urbanPop,
        }
    })
}

function makeStatesFiles(statesList) {
    return statesList.map((state) => {
        const md = Mustache.render(StateTemplate, state);
        return new File([md], `${state.State}.md`, { type: "text/plain" });
    })
}

export async function buildVault(
    states,
    provinces = null,
    diplomacy = null,
    cultures = null,
    zones = null,
    religions = null,
    burgs = null,
    rivers = null,
    military = null
) {
    let statesParsed;
    try {
        statesParsed = await parseField(states);
        const provincesParsed = await parseField(provinces);
        const diplomacyParsed = await parseField(diplomacy);
        const culturesParsed = await parseField(cultures);
        const zonesParsed = await parseField(zones);
        const religionsParsed = await parseField(religions);
        const burgsParsed = await parseField(burgs);
        const riversParsed = await parseField(rivers);
        const militaryParsed = await parseField(military);
    }
    catch (error) {
        throw error
    }

    const statesCleaned = cleanStateFieldNames(statesParsed);
    console.log(statesCleaned);
    const statesRendered = statesCleaned.map((e) => Mustache.render(StateTemplate, e));
    console.log(statesRendered[5]);
    console.log(makeStatesFiles(statesCleaned))
}
