const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


// https://res.cloudinary.com/dkobewcwg/image/upload/v1670328294/SmartCityRating/olgdj97x2ppk1yqhoj9i.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String,
    imageTitle: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/b_auto:border,c_pad,h_135,w_200');
});

const opts = { toJSON: { virtuals: true } };

const CitySchema = new Schema({
    description: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    cityname: String,
    state: String,
    population: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CitySchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/cities/${this._id}">${this.cityname}</a><strong>`
});

CitySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('City', CitySchema);