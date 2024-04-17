const CarModel = require('./carModel');

class CarController {
    constructor() {
        this.carModel = new CarModel();
    }

    async getAllCars(req, res) {
        try {
            const cars = await this.carModel.getAllCars();
            res.status(200).json({ statusCode: 200, message: "Success", data: cars });
        } catch (err) {
            console.error('Error fetching cars:', err);
            res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
        }
    }

    async addCar(req, res) {
        let car = req.body;
        try {
            const result = await this.carModel.addCar(car);
            res.status(201).json({ statusCode: 201, message: "Car added successfully", data: result });
        } catch (err) {
            console.error('Error adding car:', err);
            res.status(400).json({ statusCode: 400, message: "Bad Request" });
        }
    }
}

module.exports = CarController;
