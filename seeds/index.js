const mongoose = require('mongoose');
const cities = require('./cities.json');
const { places, descriptors, imgs, desc} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random9683 = Math.floor(Math.random() * 9683);
        const price = Math.floor(Math.random() * 20) + 200;
        const rand18 = Math.floor(Math.random() * 18);
        const camp = new Campground({
            author: '61259561f6304778c8ec82ec',
            location: `${cities[random9683].city}, ${cities[random9683].admin_name}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            description: `${sample(desc)}`,
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random9683].lng, cities[random9683].lat]
            },
            images: [imgs[Math.floor(Math.random() * 18)], imgs[Math.floor(Math.random() * 18)], imgs[Math.floor(Math.random() * 18)]]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})