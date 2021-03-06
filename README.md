# Rental Payments App

### Overview

This application is built using the supplied API endpoints:

* https://hiring-task-api.herokuapp.com/v1/leases
* https://hiring-task-api.herokuapp.com/v1/leases/:id

It was built using Node as a server and React for the user interface.

Custom replicas of these API endpoints have also been created within the Node JS server:

* https://localhost:5000/custom/leases
* https://localhost:5000/custom/leases/:id

All API calls are filtered through the Node Server to avoid CORS problems.

### App User Journey

From the root location the user is presented with 2 options:

* Search for a lease by ID

On this page the user should enter the lease ID they are looking for and should click 'Find'. The relevant information about that rental agreement will be displayed in two tables. The top table gives a summary of the rental agreement and the bottom table gives a breakdown of the rental payments due by time period.

* List lease IDs by tenant

On this page a list is returned matching lease IDs with tenant name. These links are clickable and will take the user to the rental information page as explained above under 'Search for a lease by ID'.

* Bonus task 2 options

The user can also selected to use the locally implemented version of the API, or the standard live one using the radio button options.

### Starting Node Server

From the root folder run:

`npm install`

Then:

`node server.js`

### Starting React Frontend

Change directory to the client folder and run

`npm install`

Then:

`npm start`

Open the application in the Browser using:

`http://localhost:3000/`

### Run Unit Tests

Change directory to the client folder and run

`npm test`
