# Internal Feedback System

> A responsive web application for to **give** and **acknowledge** feedbacks for managers and employees. Get insight trends and analysis through charts.

## 🚀 🌐 Live Demo
[Click here to view the live demo](https://internal-feedback-system.vercel.app)

## 📸 Screenshots

### SignUp and Login
![SignUp](/assets/signup.png)

### Manager Dashboard
![Manager Home Page](/assets/manager_dashboard.png)
![Manager Employee Page](/assets/feedbacks_manager.png)
![Manager Feedback Form](/assets/update_feedbacks.png)

### Employee Dashboard
![Employee Home Page](/assets/feedbacks_employee.png)

## 🧠 Features
- User authentication
- Role based authorization
    - Manager can give feedbacks to team employee
    - Employee can acknowledge feedbacks
- Feedbacks trend analysis using barchart

## 📦 Tech Stack
**Frontend:** React / Axios / Recharts / React-router

**Backend:** FastAPI / SqlAlchemy / Pydantic / Bcrypt

**Database:** PostgreSQL

## 🛠️ Installation
*You have 2 options to run this project:*

### 🐳 Option 1: Using Docker (Recommended)
**Prerequisites:**
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) (if seperate)

**Steps:**

```
# clone the repo

git clone https://github.com/adhilbathali/internal-feedback-system.git

# Build and start both frontend, backend & database

docker-compose up --build

```

That’s it! Visit http://localhost:3000


### 🔁 Option 2: Manual Setup (Without Docker)

**Prerequisites:**
- [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) ( for frontend )
- [Python 3.9+](https://www.python.org/) [& pip](https://pip.pypa.io/en/stable/installation/) ( for backend )
- [PostgreSQL](https://www.postgresql.org/) installed and running

**Steps:**

```
# clone the repo

git clone https://github.com/adhilbathali/Feedback-system.git
```
*Database:*
```
CREATE DATABASE your_database_name;
```

*Frontend:*

```
cd frontend
npm install
npm run dev
```

*Backend:*

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Click the link in the frontend terminal. Voila!

## 🔐 Environment Variables
- Rename the file `.env.example` to `.env` or
  
    ```
    cp backend/.env.example backend/.env
    ```
- Make sure you replace each `your-...` placeholder with actual values.

## ✅ Usage

- Register/Login
    - Manager
    - Employee
- Manger
    - Add Employee to the team
    - Give Feedback
- Employee
    - Acknowledge the feedback

## 🧑‍💻 Author

- LinkedIn: [Muhammed Adhil](https://linkedin.com/in/adhilbathali)
- GitHub: [adhilbathali](https://github.com/adhilbathali)






