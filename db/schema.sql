-- Drop the existing database if it exists
DROP DATABASE IF EXISTS transactions_dev;

-- Create a new database
CREATE DATABASE transactions_dev;

-- Connect to the new database
\c transactions_dev;

-- Create the transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  name TEXT,
  amount NUMERIC,
  source TEXT NOT NULL
);

