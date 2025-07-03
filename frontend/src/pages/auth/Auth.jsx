// src/pages/Auth.jsx
import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signup, loginUser } from '../../api/authApi';

export default function Auth(){
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('manager');

  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const payload = isLogin ? formData : { ...data, role };

      const response = isLogin
        ? await loginUser(payload)
        : await signup(payload);

      const { access_token, user } = response;

      loginWithToken(access_token, user); // Store in context
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login/Signup failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.card}>
        {/* Tab Switcher */}
        <div className={styles.tabSwitcher}>
          <button
            onClick={() => setIsLogin(true)}
            className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
            aria-selected={isLogin}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
            aria-selected={!isLogin}
          >
            Signup
          </button>
          <div className={`${styles.activeTabUnderline} ${!isLogin ? styles.signupActive : ''}`} />
        </div>

        {/* Forms */}
        <div className={styles.formSlider}>
          <div className={`${styles.formWrapper} ${!isLogin ? styles.showSignup : ''}`}>

            {/* Login Form */}
            <form className={styles.form} onSubmit={handleSubmit} aria-hidden={!isLogin}>
              <input className={styles.input} type="email" name="username" placeholder="Email" required />
              <input className={styles.input} type="password" name="password" placeholder="Password" required />
              <button type="submit" className={styles.primaryButton}>Login</button>
            </form>

            {/* Signup Form */}
            <form className={styles.form} onSubmit={handleSubmit} aria-hidden={isLogin}>
              <div className={styles.roleSelector}>
                <button
                  type="button"
                  onClick={() => setRole('manager')}
                  className={`${styles.roleOption} ${role === 'manager' ? styles.activeRole : ''}`}
                >
                  Manager
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`${styles.roleOption} ${role === 'employee' ? styles.activeRole : ''}`}
                >
                  Employee
                </button>
              </div>
              <input className={styles.input} type="text" name="name" placeholder="Name" required />
              <input className={styles.input} type="email" name="email" placeholder="Email" required />
              <input className={styles.input} type="password" name="password" placeholder="Password" required />
              <button type="submit" className={styles.primaryButton}>Signup</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};