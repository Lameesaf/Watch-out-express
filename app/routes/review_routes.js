//Require necessary NPM packages
const express = require('express');

//Require Mongoose Model for Request
const Request = require('../models/request').Request
const Review = require('../models/request').Review

const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })


//Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/reviews
 * Description:   Get all reviews
 */

router.get('/api/reviews', requireToken, (req, res) => {

  Request.find({ 'review.user_id': req.user.id })
    // Request.find({})
    .then((request) => {

      const allReview = request.map(request=>{

        return { review: request.review }
      })
        return res.status(200).json({reviews: allReview});
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})


/**
* Action:      SHOW
* Method:      GET
* URI:         /api/reviews/:review_id
* Description:   Get a Review by Review id
*/

router.get('/api/reviews/:review_id', requireToken, (req, res) => {

  // Request.find({user_id: _id , review:req.params.review_id })
  // Request.find({ review: req.params.review_id })
  Request.findOne({ 'review.user_id': req.user.id ,  'review._id': req.params.review_id })

    .then((request) => {
      if (request) {
        //Pass the result of Mongoose's `.get` method to the next `.then`
        res.status(200).send(request);
      } else {
        //if we couldn't find a document with matching ID
        res.status(404).json({
          error: {
            name: 'Document not found error',
            message: 'The provided ID doesn\'t match any document'
          }
        })
      }
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})

/**
* Action:      CREATE
* Method:      POST
* URI:         /api/requests/:request_id/review
* Description:   Create a new Review
*/

router.post('/api/requests/:request_id/review', requireToken, (req, res) => {


  Request.findById(req.params.request_id)
    .then((request) => {
      console.log(request)
      if (request) {

        const newReview = new Review({
          user_id: req.user.id,
          title: req.body.review.title,
          content: req.body.review.content,
        })

        request.review = newReview
        request.save();
        res.status(200).send(request);
      } else {
        //if we couldn't find a document with matching ID
        res.status(404).json({
          error: {
            name: 'Document not found error',
            message: 'The provided ID doesn\'t match any document'
          }
        })
      }
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})



/**
* Action:      UPDATE
* Method:      PATCH
* URI:         /api/requests/:request_id
* Description:   Update an Request by Request id
*/

router.patch('/api/reviews/:review_id/', requireToken, (req, res) => {

  // Request.find({user_id: _id , _id:req.params.request_id })
  console.log(req.params.review_id)
  Request.findOneAndUpdate({  'review.user_id': req.user.id , 'review._id': req.params.review_id },
  {'review.title': req.body.review.title , 'review.content': req.body.review.content }
  , {new: true})
    .then((request) => {
      if (request) {
        console.log(request.review)
        
      res.status(200).send(request);
        
      } else {
        //if we couldn't find a document with matching ID
        res.status(404).json({
          error: {
            name: 'Document not found error',
            message: 'The provided ID doesn\'t match any document'
          }
        })
      }
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})



/**
* Action:      DESTROY
* Method:      DELETE
* URI:         /api/requests/:request_id
* Description:   Delete an Request by Request id
*/

router.delete('/api/reviews/:review_id', requireToken, (req, res) => {


  Request.findOne({ 'review.user_id': req.user.id ,  'review._id': req.params.review_id })
  .then((request) => {
    if (request) {
      //Pass the result of Mongoose's `.delete` method to the next `.then`
      console.log('request',  request)
        request.review.remove();
        request.save();
        return request
      } else {
        //if we couldn't find a document with matching ID
        res.status(404).json({
          error: {
            name: 'Document not found error',
            message: 'The provided ID doesn\'t match any document'
          }
        })
      }
    })
    .then(() => {
      //if the deletion succeeded, return 204 and no JSON
      res.status(204).end();
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error });
    })
})


//Export the router so we can use it in the server.js file
module.exports = router;