import axios from 'axios'

const URL_SCHEMA = process.env.REACT_APP_URL_SCHEMA
const DOMAIN = process.env.REACT_APP_DOMAIN
const BASE_API_V1 = process.env.REACT_APP_BASE_API_V1
const API_V1 = `${URL_SCHEMA}://${DOMAIN}${BASE_API_V1}`
const authUser = process.env.REACT_APP_LOCAL_STORAGE_USER

export const API = axios.create({
    baseURL: API_V1,
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use(function (config) {
    const USER = JSON.parse(localStorage.getItem(authUser)),
        TOKEN = USER ? USER.auth_token : false
    config.headers.Authorization = TOKEN ? `Bearer ${TOKEN}` : ''
    return config;
})

API.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        const error_response = error.response
        if (error_response) {
            switch (error_response.status) {
                case 401:
                    if (
                        error_response &&
                        error_response.data &&
                        error_response.data.error_type &&
                        error_response.data.error_type === "NotAuthenticated"
                    ) {
                        localStorage.removeItem(authUser)
                        window.location.reload(false)
                    }
                    break
                case 500:
                    throw Object({
                        error_type: "InternalError",
                        errors: [{ message: error_response.request.statusText }]
                    })
                default:
                    console.log(Object(error_response.data));
                    throw Object(error_response.data)
            }
        }

        throw Object({
            error_type: "NetworkError",
            errors: [{ message: error.message }]
        })
    }
)
