import axiosInstance from "./axiosInstance";

export const getFeedbacks = async ()=>{
    const res = await axiosInstance.get(`/manager/feedbacks`)
    localStorage.setItem('managerTotalFeedbacks', JSON.stringify(res.data))
    return res.data
}

export const getIndividualFeedbacks = async (employeeId) => {
    const res = await axiosInstance.get(`/manager/employees/${employeeId}/feedbacks`)
    return res.data
}

export const deleteFeedback = async (id) => {
    const res = await axiosInstance.delete(`/manager/feedbacks/${id}`)
    return  res.data
}

export const saveFeedback = (employeeId, data) => {
    return axiosInstance.post(`/manager/employees/${employeeId}/feedbacks`, data)
}

export const updateFeedback = (feedbackId, data) => {
    return axiosInstance.put(`/manager/feedbacks/${feedbackId}`, data)
}