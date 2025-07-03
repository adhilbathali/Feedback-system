import React from "react";
import BarChart from "../../components/charts/BarChart";
import FeedbackListEmployee from "../../features/employees/FeedbackList.Employee";
import { useState, useEffect } from "react";
import { getFeedbacks, acknowledgeFeedback } from "../../api/employeeFeedbacks";

function Dashboard() {

    const [feedbacks, setFeedbacks] = useState([])

    const fetchFeedbacks = async () => {
        try{
            const data = await getFeedbacks();
            setFeedbacks(data)
        } catch (err) {
            console.error(err.response?.data?.message || 'Failed to load feedbacks');
        }
    }
    useEffect(() => {
        fetchFeedbacks();
    }, [])

    const handleAcknowledge = async (id) => {
        try{
            const res = await acknowledgeFeedback(id)
            fetchFeedbacks();
        } catch(error) {
            console.error('failed to load', error)
        }
    }


    return (
        <>
            <BarChart feedbacks={feedbacks}/>
            <FeedbackListEmployee feedbacks={feedbacks} onAcknowledge={handleAcknowledge}/>
        </>
    )
}

export default Dashboard