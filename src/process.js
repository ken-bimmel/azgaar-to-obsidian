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
    cleanProvinceElements,
    cleanBurgElements,
    cleanRiverElements,
} from "./cleanData";
import { buildFullProvinces, buildFullStates } from "./buildFullObjects";
import {
    STATE_FIELD,
    PROVINCE_FIELD,
    DIPLOMACY_STATE_FIELD,
} from "./constants";
import {
    ParsingError
} from "./errors";

async function parseField(field, name) {
    try {
        if (field === null) {
            return [];
        }
        const parsedField = await Papa.parse(field, { header: true, skipEmptyLines: true });
        if (parsedField.errors.length > 0) {
            throw new Error(parsedField.errors[0].message)
        }
        return parsedField.data;
    } catch (e) {
        throw new ParsingError(name, e.message);
    }
}

function makeFiles(objectList, configObject) {
    const { template, filepathGenerator } = configObject;
    return objectList.map((object => {
        const md = Mustache.render(template, object);
        if (configObject === BurgGenerationConfig) {
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
    const statesParsed = await parseField(states, "States");
    const provincesParsed = await parseField(provinces, "Provinces");
    const diplomacyParsed = await parseField(diplomacy, "Diplomacy");
    const culturesParsed = await parseField(cultures, "Cultures");
    const religionsParsed = await parseField(religions, "Religions");
    const burgsParsed = await parseField(burgs, "Burgs");
    const riversParsed = await parseField(rivers, "Rivers");
    const militaryParsed = await parseField(military, "Military");

    const fullStates = buildFullStates(
        cleanStateElements(statesParsed),
        cleanAndMap(provincesParsed, cleanAreaElement, STATE_FIELD),
        cleanAndMap(burgsParsed, cleanBurgElement, STATE_FIELD),
        cleanAndMap(militaryParsed, cleanMilitaryElement, STATE_FIELD),
        cleanAndMap(diplomacyParsed, cleanDiplomacyElement, DIPLOMACY_STATE_FIELD)
    );
    const fullProvinces = buildFullProvinces(
        cleanProvinceElements(provincesParsed),
        cleanAndMap(burgsParsed, cleanBurgElement, PROVINCE_FIELD)
    )

    const burgsCleaned = cleanBurgElements(burgsParsed);
    const religionsCleaned = cleanReligionElements(religionsParsed);
    const culturesCleaned = cleanCultureElements(culturesParsed);
    const riversCleaned = cleanRiverElements(riversParsed);

    return [
        ...makeFiles(fullStates, StateGenerationConfig),
        ...makeFiles(fullProvinces, ProvinceGenerationConfig),
        ...makeFiles(burgsCleaned, BurgGenerationConfig),
        ...makeFiles(religionsCleaned, ReligionGenerationConfig),
        ...makeFiles(culturesCleaned, CultureGenerationConfig),
        ...makeFiles(riversCleaned, RiverGenerationConfig),
    ];
}
