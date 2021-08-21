function makeValidTag(value) {
    if (value) {
        const invalidCharacterRegex = /[^A-z0-9-/_]/ig
        return value.replaceAll(invalidCharacterRegex, "");
    }
    return value
}

function makeTagFieldName(field) {
    return `${field}Tag`;
}

function makeTagFields(object, fields) {
    let tagFields = {};
    for (let field of fields) {
        tagFields[makeTagFieldName(field)] = makeValidTag(object[field])
    }
    return tagFields;
}

export {
    makeTagFields,
}