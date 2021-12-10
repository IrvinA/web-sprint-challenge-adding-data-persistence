const validatePost = (req, res, next) => {
  const { task_description } = req.body;
  if (task_description === undefined || typeof task_description !== 'string') {
    next({
      status: 400,
      message: 'invalid task description',
    });
  } else {
    next();
  }
};

module.exports = {
  validatePost,
};
