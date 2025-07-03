import FeedbackCardManager from "./FeedbackCard.Manager"
import styles from "./FeedbackList.Manager.module.css"

export default function FeedbackListManager({ feedbacks, onDelete, onEdit }) {

    return (
        <div className={styles['background']}>
            {feedbacks.map(feedback => (
                <FeedbackCardManager
                    feedback={feedback}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    )

}