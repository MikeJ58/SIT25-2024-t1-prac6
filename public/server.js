const express = require("express");
const path = require("path");
const cors = require("cors");
const CarController = require('./carController');
const app = express();
const port = process.env.PORT || 3000;

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize controller
const carController = new CarController();

// API endpoints
app.get('/api/cars', carController.getAllCars.bind(carController));
app.post('/api/cars', carController.addCar.bind(carController));

// Start the server
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
