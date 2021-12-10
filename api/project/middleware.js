const validatePost = (req, res, next) => {
  const { project_name } = req.body;
  if (project_name === undefined || typeof project_name !== 'string') {
    next({
      status: 400,
      message: 'invalid project name',
    });
  } else {
    next();
  }
};

module.exports = {
  validatePost,
};
