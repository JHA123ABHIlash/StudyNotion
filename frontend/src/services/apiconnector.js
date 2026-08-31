import axios from "axios"

export const axiosInstance = axios.create({});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Sirf tab redirect karo jab user PEHLE se logged in tha
            // (matlab token already localStorage mein tha) - iska matlab
            // session/token expire hua hai. Agar token hi nahi tha (jaise
            // login/signup attempt fail hua galat password ki wajah se),
            // to ye ek normal auth error hai, redirect nahi karna
            const existingToken = localStorage.getItem("token");
            if (existingToken) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log(url, "<=== url");
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}