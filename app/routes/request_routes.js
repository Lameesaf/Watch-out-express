//Require necessary NPM packages
const express = require('express');

//Require Mongoose Model for Request
const Request = require('../models/request').Request


//Instantiate a Router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/requests
 * Description:   Get all requests
 */

router.get('/api/requests', (req, res) => {
  // user = db.runCommand({connectionStatus : 1}).authInfo.authenticatedUsers[0]
  // console.log('hhhhh',user)
  Request.find()
  //Return all Request as an array
  .then((requests) => {
    return res.status(200).json({ requests: requests })
  })
  //catch any error that might accrue
  .catch((error) => {
    console.log('hhhhh')
    res.status(500).json({ error: error })
    })
})


/**
* Action:      SHOW
* Method:      GET
* URI:         /api/requests/:request_id
* Description:   Get an Request by Request id
*/

router.get('/api/requests/:request_id', (req, res) => {
  Request.findById(req.params.request_id)
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

router.post('/api/requests', (req, res) => {
  console.log('hi')
  Request.create(req.body.request)
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

router.patch('/api/requests/:request_id', (req, res) => {
  Request.findById(req.params.request_id)
    .then((request) => {
      if (request) {
        //Pass the result of Mongoose's `.update` method to the next `.then`
        
        return request.update(req.body.request)
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
  Request.findById(req.params.request_id)
    .then((request) => {
      if (request) {
        //Pass the result of Mongoose's `.delete` method to the next `.then`
        return request.remove()
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