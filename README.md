# Todo MERN Application with Docker Compose

## Overview
This project is a simple Todo application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a full-stack solution for managing todo items, with Docker integration for easy deployment and scaling. The backend connects to an online MongoDB instance, and the frontend is a React-based application running inside a Docker container.

## Features
- **Frontend**: A React application that allows users to create, update, delete, and view todo items.
- **Backend**: A Node.js and Express.js API that handles CRUD operations for todos, connected to a MongoDB database.
- **Docker Compose**: The application is containerized using Docker, with separate containers for the frontend, backend, and MongoDB.
- **Environment Support**: The backend can connect to either a local MongoDB instance or an online MongoDB instance, depending on the environment configuration.

## Technologies Used
- **MongoDB** (Online or Local)
- **Node.js**
- **Express.js**
- **React**
- **Docker** (Docker Compose for orchestration)
- **GitHub Actions** (Optional for CI/CD)

## Prerequisites
- Docker and Docker Compose installed on your system.
- Git (for version control).
- A GitHub repository (for version control and hosting).

## Setup Instructions

### Step 1: Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Step 2: Setup Environment Variables
Create a `.env` file in the backend folder. If you are using an online MongoDB database, you need to set the following variables in the `.env` file:

```ini
MONGO_URI=mongodb://your-username:your-password@your-mongo-db-url:port/database-name
PORT=5000
```

If you're using a local MongoDB instance, make sure to use the corresponding URL:

```ini
MONGO_URI=mongodb://root:example@todo-mongo:27017
PORT=5000
```

### Step 3: Run the Application Using Docker Compose
Build and start the containers by running the following command:

```bash
docker compose up -d
```

This will:
- Start the backend API container.
- Start the frontend React application container.
- Use the appropriate MongoDB instance (local or online) based on the `.env` configuration.

### Step 4: Verify the Application
- Frontend (React app) will be running on http://localhost:3000.
- Backend (API) will be running on http://localhost:5000.
- The MongoDB service will be running inside the container, or it will connect to the online MongoDB based on the `.env` file.

### Step 5: Stopping the Application
To stop the application and remove the containers, run:

```bash
docker compose down
```

## Project Structure
- `frontend/`: Contains the React-based frontend application.
- `backend/`: Contains the Node.js and Express.js backend API.
- `docker-compose.yml`: The Docker Compose configuration file that defines the services for the frontend, backend, and MongoDB.
- `.env`: Contains environment variables for configuring MongoDB connections.
- `README.md`: Project documentation (this file).

## Docker Configuration
- **Frontend**: The React app is containerized and exposed on port 3000.
- **Backend**: The Node.js Express app is containerized and exposed on port 5000. It connects to a MongoDB instance (either local or online) via the MONGO_URI environment variable.
- **MongoDB**: MongoDB is set up as a Docker container, with data persistence configured via Docker volumes.

## Troubleshooting
- **Authentication Error with MongoDB**: Make sure the MongoDB URI is correct in your `.env` file, and check the username/password if using an online MongoDB service.
- **Docker Compose Version Issues**: Ensure you are using Docker Compose version 3.8 or later.

## License
This project is licensed under the MIT License.

## Acknowledgements
- **MERN Stack**: For providing the base technologies used in this application.
- **Docker**: For containerizing the application and simplifying deployment.
