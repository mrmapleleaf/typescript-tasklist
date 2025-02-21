import pool from '../mysql-connector';

export default defineEventHandler(async (event) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM tasks');
    return rows;
  } catch (e) {
    console.log('error occured', e);
  } finally {
    connection.release();
  }
});
