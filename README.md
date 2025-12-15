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
<img width="1408" height="792" alt="Screenshot 2025-12-15 at 4 21 01 PM" src="https://github.com/user-attachments/assets/0f0d5f78-68b9-4f63-b4d9-628d4948fd28" />





<img width="1399" height="779" alt="Screenshot 2025-12-15 at 4 22 07 PM" src="https://github.com/user-attachments/assets/b365fe72-b552-49af-b1b1-e1ffdba3ec83" />




