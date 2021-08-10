import Papa from "papaparse";

async function parseField(field) {
    if (field === null) {
        return field;
    }
    const parsedField = await Papa.parse(field, { header: true, skipEmptyLines: true });
    console.log(parsedField);
    if (parsedField.errors.length > 0) {
        throw new Error(parsedField.errors[0].message)
    }
    return parsedField;

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
    try {
        const statesParsed = await parseField(states);
        const provincesParsed = await parseField(provinces);
        const diplomacyParsed = await parseField(diplomacy);
        const culturesParsed = await parseField(cultures);
        const zonesParsed = await parseField(zones);
        const religionsParsed = await parseField(religions);
        const burgsParsed = await parseField(burgs);
        const riversParsed = await parseField(rivers);
        const militaryParsed = await parseField(military);
    }
    catch (error) {
        throw error
    }
}
