import axios from "axios";

export const baseUrl = "http://localhost:3001";


export const getData = async (url: string) => {
    try {
        const response = await axios.get(`${baseUrl}${url}`, {
            headers: {
            },
        });

        return response;

    } catch (error) {
        console.error("Error:", error);
        return error;
    }
};

export const postData = async (url:string, post:object, formData = false) => {
    try {
        const response = await axios.post(`${baseUrl}${url}`, post, {
            headers: {
                "Content-Type": formData ? "multipart/form-data" : "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error
        console.error("Error: ", error);
    }
};

export const putData = async (url: string, post: object) => {
    try {
        const response = await axios.put(`${baseUrl}${url}`, post, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const patchData = async (url: string, post: object) => {
    try {
        const response = await axios.patch(`${baseUrl}${url}`, post, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const deleteData = async (url: string, post: object) => {
    try {
        const response = await axios.delete(`${baseUrl}${url}`, {
            data: post,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
