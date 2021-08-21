class ParsingError extends Error {
    constructor(datasetName, errorMessage, ...params) {
        const messageString = `Error parsing ${datasetName} dataset: ${errorMessage}`
        const overwrittenParams = [messageString, ...params]
        super(...overwrittenParams);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParsingError);
        }

        this.name = "Parsing Error";
    }
}

export {
    ParsingError,
}