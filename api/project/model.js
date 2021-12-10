const db = require('../../data/dbConfig');

async function getProjects() {
  const rows = await db('projects');
  const result = rows.map((row) => {
    const newRow = {
      ...row,
      project_completed: !!row.project_completed,
    };
    return newRow;
  });
  return result;
}

async function addProject(project) {
  const [project_id] = await db('projects').insert(project);
  const row = await db('projects').where('project_id', project_id).first();
  const result = { ...row, project_completed: !!row.project_completed };
  return result;
}

module.exports = {
  getProjects,
  addProject,
};
