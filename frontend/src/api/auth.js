import axios from 'axios';
const URL = 'http://localhost:3001/users'

export const login = async ({ email, password }) => {
    console.log(email, password)
    try {
        const res = await axios.post(`${URL}/login`, {
            email,
            password
        })
        console.log(res);
        return res;
    }
    catch (error) {
        throw error;
    }
}

export const register = async ({ email, password, name, contact }) => {
    try {
        const res = await axios.post(`${URL}`, {
            email,
            name,
            password,
            contact
        })

        return res;
    }
    catch (error) {
        throw error;
    }
}

export const getuser = async (id) => {
    try {
        const res = await axios.get(`${URL}/${id}`)
        console.log(res);
        return res;
    }
    catch (error) {
        throw error;
    }
}