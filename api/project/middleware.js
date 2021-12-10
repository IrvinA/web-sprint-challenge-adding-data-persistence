const db = require('../../data/dbConfig');

const checkPost = async (req, res, next) => {
  const { project_name } = req.body;
  try {
    const existing = await db('projects')
      .where('project_name', project_name)
      .first();
    if (existing) {
      next({
        status: 400,
        message: 'A project with that name already exists',
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validatePost = (req, res, next) => {
  const { project_name, project_completed } = req.body;
  if (project_name === undefined || typeof project_name !== 'string') {
    next({
      status: 400,
      message: 'invalid project name',
    });
  } else if (project_completed === false || project_completed === undefined) {
    next({
      ...req.body,
      project_completed: 0,
    });
  } else {
    next({
      ...req.body,
      project_completed: 1,
    });
  }
};

module.exports = {
  checkPost,
  validatePost,
};
