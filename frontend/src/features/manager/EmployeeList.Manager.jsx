import AddEmployeeForm from "../../components/forms/AddEmployeeForm";
import EmployeeCardManager from "./EmployeeCard.Manager";
import styles from "./EmployeeList.Manager.module.css";

export default function EmployeeListManager({ employees, onEmployeeDelete, onEmployeeClick, loadEmployees }) {

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Employees</h1>
            <AddEmployeeForm onSubmitSuccess={loadEmployees}/>
            <div className={styles.list}>
                {employees.map((emp, index) => (
                    <EmployeeCardManager
                        key={index}
                        id={emp.id}
                        name={emp.name}
                        feedback_count={emp.feedback_count}
                        onClick={onEmployeeClick}
                        onDelete={onEmployeeDelete}
                    />
                ))}
            </div>
        </div>
    );
}