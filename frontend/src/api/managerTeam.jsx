import axios from "axios";

const API_BASE = 'http://127.0.0.1:8000';

const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getEmployees = async () => {
  const res = await axios.get(`${API_BASE}/manager/team`);
  return res.data;
};

export const addEmployee = async (email) => {
  const res = await axios.patch(`${API_BASE}/manager/team`, { "email": email }, jsonHeaders);
  return res.data;
};


export const removeEmployee = async (employeeId) => {
  const res = await axios.patch(`${API_BASE}/manager/team/${employeeId}`)
  return res.data
};