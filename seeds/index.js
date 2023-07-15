
const mongoose = require('mongoose');
// const { createIndexes } = require('./models/campground');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const cities = require('./cities');
const axios = require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("connection open")
    })
    .catch(err => {
        console.log("oh no error!");
        console.log(err);
    })


const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64a668a0e13787ab8e018946',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore recusandae ea debitis iste minima, deserunt deleniti culpa pariatur corrupti necessitatibus quo tempore eveniet doloribus, dolor sapiente cum tenetur animi dolore?',
            price,
            geometry:
            {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dacxxp1wt/image/upload/v1689063588/Yelpcamp/kcncnehcod3swgunpvko.jpg',
                    filename: 'Yelpcamp/kcncnehcod3swgunpvko',
                },
                {
                    url: 'https://res.cloudinary.com/dacxxp1wt/image/upload/v1689063590/Yelpcamp/xiftwnwj4spxxwdlegpt.png',
                    filename: 'Yelpcamp/xiftwnwj4spxxwdlegpt',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})