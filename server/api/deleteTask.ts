import pool from '../mysql-connector';

export default defineEventHandler(async (event) => {
  const connection = await pool.getConnection();
  try {
    const { id } = getQuery(event);
    console.log(id);
    const query = `DELETE FROM tasks WHERE id = ?`;

    const result = await connection.query(query, [id]);
    console.log('delete結果：', result);
  } catch (e) {
    console.log(e);
  } finally {
    connection.release();
  }
});
