// TODO: merge these with makeMap from buildNestedData?

import { DIPLOMACY_STATE_FIELD } from "./constants";

function filledToYesNo(value) {
    try {
        return value.length > 0 ? "Yes" : "No"
    } finally {
        return "No";
    }
}


function cleanAreaElement(element) {
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
    };
}

function cleanAreaFieldNames(areas) {
    return areas.map((element) => cleanAreaElement(element))
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

    return {
        ...element,
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

// Applies the cleaning function to each element and 
// turns it into a map keyed on idKey field
function cleanAndMap(list, cleaningFunc, idKey) {
    if (list.length === 0) {
        return null;
    }
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
    cleanAreaFieldNames,
    cleanAreaElement,
    cleanBurgElement,
    cleanMilitaryElement,
    cleanDiplomacyElement,
    cleanAndMap,
}