const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCity, isAuthor } = require('../middleware');
const City = require('../models/city');
const cities = require('../controllers/cities');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.get('/', catchAsync(cities.index));

router.get('/new', isLoggedIn, cities.renderNewForm);

router.post('/', isLoggedIn, upload.array('image'), validateCity, catchAsync(cities.createCity));

router.get('/:id', catchAsync(cities.showCity));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(cities.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCity, catchAsync(cities.updateCity));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(cities.deleteCity));

module.exports = router;