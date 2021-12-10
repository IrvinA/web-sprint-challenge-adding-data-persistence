const express = require('express');
const Tasks = require('./model');
const { validatePost } = require('./middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Tasks.getTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch(next);
});

router.post('/', validatePost, (req, res, next) => {
  const task = req.body;

  Tasks.createTask(task)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch(next);
});

module.exports = router;
