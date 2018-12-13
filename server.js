const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
// Need to use CORS to avoid AJAX requests from being
// blocked from front-end application
app.use(cors());

// API end point for the flickr application
const BASE_URL = 'https://hiring-task-api.herokuapp.com/v1/leases';

//// DEFAULT ROUTES FROM PROVIDED API /////

// Route required for individual leases by id
app.get('/leases/:id', (req, res) => {
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
  axios.get(BASE_URL)
  .then(response => {
    // Render the JSON
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
});

//// CUSTOM ROUTES (Bonus task 2) /////

// Custom route required for individual leases by id
app.get('/custom/leases/:id', (req, res) => {
  // Data to choose randomly from to return data
  const dataPicker = {
    firstSixMonths: ['01', '02', '03', '04', '05', '06'],
    lastSixMonths: ['07', '08', '09', '10', '11', '12'],
    days: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '22', '22', '23', '24', '25', '26', '27', '28'],
    year: '2018',
    frequencies: ['weekly', 'fortnightly', 'monthly'],
    paymentDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getData = () => {
    return {
      id: req.params.id,
      start_date: `${dataPicker.year}-${dataPicker.firstSixMonths[getRandom(0, dataPicker.firstSixMonths.length - 1)]}-${dataPicker.days[getRandom(0, dataPicker.days.length - 1)]}`,
      end_date: `${dataPicker.year}-${dataPicker.lastSixMonths[getRandom(0, dataPicker.lastSixMonths.length - 1)]}-${dataPicker.days[getRandom(0, dataPicker.days.length - 1)]}`,
      rent: getRandom(400, 2000),
      frequency: dataPicker.frequencies[getRandom(0, dataPicker.frequencies.length - 1)],
      payment_day: dataPicker.paymentDays[getRandom(0, dataPicker.paymentDays.length - 1)]
    }
  };

  res.send(
    getData()
  );

});

// Custom route required for all leases
app.get('/custom/leases', (req, res) => {
  res.send([
    {
      id: "lease-a",
      tenant: "Alex"
    },
    {
      id: "lease-b",
      tenant: "Jen"
    },
    {
      id: "lease-c",
      tenant: "Frankie"
    }
  ]);
});

// Listen on port 5000
app.listen(5000, () => {
  console.log('Dev app listening on port 5000!');
});
