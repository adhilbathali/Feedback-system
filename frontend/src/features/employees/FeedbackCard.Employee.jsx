import React from 'react';
import styles from './FeedbackCard.Employee.module.css';

// A helper object to manage sentiment styles and content
const sentimentInfo = {
  positive: { emoji: '✅', className: styles.positive },
  neutral: { emoji: '🟡', className: styles.neutral },
  negative: { emoji: '❌', className: styles.negative },
};

export default function FeedbackCardEmployee ({
  feedback,
  onAcknowledge,
}){
  const { id, sentiment, description, strengths, to_improve, created_at, acknowledged_at, acknowledged} = feedback
  const currentSentiment = sentimentInfo[sentiment] || sentimentInfo.neutral;

  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        <div className={`${styles.sentimentBadge} ${currentSentiment.className}`}>
          {currentSentiment.emoji} {sentiment}
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
        {acknowledged ? (
          <p className={styles.acknowledgedText}>
            ✅ {new Date(acknowledged_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata"
            })}
          </p>
        ) : (
          <button className={styles.acknowledgeButton} onClick={() => onAcknowledge(id)}>
            Acknowledge Feedback
          </button>
        )}
      </footer>
    </div>
  );
};

