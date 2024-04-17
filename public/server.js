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

async function runDBConnection() {
  try {
      await client.connect();
      collection = client.db('Test').collection('Cars');
      console.log("Database connected successfully");
  } catch (ex) {
      console.error("Error connecting to the database:", ex);
  }
}

// Route to get all cars
app.get('/api/cars', (req, res) => {
  // Implement logic to fetch all cars from the database
  // For now, let's send a dummy response
  const cars = [
      { make: 'Toyota', model: 'Camry', year: 2020 },
      { make: 'Honda', model: 'Accord', year: 2019 }
  ];
  res.json({ cars });
});

app.get('/api/cars', async (req, res) => {
  try {
      // Your code to fetch cars from the database
      // ...
      res.json({ statusCode: 200, data: cars, message: "Cars fetched successfully" });
  } catch (error) {
      console.error('Error fetching cars:', error);
      res.status(500).json({ statusCode: 500, message: "Internal Server Error", error: error.message });
  }
});

// Assume you have already established a connection to your MongoDB database and have access to a MongoDB collection

// Route handler for handling form submissions
app.post('/submit-form', async (req, res) => {
  try {
      // Extract form data from the request body
      const formData = {
          title: req.body.title,
          image: req.body.image,
          link: req.body.link,
          description: req.body.description
      };

      // Validate form data (optional)

      // Insert data into the database
      const result = await collection.insertOne(formData);

      // Respond with a success message
      res.status(201).json({ message: "Form submitted successfully", data: result.ops });
  } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
