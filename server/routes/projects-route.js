const express = require('express');
const router = express.Router();

const Projects = require('../models/project');

router.get('', (req, res)=>{
  Projects.find({}, (err, data)=>{
    res.json(data);
  })
});


router.get('/:id', (req, res)=>{
  const projectID = req.params.projectID;

  Projects.findById(projectID, (err, data)=>{
    res.json(data);
  })
});

module.exports = router;