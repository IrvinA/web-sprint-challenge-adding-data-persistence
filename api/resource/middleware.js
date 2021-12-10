const db = require('../../data/dbConfig');

const checkPost = async (req, res, next) => {
  const { resource_name } = req.body;
  try {
    const existing = await db('resources')
      .where('resource_name', resource_name)
      .first();
    if (existing) {
      next({
        status: 400,
        message: 'A resource with that name already exists',
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validatePost = (req, res, next) => {
  const { resource_name } = req.body;
  if (resource_name === undefined || typeof resource_name !== 'string') {
    next({
      status: 400,
      message: 'invalid resource name',
    });
  } else {
    next();
  }
};

module.exports = {
  checkPost,
  validatePost,
};
