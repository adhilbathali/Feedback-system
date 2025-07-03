// ListEmployeeCard.jsx
import styles from './EmployeeCard.Manager.module.css'; // Make sure this path is correct
import { FiTrash2 } from 'react-icons/fi';

export default function EmployeeCardManager({ id, name, feedback_count, onClick, onDelete }) {
  const initial = name?.[0]?.toUpperCase() || '?';

  // This stopPropagation is crucial to prevent the card's onClick from firing
  // when the delete button is clicked.
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  }

  return (
    // The main card is the primary flex container
    <div className={styles.card} onClick={() => onClick(id, name)}>
      
      {/* This new .employeeDetails div groups the avatar and info together.
          It's a flex item that will sit on the left. */}
      <div className={styles.employeeDetails}>
        
        {/* The avatar div */}
        <div className={styles.avatar}>{initial}</div>
        
        {/* The info div, which groups the name and count */}
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.count}>Feedbacks: {feedback_count}</p>
        </div>

      </div>

      {/* The button is a separate flex item that will be pushed to the right. */}
      <button 
        className={styles.iconButton} 
        title="Delete Employee" // A more descriptive title
        onClick={handleDelete}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}