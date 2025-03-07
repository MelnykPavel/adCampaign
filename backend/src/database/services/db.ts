import sqlite3 from 'sqlite3';
import path from 'path';
import { SYSTEM_MESSAGES } from '../../constants';

const PROJECT_ROOT = path.resolve(__dirname, '../../../');
const DB_PATH = path.join(
  PROJECT_ROOT,
  process.env.DB_PATH || 'var/database.db'
);

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(SYSTEM_MESSAGES.DATABASE_ERROR, err.message);
    return;
  }
  process.stdout.write(`${SYSTEM_MESSAGES.DATABASE_CONNECTED}\n`);
});

export default db;
