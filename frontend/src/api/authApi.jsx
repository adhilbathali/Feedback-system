import axiosInstance from "./axiosInstance";

export const signup = async (payload) => {
    const res = await axiosInstance.post(`/signup`, payload);
    return res.data; 
};

export const loginUser = async (payload) => {
    const res = await axiosInstance.post(`/login`, payload);
    return res.data;
};
