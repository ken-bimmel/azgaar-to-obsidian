import Papa from "papaparse";
import Mustache from "mustache";
import {
    StateGenerationConfig,
    ProvinceGenerationConfig,
    BurgGenerationConfig,
    ReligionGenerationConfig,
} from "./templates";
import {
    cleanAndMap,
    cleanAreaFieldNames,
    cleanAreaElement,
    cleanBurgElement,
    cleanMilitaryElement,
    cleanDiplomacyElement,
    cleanReligionElements,
} from "./cleanData";
import { buildFullStates } from "./buildFullObjects";
import {
    STATE_FIELD,
    DIPLOMACY_STATE_FIELD,
} from "./constants";

async function parseField(field) {
    if (field === null) {
        return null;
    }
    const parsedField = await Papa.parse(field, { header: true, skipEmptyLines: true });
    console.log(parsedField);
    if (parsedField.errors.length > 0) {
        throw new Error(parsedField.errors[0].message)
    }
    return parsedField.data;
}

function makeFiles(objectList, configObject) {
    const { template, filepathGenerator } = configObject;
    return objectList.map((object => {
        const md = Mustache.render(template, object);
        if (configObject === ReligionGenerationConfig) {
            console.log(md, object);
        }
        return new File([md], filepathGenerator(object), { type: "text/plain" })
    }))
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
    let provincesParsed;
    let diplomacyParsed;
    let culturesParsed;
    let zonesParsed;
    let religionsParsed;
    let burgsParsed;
    let riversParsed;
    let militaryParsed;
    try {
        statesParsed = await parseField(states);
        provincesParsed = await parseField(provinces);
        diplomacyParsed = await parseField(diplomacy);
        culturesParsed = await parseField(cultures);
        zonesParsed = await parseField(zones);
        religionsParsed = await parseField(religions);
        burgsParsed = await parseField(burgs);
        riversParsed = await parseField(rivers);
        militaryParsed = await parseField(military);
    }
    catch (error) {
        throw error
    }

    const statesCleaned = cleanAreaFieldNames(statesParsed);
    const provinceMap = cleanAndMap(provincesParsed, cleanAreaElement, STATE_FIELD);
    const burgMap = cleanAndMap(burgsParsed, cleanBurgElement, STATE_FIELD);
    const militaryMap = cleanAndMap(militaryParsed, cleanMilitaryElement, STATE_FIELD);
    const diplomacyMap = cleanAndMap(diplomacyParsed, cleanDiplomacyElement, DIPLOMACY_STATE_FIELD);
    const fullStates = buildFullStates(statesCleaned, provinceMap, burgMap, militaryMap, diplomacyMap);
    const religionsCleaned = cleanReligionElements(religionsParsed);
    return [
        ...makeFiles(fullStates, StateGenerationConfig),
        ...makeFiles(religionsCleaned, ReligionGenerationConfig),
    ];
}
