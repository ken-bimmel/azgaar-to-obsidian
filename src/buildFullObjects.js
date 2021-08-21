import { STATE_FIELD } from "./constants";


function buildFullState(states, mappedProvinces, mappedBurgs, mappedMilitary) {
    console.log("states", states);
    return states.map((element) => {
        const key = element[STATE_FIELD];
        const military = mappedMilitary[key] && mappedMilitary[key].length > 0 ? mappedMilitary[key][0] : null;
        return {
            ...element,
            provinces: mappedProvinces[key],
            burgs: mappedBurgs[key],
            military,
        }
    });
}

export {
    buildFullState,
}