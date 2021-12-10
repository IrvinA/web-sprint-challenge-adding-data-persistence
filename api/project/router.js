const express = require('express');
const Projects = require('./model');
const { checkPost, validatePost } = require('./middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Projects.getProjects()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.post('/', checkPost, validatePost, (req, res, next) => {
  Projects.addProject(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

module.exports = router;
