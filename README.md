#  School Management API

## Project Overview

This project is a Node.js-based REST API built using Express.js and MySQL. It allows users to:

* Add new schools
* Retrieve schools sorted by proximity to a given location

---

##  Tech Stack

* Node.js
* Express.js
* MySQL
* dotenv
* mysql2

---

## Project Structure

```
school-api/
│
├── config/
│   └── db.js
├── controllers/
│   └── schoolController.js
├── routes/
│   └── schoolRoutes.js
├── .env
├── app.js
└── package.json
```

---

## Setup Instructions

### Clone Repository

```
git clone <your-repo-link>
cd school-api
```

### Install Dependencies

```
npm install
```

### Configure Environment Variables

Create a `.env` file in root:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
PORT=3000
```

### Setup Database

Run the following SQL in MySQL:

```
CREATE DATABASE school_db;
USE school_db;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

##  Run the Application

```
npm start
```

Server runs on:

```
http://localhost:3000
```

---

##  API Endpoints

### 1. Add School

* **URL:** `/addSchool`
* **Method:** `POST`

#### Request Body:

```json
{
  "name": "ABC School",
  "address": "Chennai",
  "latitude": 13.0827,
  "longitude": 80.2707
}
```

#### Response:

```json
{
  "message": "School added successfully",
  "id": 1
}
```

---

### 2. List Schools

* **URL:** `/listSchools`
* **Method:** `GET`

#### Query Params:

```
latitude=13.08
longitude=80.27
```

#### Example:

```
http://localhost:3000/listSchools?latitude=13.08&longitude=80.27
```

#### Response:

```json
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "Chennai",
    "latitude": 13.0827,
    "longitude": 80.2707,
    "distance": 2.1
  }
]
```

---

##  Distance Calculation

The API uses the **Haversine Formula** to calculate distance between two geographical points.

---

##  Deployment

The API can be deployed using platforms like Render.

Example:

```
https://your-app.onrender.com
```

---

##  Postman Collection

Include your Postman collection link here:

```
<your-postman-link>
```

---

##  Author

* Raguram J

---

##  Features

* Input validation
* Distance-based sorting
* RESTful API design
* Environment-based configuration

---

##  Notes

* Ensure MySQL is running before starting the server
* Use valid latitude and longitude values
* Do not commit `.env` file to GitHub

---
