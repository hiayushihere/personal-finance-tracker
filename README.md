# Personal Finance Tracker

A full-stack web application built as part of a Frontend Developer Intern assignment.  
The application allows users to manage personal income and expenses using a secure authentication system and a responsive dashboard.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users

### Dashboard
- View total income, total expenses, and current balance
- Add new transactions
- Edit existing transactions
- Delete transactions
- Search transactions by title or category
- Filter transactions by type (income or expense)

### User Interface
- Responsive layout for mobile, tablet, and desktop
- Loading skeletons while fetching data
- Empty state when no transactions are available
- Subtle hover and focus interactions

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication

---

---

## Setup and Installation

---

## Clone the Repository

`git clone https://github.com/hiayushihere/personal-finance-tracker.git` 

`cd personal-finance-tracker`


---

## Backend Setup

### Prerequisites
- Python 3.9 or higher
- pip

### Create and Activate Virtual Environment

`cd backend`

`python3 -m venv venv`

`source venv/bin/activate`


### Install Backend Dependencies

All backend dependencies are listed in `requirements.txt`.

`pip install -r requirements.txt`

### Run Backend Server

`uvicorn app.main:app --reload`

Backend will run at:

http://127.0.0.1:8000 

API documentation is available at:

http://127.0.0.1:8000/docs


---

## Frontend Setup

### Prerequisites
- Node.js 18 or higher
- npm

### Install Frontend Dependencies

All frontend dependencies are listed in `package.json`.

`cd../frontend`

`npm install`


### Run Frontend Development Server

`npm run dev`

Frontend will run at:

http://localhost:5173

---

## Notes

- SQLite is used as the database for simplicity and does not require separate setup.
- Backend dependencies are managed using `pip` and `requirements.txt`.
- Frontend dependencies are managed using `npm` and `package.json`.
- JWT tokens are used for authenticated API requests.
- CORS is enabled for local development.

# DEMO SCREENSHOTS - 
<img width="1465" height="822" alt="Screenshot 2026-02-04 at 10 57 11 PM" src="https://github.com/user-attachments/assets/2a2a3a89-5f0d-41b1-93fe-04ed6eec5941" />





<img width="1470" height="830" alt="Screenshot 2026-02-04 at 11 00 36 PM" src="https://github.com/user-attachments/assets/b9109934-561e-4a22-9e7e-3eda7b59f97d" />


<img width="1469" height="832" alt="Screenshot 2026-02-04 at 11 00 10 PM" src="https://github.com/user-attachments/assets/76f6d41f-4b54-44fc-b30d-f62c752a502f" />




