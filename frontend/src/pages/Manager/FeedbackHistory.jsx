import PieChart from "../../components/charts/PieChart";
import FeedbackListManager from "../../features/manager/FeedbackList.Manager";

export default function FeedbackHistory(){
    const feedbacks = JSON.parse(localStorage.getItem('managerTotalFeedbacks'));    
    return(
        <>
            <h1>History</h1>
            <PieChart feedbacks={feedbacks}/>
            <FeedbackListManager feedbacks={feedbacks}/>
        </>
    )
}