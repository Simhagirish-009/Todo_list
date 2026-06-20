# Todo_list
This is a simple To-Do list application to track your progress in doing your Tasks
## Overview

A full-stack Product Inventory Management System developed using React.js, Django REST Framework, and PostgreSQL. The application allows users to manage products through Create, Read, Update, and Delete (CRUD) operations.

## Features

* Add new Tasks
* View Tasks
* Update Process types 
* Delete Tasks
* Analyze your progress through the charts
* Responsive user interface
* REST API integration
* PostgreSQL database support

## Tech Stack

### Frontend

* React.js
* Bootstrap React-Bootstrap 
* Axios

### Backend

* Django
* Django REST Framework

### Authentication
* simple_jwt
* django_restframework_simplejwt

### Database

* PostgreSQL

### Deployment

* Netlify (Frontend)
* Render (Backend & Database)

## Project Structure

frontend/
├── src/
├── public/
└── package.json

backend/
├── backend/
├── myapp/
├── manage.py
└── requirements.txt

## Installation

### Backend Setup

```bash
git clone <repository-url>
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

## Screenshots
<img width="1918" height="872" alt="Screenshot 2026-06-20 210357" src="https://github.com/user-attachments/assets/6134c85a-f617-4ea2-b9ea-e12f6292d40e" />
<img width="1896" height="907" alt="Screenshot 2026-06-20 210303" src="https://github.com/user-attachments/assets/a539c184-ac33-46c7-8edd-5bcc69193223" />
<img width="1902" height="915" alt="Screenshot 2026-06-20 210153" src="https://github.com/user-attachments/assets/683dea3b-8794-4d09-9692-2a4b4ef4f283" />
<img width="1918" height="912" alt="Screenshot 2026-06-20 182311" src="https://github.com/user-attachments/assets/c47f1e05-9f23-48bf-a98a-24b6eb0b4332" />
<img width="1902" height="908" alt="Screenshot 2026-06-20 210135" src="https://github.com/user-attachments/assets/83ad4a6a-a530-4f3f-8e29-4862c094a97e" />


## Live Demo

Frontend: [[Frontendd URL](https://melodic-fox-7a121d.netlify.app)]

Backend API: [[Backend URL](https://todo-list-pv3d.onrender.com)]

## Future Enhancements

* Remainders Through Emails
* User Management
* Email Authentication through OTP
* Plannig and organizing tasks by AI (openai)

## Author

Simha Girish Botta 
