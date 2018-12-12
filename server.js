const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
// Need to use CORS to avoid AJAX requests from being
// blocked from front-end application
app.use(cors());

// API end point for the flickr application
const BASE_URL = 'https://hiring-task-api.herokuapp.com/v1/leases';

// Only route required pointing to API end point
app.get('/leases', (req, res) => {
  axios.get(`${BASE_URL}/${req.leaseId}`);
  .then(response => {
    res.setHeader('Content-Type', 'application/json');
    // Render the JSON
    res.json(response.data);
    // res.json(JSON.parse(response.data));
  })
  .catch(error => {
    console.log(error);
  });
});

// Listen on port 5000
app.listen(5000, () => {
  console.log('Dev app listening on port 5000!');
});
