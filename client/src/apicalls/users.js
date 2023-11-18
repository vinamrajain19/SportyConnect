const { default: axiosInstance } = require(".");

export const registerUser = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.post('http://localhost:5000/auth/register', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const loginUser = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.post('http://localhost:5000/auth/login', payload);
        return response.data;

    } catch (error) {
        return error.response.data;
    }
}

export const edituser = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.patch('http://localhost:5000/play/editprofile', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}



export const getpeers = async () => {
    try {
        const response = await axiosInstance.get('http://localhost:5000/play/getplayers');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getPreviousData = async () => {
    try {
        const response = await axiosInstance.get('http://localhost:5000/play/getplayerdata');
       // console.log("hii");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

