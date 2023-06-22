# Quiz

Quiz is a full-stack web application that allows users to create and participate in quizzes. It provides a platform for teachers to generate unique codes for their students, who can then submit their quiz results using those codes. The application is built using React.js for the frontend and Node.js, Express, and MongoDB for the backend.

## Features

- User Registration and Login: Users can create an account and log in to access the application.
- Teacher Code Generation: Teachers are assigned a unique teacher code that can be shared with their students. Students can use this code to submit their quiz results.
- Quiz Creation: Users can create quizzes on various topics and customize the questions and options.
- Quiz Participation: Students can participate in quizzes by selecting the desired quiz and answering the questions.
- Result Submission: After completing a quiz, students can submit their results using the teacher code.
- Dashboard and Statistics: Teachers can view the quiz results and statistics of their students through a dashboard.
- Profile Management: Users can update their profile information and manage their account settings.

## Technologies Used

The Quiz application utilizes the following technologies:

### Frontend

- React: JavaScript library for building user interfaces.
- React Router: Library for handling routing in a React application.
- Axios: JavaScript library for making HTTP requests to the backend API.
- Styled Components: Library for styling React components using CSS-in-JS.

### Backend

- Node.js: JavaScript runtime environment for executing server-side code.
- Express: Web application framework for building RESTful APIs.
- MongoDB: NoSQL database for storing quiz data and user information.
- Mongoose: Object Data Modeling (ODM) library for MongoDB, providing a straightforward schema-based solution.

## Installation and Setup

To set up the Quiz application locally, follow these steps:

### Prerequisites

- Node.js and npm should be installed on your machine.
- MongoDB should be installed and running.

### Backend Setup

1. Clone the repository: `git clone https://github.com/HatoryHanzo182/Quiz.git`
2. Navigate to the backend directory: `cd Quiz/backend`
3. Install the dependencies: `npm install`
4. Rename the `.env.example` file to `.env` and configure the environment variables, including the MongoDB connection string and any other required variables.
5. Start the backend server: `npm start`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory: `cd Quiz/frontend`
2. Install the dependencies: `npm install`
3. Start the frontend development server: `npm start`

### Accessing the Application

Once the backend and frontend servers are running, you can access the Quiz application by visiting `http://localhost:3000` in your web browser.

## Authors
Authors:
- [Hanzo](https://github.com/HatoryHanzo182)
- [1lexaa](https://github.com/1lexaa)