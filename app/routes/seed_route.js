//Require necessary NPM packages
const express = require('express');


const Role = require('../models/user').Role



const router = express.Router();

const roles = [
  {
    title: 'manger'
  },
  {
    title: 'shopper'
  },
  {
    title: 'admin'
  }
]
router.get('/api/seed', (req, res) => {

   Role.insertMany(roles)

    .then((role) => {
      console.log(role)
        return res.status(200).json({role: role});
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})


module.exports = router;





