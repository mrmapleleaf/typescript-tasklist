import pool from '../mysql-connector';

export default defineEventHandler(async (event) => {
  const connection = await pool.getConnection();
  try {
    const body = await readBody(event);
    const query =
      'UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?';
    const [rows] = await connection.query(query, [
      body.title,
      body.description,
      body.deadline,
      body.status,
      body.id,
    ]);
    return rows;
  } catch (e) {
    console.log('error occured', e);
  } finally {
    connection.release();
  }
});
