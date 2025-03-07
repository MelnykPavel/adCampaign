enum SYSTEM_MESSAGES {
  SERVER_STARTED = 'Server started on PORT',
  DATABASE_CONNECTED = 'Connected to the SQLite database',
  DATABASE_ERROR = 'Error opening database:',
  TABLE_CREATION_ERROR = 'Error creating table:',
  CAMPAIGNS_TABLE_CREATED = 'Campaigns table created (if not exists)',
  PAYOUTS_TABLE_CREATED = 'Payouts table created (if not exists)',
  SQL_QUERIES_READ_ERROR = 'Error reading SQL queries:',
  CORS_NOT_ALLOWED = 'Not allowed by CORS',
}

export default SYSTEM_MESSAGES;
