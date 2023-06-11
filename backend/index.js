import express from 'express'
import mongoose from 'mongoose'
import UserModel from './models/UserModel.js';
import QuizModel from './models/QuizModel.js';
import DataResultModel from './models/DataResultModel.js';

const app = express()

app.use(express.json())
app.use((req, res, next) =>  // Middleware for handling CORS. 
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);  
  next();
});
app.use((req, res, next) => 
{
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  next();
});

const DB_URL = "mongodb+srv://admin:5PPrcFfQcS3sHIBo@db.xl5bjqi.mongodb.net/QuizData?retryWrites=true&w=majority";
const PORT =  3000 // process.env.PORT 

// QUIZ REQUESTS.
//=============================================================================================
        // To get a quiz under a specific id.
app.get('/quizzes/:id', async (req, res) =>  
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

start()