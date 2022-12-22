const mongoose = require('mongoose');
const cities = require('./cities')
const City = require('../models/city');
const { urlencoded } = require('express');

mongoose.connect('mongodb://localhost:27017/smart-city-rating');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await City.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const cit = new City({
            author: '637e0e98a7da7b93f06b5cf8',
            cityname: cities[i].city,
            state: cities[i].admin_name,
            population: cities[i].population,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].lng,
                    cities[i].lat
                ]
            },
            images: cities[i].images,
            description: cities[i].description
        })
        await cit.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database disconnected\nSeeding done")
});