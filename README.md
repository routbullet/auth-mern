# Auth-MERN

## Overview

`auth-mern` is a full-stack application built using the MERN stack (MongoDB, Express, React, Node.js) to demonstrate user authentication and authorization. The project is structured with separate folders for the backend and frontend, facilitating a clean separation of concerns and a streamlined development process.

## Project Structure

- **Backend**: Contains the Express.js server with RESTful endpoints for user registration, login, and data retrieval. It uses MongoDB for data storage and JWT for secure authentication.
- **Frontend**: Built with React and TypeScript using Vite as the build tool. It provides a user interface for registration, login, and viewing user data, with JWT tokens stored in cookies for session management.

## Backend

### Features

- **User Registration** (`POST /registration`): Allows new users to register with a username, password, full name, and email.
- **User Login** (`POST /login`): Authenticates users and returns a JWT token upon successful login.
- **Protected Route** (`GET /user`): Retrieves user-specific data, accessible only with a valid JWT token.

### Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `jsonwebtoken`: Library for JWT creation and verification
- `cors`: Middleware to enable Cross-Origin Resource Sharing
- `dotenv`: Loads environment variables from a `.env` file
- `nodemon`: Development utility for auto-reloading server code

### Scripts

- `start`: Runs the server with nodemon for development

### Running the Backend

1. Install dependencies: `npm install`
2. Start the server: `npm start`

## Frontend

### Features

- **Registration View**: Form for user registration.
- **Login View**: Form for user login, storing JWT tokens in cookies.
- **Users View**: Displays user data fetched from the backend.

### Dependencies

- `react`: JavaScript library for building user interfaces
- `react-dom`: DOM rendering for React
- `react-router-dom`: Routing library for React
- `styled-components`: Library for styling React components
- `js-cookie`: Utility for handling cookies

### Dev Dependencies

- `vite`: Build tool for modern web projects
- `typescript`: Superset of JavaScript with static typing
- `eslint`: Linter for identifying and fixing problems in code

### Scripts

- `dev`: Starts the development server with Vite
- `build`: Builds the project for production
- `lint`: Runs ESLint to check for code quality issues
- `preview`: Previews the built project locally

### Running the Frontend

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`

## Environment Variables

Make sure to create a `.env` file in the backend directory with the following environment variable:

- `SECRETE_ACCESS_TOKEN`: Secret key used for signing JWT tokens

## Contributing

Feel free to contribute to this project by submitting pull requests or reporting issues. Please ensure that your contributions align with the project's goals and adhere to the code style guidelines.
