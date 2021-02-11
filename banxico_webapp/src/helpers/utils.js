export const URL_SCHEMA = process.env.REACT_APP_URL_SCHEMA
export const DOMAIN = process.env.REACT_APP_DOMAIN
export const BASE_API_V1 = process.env.REACT_APP_BASE_API_V1
export const API_V1 = `${URL_SCHEMA}://${DOMAIN}${BASE_API_V1}`


export const getTenant = username => {
    try {
        return username.split('.')[0]
    } catch (error) {
        return ''
    }
}

export const getErrors = ({ errors, error_type }) => {

    let validationErrors = []
    let generalErrors = []
    let importExcelManyErrors = []

    switch (error_type) {
        case 'ValidationError':
            validationErrors = errors
            break;
        case 'ImportExcelManyErrors':
            importExcelManyErrors = errors
            break;

        default:
            generalErrors = errors
            break;
    }

    return {
        importExcelManyErrors,
        generalErrors,
        validationErrors,
        totalErrors: generalErrors && validationErrors && importExcelManyErrors ? generalErrors.length + validationErrors.length + importExcelManyErrors.length : 0
    }
}
