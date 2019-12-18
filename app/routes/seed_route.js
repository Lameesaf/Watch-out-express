//Require necessary NPM packages
const express = require('express');


const mongoose = require("mongoose")

const Role = require('../models/user').Role


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
        return res.status(200).json({role: role});
    })
    //catch any error that might accrue
    .catch((error) => {
      res.status(500).json({ error: error })
    })
})





