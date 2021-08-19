import { STATE_FIELD, PROVINCE_FIELD } from "./constants";

function makeMap(list, idKey) {
    const map = list.reduce((map, element) => {
        const key = element[idKey];
        if (map[key]) {
            map[key] = [...map[key], element];
        } else {
            map[key] = [element];
        }
        return map;
    })
    return map
}

function buildNestedStates(states, provinces, burgs) {
    const mappedProvinces = makeMap(provinces, STATE_FIELD);
    const mappedBurgs = makeMap(burgs, STATE_FIELD);
    console.log({ mappedProvinces, mappedBurgs })
    return states.map((element) => {
        const key = element[STATE_FIELD];
        return {
            ...element,
            provinces: mappedProvinces[key],
            burgs: mappedBurgs[key],
        }
    });
}

function buildNestedProvinces(provinces, burgs) {
    const mappedBurgs = makeMap(burgs, PROVINCE_FIELD);
    return provinces.map((element) => {
        const key = element[PROVINCE_FIELD];
        return {
            ...element,
            burgs: mappedBurgs[key],
        }
    });
}

export {
    buildNestedStates,
    buildNestedProvinces,
}