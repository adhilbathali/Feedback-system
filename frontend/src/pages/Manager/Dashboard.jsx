import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BarChart from "../../components/charts/BarChart";
import EmployeeListManager from "../../features/manager/EmployeeList.Manager";
import styles from "./FeedbacksIndividual.module.css"

import { getFeedbacks } from "../../api/managerFeedbacks";
import { getEmployees, removeEmployee } from "../../api/managerTeam";

export default function Dashboard() {

    const [feedbacks, setFeedbacks] = useState([])
    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()
    
    const loadFeedbacks = async () => {
        try {
            const data = await getFeedbacks();
            setFeedbacks(data);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to load feedbacks');            
        }
    }

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        }catch (err) {
            alert(err.response?.data?.message || 'Failed to load employees');
        }
    }

    useEffect(() => {
        loadFeedbacks();
        loadEmployees();
    }, [])

    const handleHistoryClick = () => {
        navigate('/manager/history')
    }

    const handleEmployeeDelete = async (employeeId) => {
        try {
            await removeEmployee(employeeId)
            loadEmployees();
            loadFeedbacks();
        } catch (error) {
            console.error(error)
        }
    }

    const handleEmployeeClick = async (employeeId, name) => {
        localStorage.setItem('currentEmployeeName', name)
        navigate(`/manager/employee/${employeeId}/feedbacks`)
    };


    return (
        <>
            <BarChart feedbacks={feedbacks}/>
            <EmployeeListManager onEmployeeDelete={handleEmployeeDelete} employees={employees} loadEmployees={loadEmployees} onEmployeeClick={handleEmployeeClick} />
            <button onClick={handleHistoryClick} className={styles['historyButton']} >Feedback History</button>
        </>
    )
}