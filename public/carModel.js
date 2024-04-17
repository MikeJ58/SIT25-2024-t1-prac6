const { MongoClient, ServerApiVersion } = require('mongodb');

class CarModel {
    constructor() {
        this.uri = "mongodb+srv://dbUser:SimplePlan89@cluster1.fopezw4.mongodb.net/"; // Set your MongoDB URI here
        this.client = new MongoClient(this.uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
        this.collection = null;
    }

    async connect() {
        try {
            await this.client.connect();
            this.collection = this.client.db('Test').collection('Cars');
            console.log("Database connected successfully");
        } catch (ex) {
            console.error("Error connecting to the database:", ex);
            throw ex;
        }
    }

    async getAllCars() {
        try {
            if (!this.collection) {
                await this.connect();
            }
            return await this.collection.find({}).toArray();
        } catch (err) {
            console.error("Error fetching cars:", err);
            throw err;
        }
    }
    

    async addCar(car) {
        try {
            if (!this.collection) {
                await this.connect();
            }
            return await this.collection.insertOne(car);
        } catch (err) {
            console.error("Error adding car:", err);
            throw err;
        }
    }
}

module.exports = CarModel;

