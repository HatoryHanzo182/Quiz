import express from 'express'
import mongoose from 'mongoose'
import UserModel from './models/UserModel.js';
import QuizModel from './models/QuizModel.js';
import DataResultModel from './models/DataResultModel.js';

//                                          SERVER
//========================================================================================================================
// This code was created to set up and start the Express web server, handle HTTP requests, 
// and interact with the MongoDB database.
//
//                                                 Route Handlers.
//   ----------------------------------------------------------------------------------------------------------------------
//     * app.post('//quizes/:id', async (req, res) => { ... }): Route handler for get a quiz.
//     * app.post('/users', async (req, res) => { ... }): Route handler for adding a new user.
//     * app.post('/results', async (req, res) => { ... }): Route handler to add the result to the collection.
//     * app.get('/results', async (req, res) => { ... }): Route handler to get result data.
//     * app.put('/results/:id', async (req, res) => { ... }): Route handler to update the result data at the specified id.
//   ----------------------------------------------------------------------------------------------------------------------
// 
// Thus, this code file sets up the Express web server, defines routes for handling HTTP requests, 
// interacts with MongoDB using Mongoose, and handles errors when working with the database.
//
//=========================================================================================================================

const app = express()

app.use(express.json());
app.use((req, res, next) =>  // Middleware for handling CORS. 
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);  
  next();
});

const DB_URL = "mongodb+srv://scrinnpowerapp:s1o1yNojqIiHTyRg@quizcluster.plcezio.mongodb.net/QuizDB?retryWrites=true&w=majority";
const PORT =  3000

// QUIZ REQUESTS.
//=============================================================================================
        // To get a quiz under a specific id.
app.get('/quizes/:id', async (req, res) =>  
{
  try 
  {
    const { id } = req.params;
    const quiz = await QuizModel.findById(id);
    
    res.json(quiz);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//=============================================================================================

// REQUESTS FOR USERS.
//=============================================================================================
        // Getting user data when logging in.
app.get('/users', async (req, res) => 
{
  try 
  {
    const users = await UserModel.find();
    
    res.json(users);
  } catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

        // Request to add a new user on registration.
app.post('/users', async (req, res) => 
{
  try 
  {
    const newUser = req.body;
    const user = new UserModel(newUser);
    
    await user.save();
    
    res.status(201).json(user);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//=============================================================================================

// QUERY FOR RESULTS.
//=============================================================================================
        // Adding a quiz result to our result collection.
app.post('/results', async (req, res) => 
{
  try 
  {
    const newResult = req.body;
    const result = new DataResultModel(newResult);                                          
    
    await result.save();
    
    res.status(201).json(result);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

        // Getting results data.
app.get('/results', async (req, res) => 
{
  try 
  {
    const result = await DataResultModel.find();
    
    res.json(result);
  } catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

        // Get result data on id.
app.put('/results/:id', async (req, res) => 
{
  try 
  {
    const { id } = req.params;
    const { verified } = req.body;

    const existingResult = await DataResultModel.findByIdAndUpdate(id, { verified }, { new: true });

    if (!existingResult) { return res.status(404).json({ error: 'Result not found' }); }

    res.json(existingResult);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//=============================================================================================

const start = async () => 
{
  try 
  {
    await mongoose.connect(DB_URL);

    console.log(mongoose.connection.readyState);

    app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`)});
  } 
  catch (error) { console.log(error);}
}

start();