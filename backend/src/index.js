const express = require('express');
const path = require('path');
const MyUser = require("./config");
const cors = require('cors');

const app = express();

//Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

//convert data into jason formate
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Save the data in database  to '/myuser' endpoint
app.post('/myuser', async (req, res) => {
 
    try {
     
        const userData = req.body;
        const newUser = new MyUser(userData);
        await newUser.save();
      res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.log(req.body);
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
  });

//fetch all store locations and device details in database
app.get('/storeData', async (req, res) => {
    try {
 
      const storeData = await MyUser.find(); // MyUser is  Mongoose model
      res.json(storeData);
      console.log(storeData);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // GET endpoint to fetch user data by ID
app.get('/updateuser/:id', async (req, res) => {
  try {
    const user = await MyUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = 5001;

// Start the server and listen on the specified port
app.listen(port,()=>{

    console.log('server running on port: ${port} ');

})