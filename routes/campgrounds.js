const express=require('express')
const router=express.Router()
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js');
const campgrounds= require('../controllers/campground')
const {storage}=require('../cloudinary/index')
const multer=require('multer')
const upload= multer({storage})

const{isLoggedIn,isAuthor,validateCampground}=require('../middleware')



router.route('/')
    .get( catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new',isLoggedIn,campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image') ,validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm))




module.exports=router