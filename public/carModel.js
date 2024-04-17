const { MongoClient, ServerApiVersion } = require('mongodb');

class CarModel {
    constructor() {
        this.uri = ""; // Set your MongoDB URI here
        this.client = new MongoClient(this.uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
        this.collection = null;
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.collection = this.client.db('Test').collection('Cars');
            console.log("Database connected successfully");
        } catch (ex) {
            console.error("Error connecting to the database:", ex);
        }
    }

    async getAllCars() {
        try {
            return await this.collection.find({}).toArray();
        } catch (err) {
            console.error("Error fetching cars:", err);
            throw err;
        }
    }

    async addCar(car) {
        try {
            return await this.collection.insertOne(car);
        } catch (err) {
            console.error("Error adding car:", err);
            throw err;
        }
    }
}

module.exports = CarModel;
