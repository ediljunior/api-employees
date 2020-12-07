const express = require("express");
const cors = require('cors');
const app = express();

const routes = require("./src/routes/employee.routes.js");

// Settinngs
app.set('port', process.env.PORT || 3000);

// Middelewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/employees', routes);

// Staring the server
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}.`);
});

module.exports = app;