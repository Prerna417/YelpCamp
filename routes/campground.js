const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
const { campgroundSchema } = require('../schemas.js')
const { isLoggedIn } = require('../middleware')
const { validatecampground } = require('../middleware')
const { isAuthor } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
     .post(isLoggedIn,  upload.array('image'),validatecampground, catchAsync(campgrounds.createCampground))
   

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validatecampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;