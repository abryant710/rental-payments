const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
// Need to use CORS to avoid AJAX requests from being
// blocked from front-end application
app.use(cors());

// API end point for the flickr application
const BASE_URL = 'https://hiring-task-api.herokuapp.com/v1/leases';

// Route required for individual leases by id
app.get('/leases/:id', (req, res) => {
  //console.log("PARAMS:", req.params);
  axios.get(`${BASE_URL}/${req.params.id}`)
  .then(response => {
    // Render the JSON
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

// Route required for all leases
app.get('/leases', (req, res) => {
  //console.log("PARAMS:", req.params);
  axios.get(BASE_URL)
  .then(response => {
    // Render the JSON
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

// Listen on port 5000
app.listen(5000, () => {
  console.log('Dev app listening on port 5000!');
});
