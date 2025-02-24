import pool from '../mysql-connector';

export default defineEventHandler(async (event) => {
  const connection = await pool.getConnection();
  try {
  } catch (e) {
    console.log('error occured', e);
  } finally {
    connection.release();
  }
});
