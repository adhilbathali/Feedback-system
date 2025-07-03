import { useState, useEffect } from "react";
import styles from "./AddEmployeeForm.module.css";
import { addEmployee } from "../../api/managerTeam";

export default function AddEmployeeForm({ onSubmitSuccess }) {
    const [email, setEmail] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await addEmployee(email);
            setEmail('')
            if(onSubmitSuccess){
                onSubmitSuccess()
            }
        } catch (error) {
            console.error("Failed to add employee:", error);
            alert("Employee doesn't exists");
            setEmail('')
        }

    };

    



    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter employee email"
                required
            />
            <button type="submit" className={styles.button}>Add</button>
        </form>
    );
}
