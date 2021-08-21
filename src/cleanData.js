// TODO: merge these with makeMap from buildNestedData?

import {
    BURG_FIELD,
    CULTURE_FIELD,
    DIETY_FIELD,
    DIPLOMACY_STATE_FIELD,
    PROVINCE_FIELD,
    RELIGION_FIELD,
    RIVER_FIELD,
    STATE_FIELD,
    TYPE_FIELD
} from "./constants";
import { makeTagFields } from "./tagging";

function filledToYesNo(value) {
    try {
        return value.length > 0 ? "Yes" : "No"
    } catch {
        return "No";
    }
}


function cleanAreaElement(element) {
    const area = element["Area mi2"] || element["Area km2"];
    const totalPop = element["Total Population"];
    const ruralPop = element["Rural Population"];
    const urbanPop = element["Urban Population"];
    const tagFields = makeTagFields(element, [STATE_FIELD, PROVINCE_FIELD])
    return {
        ...element,
        ...tagFields,
        "Area": area,
        "TotalPopulation": totalPop,
        "RuralPopulation": ruralPop,
        "UrbanPopulation": urbanPop,
    };
}

function cleanStateElements(areas) {
    if (areas) {
        return areas.map((element) => cleanAreaElement(element))
    }
    return [];
}

function cleanProvinceElements(areas) {
    return cleanStateElements(areas);
}

function cleanBurgElement(element) {
    const capital = filledToYesNo(element["Capital"]);
    const citadel = filledToYesNo(element["Citadel"]);
    const plaza = filledToYesNo(element["Plaza"]);
    const port = filledToYesNo(element["Port"]);
    const shantyTown = filledToYesNo(element["Shanty Town"]);
    const temple = filledToYesNo(element["Temple"]);
    const walls = filledToYesNo(element["Walls"]);

    const elevation = element["Elevation (ft)"] || element["Elevation (m)"]

    const tagFields = makeTagFields(element, [STATE_FIELD, PROVINCE_FIELD, BURG_FIELD])

    return {
        ...element,
        ...tagFields,
        "Capital": capital,
        "Citadel": citadel,
        "Plaza": plaza,
        "Port": port,
        "ShantyTown": shantyTown,
        "Temple": temple,
        "Walls": walls,
        "Elevation": elevation,
    };
}

function cleanBurgElements(burgs) {
    return burgs.map((element) => cleanBurgElement(element))
}

function cleanMilitaryElement(element) {
    const archersCount = parseInt(element["Archers"]) || 0;
    const artilleryCount = parseInt(element["Artillery"]) || 0;
    const cavalryCount = parseInt(element["Cavalry"]) || 0;
    const infantryCount = parseInt(element["Infantry"]) || 0;
    const totalInService = parseInt(element["Total"]);
    const landTotal = archersCount + artilleryCount + cavalryCount + infantryCount;
    const navalTotal = totalInService - landTotal;

    return {
        ...element,
        "LandTotal": landTotal,
        "NavalTotal": navalTotal,
    };
}

function cleanDiplomacyElement(element) {
    let relationships = [];
    for (let key of Object.keys(element)) {
        if (key !== DIPLOMACY_STATE_FIELD && element[key] !== "x") {
            relationships.push({ RelatedState: key, Relationship: element[key] });
        }
    }
    return relationships;
}

function cleanReligionElements(religions) {
    return religions.map((element) => {
        const area = element["Area mi2"] || element["Area km2"];

        const tagFields = makeTagFields(element, [RELIGION_FIELD, DIETY_FIELD])
        return {
            ...element,
            ...tagFields,
            "Area": area,
        }
    });
}

function cleanCultureElements(cultures) {
    return cultures.map((element) => {
        const area = element["Area mi2"] || element["Area km2"];
        const emblem = element["Emblems Shape"];

        const tagFields = makeTagFields(element, [CULTURE_FIELD, TYPE_FIELD]);
        return {
            ...element,
            ...tagFields,
            "Area": area,
            "Emblem": emblem,
        }
    });
}

function cleanRiverElements(rivers) {
    return rivers.map((element) => {
        const tagFields = makeTagFields(element, [RIVER_FIELD]);
        return {
            ...element,
            ...tagFields,
        }
    });
}

// Applies the cleaning function to each element and 
// turns it into a map keyed on idKey field
function cleanAndMap(list, cleaningFunc, idKey) {
    if (list.length === 0) {
        return {};
    };

    const map = list.reduce((map, element) => {
        const key = element[idKey];
        const cleanedElement = cleaningFunc(element);
        if (map[key]) {
            map[key] = [...map[key], cleanedElement];
        } else {
            map[key] = [cleanedElement];
        }
        return map;
    }, {})
    return map;
}

export {
    cleanAreaElement,
    cleanBurgElement,
    cleanMilitaryElement,
    cleanDiplomacyElement,
    cleanStateElements,
    cleanProvinceElements,
    cleanBurgElements,
    cleanReligionElements,
    cleanCultureElements,
    cleanRiverElements,
    cleanAndMap,
}