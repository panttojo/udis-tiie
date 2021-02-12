import { API } from '../api'

const PATH = "/udis"


const getAll = params => {
    return API.get(PATH, { params })
        .then(response => response)
        .catch(error => {
            throw error
        })
}


const services = {
    getAll,
}

export default services
