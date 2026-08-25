import axios from "axios"

export const axiosInstance = axios.create({});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Token expire ho gaya ya invalid hai
            localStorage.removeItem("token");
            localStorage.removeItem("user"); // agar user data bhi localStorage mein rakhte ho

            // Redux state clear karne ke liye event dispatch kar sakte ho,
            // lekin sabse simple tarika: seedha login page pe redirect kar do
            window.location.href = "/login";
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