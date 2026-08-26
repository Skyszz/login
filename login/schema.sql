CREATE DATABASE IF NOT EXISTS login_db;
USE login_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    no_hp VARCHAR(30) NULL,
    alamat VARCHAR(255) NULL
);

-- Kalau tabel users kamu sudah ada dari sebelumnya (belum punya kolom ini),
-- jalankan 2 baris ALTER TABLE ini saja:
-- ALTER TABLE users ADD COLUMN no_hp VARCHAR(30) NULL;
-- ALTER TABLE users ADD COLUMN alamat VARCHAR(255) NULL;
