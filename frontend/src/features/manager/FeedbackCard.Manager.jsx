import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import styles from './FeedbackCard.Manager.module.css';

// Helper object for sentiment styles remains the same
const sentimentInfo = {
  positive: { emoji: '✅', className: styles.positive },
  neutral: { emoji: '🟡', className: styles.neutral },
  negative: { emoji: '❌', className: styles.negative },
};

export default function FeedbackCardManager({
  feedback,
  onEdit,
  onDelete,
}){
  const {id, sentiment, description, strengths, to_improve, created_at, acknowledged, acknowledged_at } = feedback
  const currentSentiment = sentimentInfo[sentiment] || sentimentInfo.neutral;
  const handleEdit = () => {
    localStorage.setItem('editingFeedback', JSON.stringify(feedback))
    onEdit()
  }


  return (
    <div className={styles.card} >
      <header className={styles.cardHeader}>
        <div className={`${styles.sentimentBadge} ${currentSentiment.className}`}>
          {currentSentiment.emoji} {sentiment}
        </div>
        <div className={styles.managerActions}>
          { onEdit && <button className={styles.iconButton} onClick={handleEdit} title="Edit Feedback">
            <FiEdit />
          </button>}
          { onDelete && <button className={styles.iconButton} onClick={() => onDelete(id)} title="Delete Feedback">
            <FiTrash2 />
          </button>}
        </div>
      </header>

      <p className={styles.description}>{description}</p>

      {strengths.length > 0 && (
        <div className={styles.tagsSection}>
          <span className={styles.tagsLabel}>💪 Strengths</span>
          <div className={styles.tagsContainer}>
            {strengths.map((tag) => (
              <span key={tag} className={`${styles.tag} ${styles.strengthTag}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {to_improve.length > 0 && (
        <div className={styles.tagsSection}>
          <span className={styles.tagsLabel}>📈 To Improve</span>
          <div className={styles.tagsContainer}>
            {to_improve.map((tag) => (
              <span key={tag} className={`${styles.tag} ${styles.improvementTag}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <footer className={styles.cardFooter}>
        <span className={styles.timestamp}>Given on {new Date(created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata"
            })}</span>
        {acknowledged && <span className={styles.timestamp}>✅ {new Date(acknowledged_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata"
            })}</span>}
      </footer>
    </div>
  );
};

