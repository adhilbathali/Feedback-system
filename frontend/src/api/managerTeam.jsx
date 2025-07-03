import axiosInstance from "./axiosInstance";

const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getEmployees = async () => {
  const res = await axiosInstance.get(`/manager/team`);
  return res.data;
};

export const addEmployee = async (email) => {
  const res = await axiosInstance.patch(`/manager/team`, { "email": email }, jsonHeaders);
  return res.data;
};


export const removeEmployee = async (employeeId) => {
  const res = await axiosInstance.patch(`/manager/team/${employeeId}`)
  return res.data
};