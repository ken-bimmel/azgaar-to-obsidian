import Papa from "papaparse";
import Mustache from "mustache";
import {
    StateGenerationConfig,
    ProvinceGenerationConfig,
    BurgGenerationConfig,
} from "./templates";
import {
    cleanAreaFieldNames,
    cleanBurgFieldNames,
} from "./cleanData";

async function parseField(field) {
    if (field === null) {
        return [];
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
    const provincesCleaned = cleanAreaFieldNames(provincesParsed);
    const burgsCleaned = cleanBurgFieldNames(burgsParsed);
    return [
        ...makeFiles(statesCleaned, StateGenerationConfig),
        ...makeFiles(provincesCleaned, ProvinceGenerationConfig),
        ...makeFiles(burgsCleaned, BurgGenerationConfig),
    ];
}
