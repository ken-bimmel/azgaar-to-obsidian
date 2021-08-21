// TODO: merge these with makeMap from buildNestedData?

function filledToYesNo(value) {
    try {
        return value.length > 0 ? "Yes" : "No"
    } finally {
        return "No";
    }
}

function cleanAreaFieldNames(areasParsed) {
    return areasParsed.map((element) => {
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

function cleanBurgFieldNames(burgsParsed) {
    return burgsParsed.map((element) => {
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
        }
    })
}

function cleanMilitaryFieldNames(element) {
    const archersCount = element["Archers"] || 0;
    const artilleryCount = element["Artillery"] || 0;
    const cavalryCount = element["Cavalry"] || 0;
    const infantryCount = element["Infantry"] || 0;
    const totalInService = element["Total"];
    const landTotal = archersCount + artilleryCount + cavalryCount + infantryCount;
    const navalTotal = totalInService - landTotal;

    return {
        ...element,
        "LandTotal": landTotal,
        "NavalTotal": navalTotal,
    }
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
    return map
}

export {
    cleanAreaFieldNames,
    cleanBurgFieldNames,
    cleanMilitaryFieldNames,
    cleanAndMap,
}