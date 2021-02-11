import { API } from '../api'


const login = user => {
    return API.post('/auth/login', user)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const logout = () => {
    return API.post('/auth/logout')
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const getAll = () => {
    return API.get("/users")
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const create = data => {
    return API.post('/users', data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const createComplete = data => {
    return API.post('/users/complete', data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const retrieve = id => {
    return API.get(`/users/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const update = (id, data) => {
    return API.patch(`/users/${id}`, data)
        .then(response => response)
        .catch(error => {
            throw error
        })
}

const destroy = id => {
    return API.delete(`/users/${id}`)
        .then(response => response)
        .catch(error => {
            throw error
        })
}


const userServices = {
    login,
    logout,
    getAll,
    create,
    createComplete,
    retrieve,
    update,
    destroy,
}

export default userServices
