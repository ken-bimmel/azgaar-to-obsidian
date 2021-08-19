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

export {
    cleanAreaFieldNames,
    cleanBurgFieldNames,
}