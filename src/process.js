import Papa from "papaparse";
import Mustache from "mustache";
import {
    StateGenerationConfig,
    ProvinceGenerationConfig,
    BurgGenerationConfig,
    ReligionGenerationConfig,
    CultureGenerationConfig,
    RiverGenerationConfig,
} from "./templates";
import {
    cleanAndMap,
    cleanStateElements,
    cleanAreaElement,
    cleanBurgElement,
    cleanMilitaryElement,
    cleanDiplomacyElement,
    cleanReligionElements,
    cleanCultureElements,
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
        if (configObject === RiverGenerationConfig) {
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
    religions = null,
    burgs = null,
    rivers = null,
    military = null
) {
    const statesParsed = await parseField(states);
    const provincesParsed = await parseField(provinces);
    const diplomacyParsed = await parseField(diplomacy);
    const culturesParsed = await parseField(cultures);
    const religionsParsed = await parseField(religions);
    const burgsParsed = await parseField(burgs);
    const riversParsed = await parseField(rivers);
    const militaryParsed = await parseField(military);

    const fullStates = buildFullStates(
        cleanStateElements(statesParsed),
        cleanAndMap(provincesParsed, cleanAreaElement, STATE_FIELD),
        cleanAndMap(burgsParsed, cleanBurgElement, STATE_FIELD),
        cleanAndMap(militaryParsed, cleanMilitaryElement, STATE_FIELD),
        cleanAndMap(diplomacyParsed, cleanDiplomacyElement, DIPLOMACY_STATE_FIELD)
    );
    const religionsCleaned = cleanReligionElements(religionsParsed);
    const culturesCleaned = cleanCultureElements(culturesParsed);

    return [
        ...makeFiles(fullStates, StateGenerationConfig),
        ...makeFiles(religionsCleaned, ReligionGenerationConfig),
        ...makeFiles(culturesCleaned, CultureGenerationConfig),
        ...makeFiles(riversParsed, RiverGenerationConfig),
    ];
}
