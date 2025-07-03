import FeedbackCardEmployee from "./FeedbackCard.Employee";
import styles from "./FeedbackList.Employee.module.css";

export default function FeedbackListEmployee({ feedbacks, onAcknowledge }) {
    
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Feedbacks</h2>
            <div className={styles.list}>
                {feedbacks.map((feedback, index) => (
                    <FeedbackCardEmployee
                        key={index}
                        feedback={feedback}
                        onAcknowledge={onAcknowledge}
                    />
                ))}
            </div>
        </div>
    );
}

