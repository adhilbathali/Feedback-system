import BarChart from "../../components/charts/BarChart";
import FeedbackListManager from "../../features/manager/FeedbackList.Manager";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIndividualFeedbacks, updateFeedback } from "../../api/managerFeedbacks";
import FeedbackForm from "../../components/forms/FeedbackForm";
import styles from "./FeedbacksIndividual.module.css"
import { deleteFeedback, saveFeedback } from "../../api/managerFeedbacks";


export default function FeedbacksIndividual() {
    const [isEditing, setIsEditing] = useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    
    const { employeeId } = useParams();
    const [showForm, setShowForm] = useState(false)

    const fetchData = async () => {
      try{
        const data = await getIndividualFeedbacks(employeeId);
        setFeedbacks(data)
      }catch (err) {
        console.error(err)            
      }
    }

    useEffect(() => {
        fetchData();
    }, [employeeId])

    const handleDelete = async (feedbackId) => {
        try {
            const response = await deleteFeedback(feedbackId);
            fetchData();
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
        setShowForm(true)
    }

    const handleGiveFeedback = () => {
        setIsEditing(false)
        setShowForm(true)
    }

    const handleSubmit =
        async (data) => {
            try {
                if (isEditing){
                    const feedbackId = JSON.parse(localStorage.getItem('editingFeedback')).id
                    await updateFeedback(feedbackId, data)
                } else {
                    await saveFeedback(employeeId, data)
                }
                setShowForm(false);
                fetchData();
            }catch(error){
                console.error("failed to throw", error)
            }
        }

        const currentEmployeeName = localStorage.getItem("currentEmployeeName").toUpperCase()


    return (
        <>
            <BarChart feedbacks={feedbacks} />
            <h1 className={styles.name}>{ currentEmployeeName }</h1>
            <FeedbackListManager feedbacks={feedbacks} onDelete={handleDelete} onEdit={handleEdit}/>
            <button className={styles.giveFeedbackButton} onClick={handleGiveFeedback}>+ Feedback</button>
            {showForm && (
                <FeedbackForm isEditing={isEditing} onSubmit={handleSubmit} onClose={() => setShowForm(false)} />
            )}
        </>
    )
}