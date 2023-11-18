const { default: axiosInstance } = require(".");

export const registeracademy = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.post('http://localhost:5000/academy/add-academy', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getacademy = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.post('http://localhost:5000/academy/get-academy', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}