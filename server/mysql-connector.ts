import mysql from 'mysql2/promise';

// Nuxt の `useRuntimeConfig()` を使って、nuxt.config.tsでruntimeConfigに設定した環境変数を取得
const config = useRuntimeConfig();

// 環境変数からデータベースの接続情報を取得
const dbConfig = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

export default pool;
