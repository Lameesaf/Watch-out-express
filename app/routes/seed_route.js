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
// router.get('/api/seed', (req, res) => {

//    Role.insertMany(roles)

//     .then((role) => {
//       console.log(role)
//         return res.status(200).json({role: role});
//     })
//     //catch any error that might accrue
//     .catch((error) => {
//       res.status(500).json({ error: error })
//     })
// })

router.get('/api/seeds', (req, res) => {

  Role.find()

   .then((role) => {
     console.log(role)
       return res.status(200).json({role: role});
   })
   //catch any error that might accrue
   .catch((error) => {
     res.status(500).json({ error: error })
   })
})

router.delete('/api/seed/:id', (req,res)=>{
  console.log(req.params.id)
  Role.findOneAndRemove({_id:req.params.id})

  .then(role=>{
    res.status(204).json({role: role})
  })
  .catch((error) => {
    res.status(500).json({ error: error });
  })
})

// router.get('/api/seed/', (req,res)=>{

//   Role.create({title: 'admin'})

//   .then(role=>{
//     res.status(204).json({role:role})
//   })
//   .catch((error) => {
//     res.status(500).json({ error: error });
//   })
// })


module.exports = router;





