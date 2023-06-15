# Quiz Backend API
This application is a back-end that provides an API for managing quizzes, users, and quiz results. It is developed using Node.js and Express, with data stored in a MongoDB database.

## Authors
Authors:
- [Hanzo](https://github.com/HatoryHanzo182)
- [1lexaa](https://github.com/1lexaa)

### Requests for quizzes
- **GET `/quizes/:id`**: Get the quiz by the given id.

### Requests for users
- **GET `/users`**: Get user details on login.
- **POST `/users`**: Add a new user on registration.

### Queries for results
- **POST `/results`**: Add the quiz result to the results collection.
- **GET `/results`**: Get results data.
- **PUT `/results/:id`**: Update the confirmation status of a result by its id.

## CORS settings
This app is also configured to handle requests from other origins (Cross-Origin Resource Sharing - CORS). The CORS headers are configured as follows:
- `Access-Control-Allow-Origin`: http://localhost:3001
- `Access-Control-Allow-Methods`: GET, POST, OPTIONS, PUT, DELETE
- `Access-Control-Allow-Headers`: Content-Type, Authorization
- `Access-Control-Allow-Credentials`: true