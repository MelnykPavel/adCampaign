import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { SYSTEM_MESSAGES } from '../../constants';

type Database = sqlite3.Database;

const PROJECT_ROOT = path.resolve(__dirname, '../../../');
const SQL_PATH = path.join(PROJECT_ROOT, 'src/database/sql/');

const initializeDatabase = (db: Database): void => {
  try {
    const createCampaignsTableQuery = fs.readFileSync(
      path.resolve(SQL_PATH, 'createCampaignsTable.sql'),
      'utf-8'
    );
    const createPayoutsTableQuery = fs.readFileSync(
      path.resolve(SQL_PATH, 'createPayoutsTable.sql'),
      'utf-8'
    );

    db.run(createCampaignsTableQuery, (err) => {
      if (err) {
        console.error(SYSTEM_MESSAGES.TABLE_CREATION_ERROR, err.message);
        return;
      }
      process.stdout.write(`${SYSTEM_MESSAGES.CAMPAIGNS_TABLE_CREATED}\n`);
    });

    db.run(createPayoutsTableQuery, (err) => {
      if (err) {
        console.error(SYSTEM_MESSAGES.TABLE_CREATION_ERROR, err.message);
        return;
      }
      process.stdout.write(`${SYSTEM_MESSAGES.PAYOUTS_TABLE_CREATED}\n`);
    });
  } catch (err) {
    console.error(SYSTEM_MESSAGES.SQL_QUERIES_READ_ERROR, err);
  }
};

export default initializeDatabase;
