import axios from "axios";

const API_BASE = 'http://127.0.0.1:8000';

export const getFeedbacks = async ()=>{
    const res = await axios.get(`${API_BASE}/manager/feedbacks`)
    localStorage.setItem('managerTotalFeedbacks', JSON.stringify(res.data))
    return res.data
}

export const getIndividualFeedbacks = async (employeeId) => {
    const res = await axios.get(`${API_BASE}/manager/employees/${employeeId}/feedbacks`)
    return res.data
}

export const deleteFeedback = async (id) => {
    const res = await axios.delete(`${API_BASE}/manager/feedbacks/${id}`)
    return  res.data
}

export const saveFeedback = (employeeId, data) => {
    return axios.post(`${API_BASE}/manager/employees/${employeeId}/feedbacks`, data)
}

export const updateFeedback = (feedbackId, data) => {
    return axios.put(`${API_BASE}/manager/feedbacks/${feedbackId}`, data)
}