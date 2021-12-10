const db = require('../../data/dbConfig');

async function getTasks() {
  const rows = await db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description');
  const result = rows.map((row) => {
    const newRow = {
      ...row,
      task_completed: !!row.task_completed,
    };
    return newRow;
  });
  return result;
}

async function addTask(task) {
  const [task_id] = await db('tasks').insert(task);
  const row = await db('tasks').where('task_id', task_id).first();
  const result = { ...row, task_completed: !!row.task_completed };
  return result;
}

module.exports = {
  getTasks,
  addTask,
};
