//Require necessary NPM packages
const express = require('express');

//Require Mongoose Model for Request
const Request = require('../models/request').Request
const Review = require('../models/request').Review


//Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/reviews
 * Description:   Get all reviews
 */

router.get('/api/reviews', (req, res) => {

  // user = db.runCommand({connectionStatus : 1}).authInfo.authenticatedUsers[0]
  Review.find()
    // Review.find({user_id: _id})

    //Return all Review as an array
    .then((reviews) => {
      return res.status(200).json({ reviews: reviews })
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

router.get('/api/reviews/:review_id', (req, res) => {

  // Request.find({user_id: _id , review:req.params.review_id })
  Request.find({ review: req.params.review_id })
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

router.post('/api/requests/:request_id/review', (req, res) => {


  Request.findById(req.params.request_id)
    .then((request) => {
      if (request) {

        const newReview = new Review({
          user_id: current_user.id,
          title: req.body.request.title,
          content: req.body.request.content,
        })

        request.review = newReview
        request.save()
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

router.patch('/api/requests/:request_id/', (req, res) => {

  // Request.find({user_id: _id , _id:req.params.request_id })
  Request.findById(req.params.request_id)
  .then((request) => {
    if (request) {

      request.review = req.body.review
      request.save()

        //Pass the result of Mongoose's `.update` method to the next `.then`

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
    .then((request) => {
      //if the update succeeded, return 204 and no JSON
      res.status(200).send(request);
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

router.delete('/api/requests/:request_id', (req, res) => {

  // Request.find({user_id: _id , _id:req.params.request_id })
  Request.findById(req.params.request_id)
    .then((request) => {
      if (request) {
        //Pass the result of Mongoose's `.delete` method to the next `.then`
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