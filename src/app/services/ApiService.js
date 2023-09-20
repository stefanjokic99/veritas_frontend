import axiosInstance from "./AxiosInstance";

const get = (endpoint, query = "") => {
    return axiosInstance.get(`${endpoint}?${query}`);
}

const post = (endpoint, body, query = "", config = {}) => {
    return axiosInstance.post(`${query !== "" ? endpoint + "?" + query : endpoint}`, body, config);
}

const postAsync = async(endpoint, body, query = "", config = {}) => {
    return axiosInstance.post(`${query !== "" ? endpoint + "?" + query : endpoint}`, body, config);
}

const put = (endpoint, body, query = "") => {
    return axiosInstance.put(`${endpoint}?${query}`, body);
}

const remove = (endpoint, query = "") => {
    return axiosInstance.delete(`${endpoint}?${query}`);
}

export { get, post, put, remove, postAsync }