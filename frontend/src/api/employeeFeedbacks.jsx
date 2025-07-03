import axiosInstance from "./axiosInstance"

export const getFeedbacks = async () => {
    const res = await axiosInstance.get(`/employee/feedbacks`)
    return res.data
}

export const acknowledgeFeedback = async (feedbackId) => {
    const res = await axiosInstance.patch(`/employee/feedbacks/${feedbackId}/acknowledge`)
    return res.data
}
