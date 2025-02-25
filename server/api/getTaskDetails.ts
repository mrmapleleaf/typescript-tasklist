import pool from '../mysql-connector';

export default defineEventHandler(async (event) => {
  const connection = await pool.getConnection();
  try {
    // クエリパラメータを取得
    const params = getQuery(event);
    const id = params.id;

    // クエリ準備、実行
    const query = 'SELECT * FROM tasks where id = ?';
    const [rows] = await connection.execute(query, [id]);

    return rows;
  } catch (e) {
    console.log('error occured', e);
  } finally {
    connection.release();
  }
});
