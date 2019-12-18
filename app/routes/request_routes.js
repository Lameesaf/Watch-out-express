//Require necessary NPM packages
const express = require('express');

//Require Mongoose Model for Request
const Request = require('../models/request').Request

const User = require('../models/user').User
const Role = require('../models/user').Role

const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

//Instantiate a Router (mini app that only handles routes)
const router = express.Router();




/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/requests
 * Description:   Get all requests
 */

router.get('/api/requests', requireToken, (req, res) => {

  let role

  User.findById(req.user._id)
  .then((user)=>{
    Role.findById(user.role)
    .then((role)=>{

        role = role.title;
    })
    .catch(error=>{
      res.status(500).json({ error: error })
    })
  })
  .catch((error)=>{
    res.status(500).json({ error: error })
  })
    let query;
  if(role === 'manger'){
    query = req.user._id
  }else{
      query = {}
  }
  
  Request.find(query)

    //Return all Request as an array
    .then((requests) => {
      return res.status(200).json({ requests: requests })
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})


/**
* Action:      SHOW
* Method:      GET
* URI:         /api/requests/:request_id
* Description:   Get an Request by Request id
*/

router.get('/api/requests/:request_id', requireToken, (req, res) => {

  let role

  User.findById(req.user._id)
  .then((user)=>{
    Role.findById(user.role)
    .then((role)=>{

        role = role.title;
    })
    .catch(error=>{
      res.status(500).json({ error: error })
    })
  })
  .catch((error)=>{
    res.status(500).json({ error: error })
  })
    let query;
  if(role === 'manger'){
    query = {user_id: req.user._id,  _id: req.params.request_id }
  }else{
      query = {_id: req.params.request_id}
  }

  Request.find(query)
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
* URI:         /api/requests/
* Description:   Create a new Request
*/

router.post('/api/requests', requireToken, (req, res) => {

   console.log(req.user)
  const newRequest = {
    user_id: req.user._id,
    shop_name: req.body.request.shop_name,
    shift: req.body.request.shift,
    days: req.body.request.days,
    details: req.body.request.details,
    status: "5df799cb5431528b47318a47",
  }
  console.log(newRequest)
  Request.create(newRequest)
    //on a successful `create` action, respond with 201
    //HTTP status and the content of the new request
    .then((newRequest) => {
      res.status(201).json({ request: newRequest });
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

router.patch('/api/requests/:request_id', requireToken, (req, res) => {

  Request.findOneAndUpdate({ user_id: req.user._id, _id: req.params.request_id }, {
    shop_name: req.body.request.shop_name,
    shift: req.body.request.shift,
    days: req.body.request.days,
    details: req.body.request.details,
    status: req.body.request.status
  }, { new: true })
    .then((request) => {
      if (request) {
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
      console.log(error)
      res.status(500).json({ error: error });
    })
})



/**
* Action:      DESTROY
* Method:      DELETE
* URI:         /api/requests/:request_id
* Description:   Delete an Request by Request id
*/

router.delete('/api/requests/:request_id', requireToken, (req, res) => {

  Request.findOneAndRemove({ user_id: req.user._id, _id: req.params.request_id })
    .then((request) => {
      if (request) {
        //Pass the result of Mongoose's `.delete` method to the next `.then`
        console.log(request)
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