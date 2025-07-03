// ListEmployeeCard.jsx
import styles from './EmployeeCard.Manager.module.css';
import {  FiTrash2 } from 'react-icons/fi';


export default function EmployeeCardManager({ id, name, feedback_count, onClick, onDelete }) {
  const initial = name?.[0]?.toUpperCase() || '?';
  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id)

  }

  
  return (
    <div className={styles.card} onClick={() => onClick(id, name)}>
      <div className={styles.cardInfo}>
        <div className={styles.avatar}>{initial}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.count}>Feedbacks: {feedback_count}</p>
        </div>
      </div>
      <button className={styles.iconButton} title="Delete Feedback" onClick={(e) => handleDelete(e, id)}>
            <FiTrash2 />
        </button>
    </div>
  );
}
