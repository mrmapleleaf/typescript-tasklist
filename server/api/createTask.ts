import CreateTaskForm from '~/interfaces/createTaskForm';
import pool from '../mysql-connector';

export default defineEventHandler(async (event) => {
  const connection = await pool.getConnection();
  try {
    const body: CreateTaskForm = await readBody(event);
    console.log('body', body);

    const query =
      'INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)';
    const [rows] = await connection.query(query, [
      body.title,
      body.description,
      body.deadline,
      body.status,
    ]);

    return rows;
  } catch (e) {
    console.log('error occured', e);
  } finally {
    connection.release();
  }
});
