import {
    PROVINCE_FIELD,
    STATE_FIELD
} from "./constants";

function buildFullStates(states, mappedProvinces, mappedBurgs, mappedMilitary, mappedDiplomacy) {
    return states.map((element) => {
        const key = element[STATE_FIELD];
        const military = mappedMilitary[key] && mappedMilitary[key].length > 0 ? mappedMilitary[key][0] : null;
        const diplomacy = mappedDiplomacy[key] && mappedDiplomacy[key].length > 0 ? mappedDiplomacy[key][0] : null;
        return {
            ...element,
            provinces: mappedProvinces[key],
            burgs: mappedBurgs[key],
            military,
            diplomacy,
        }
    });
}

function buildFullProvinces(provinces, mappedBurgs) {
    return provinces.map((element) => {
        const key = element[PROVINCE_FIELD]
        return {
            ...element,
            burgs: mappedBurgs[key],
        }
    });
}

export {
    buildFullStates,
    buildFullProvinces,
}