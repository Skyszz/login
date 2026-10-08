// Jalankan: node --env-file=.env.local scripts/setup.js
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
(async () => {
  const c = await mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS });
  const d = process.env.DB_NAME;
  await c.query(`CREATE DATABASE IF NOT EXISTS \`${d}\``);
  await c.query(`USE \`${d}\``);
  await c.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(100), username VARCHAR(50) UNIQUE, password VARCHAR(255), role ENUM('admin','petugas') DEFAULT 'petugas')`);
  await c.query(`CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, kode VARCHAR(50) UNIQUE, nama VARCHAR(150), harga INT, stok INT DEFAULT 0, kategori VARCHAR(50))`);
  await c.query(`CREATE TABLE IF NOT EXISTS members (id INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(100), telp VARCHAR(20), email VARCHAR(100), alamat TEXT)`);
  await c.query(`CREATE TABLE IF NOT EXISTS transaksi (id INT AUTO_INCREMENT PRIMARY KEY, kode VARCHAR(30) UNIQUE, user_id INT, member_id INT NULL, total INT, bayar INT, kembali INT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (member_id) REFERENCES members(id))`);
  await c.query(`CREATE TABLE IF NOT EXISTS transaksi_detail (id INT AUTO_INCREMENT PRIMARY KEY, transaksi_id INT, product_id INT, qty INT, harga INT, subtotal INT, FOREIGN KEY (transaksi_id) REFERENCES transaksi(id), FOREIGN KEY (product_id) REFERENCES products(id))`);
  const [u] = await c.query("SELECT COUNT(*) n FROM users");
  if (!u[0].n) {
    await c.query("INSERT INTO users (nama,username,password,role) VALUES (?,?,?,?),(?,?,?,?)", [
      "Administrator", "admin", await bcrypt.hash("admin123", 10), "admin",
      "Petugas 1", "petugas", await bcrypt.hash("petugas123", 10), "petugas"]);
    await c.query("INSERT INTO products (kode,nama,harga,stok,kategori) VALUES ('8991','Teh Botol',5000,50,'Minuman'),('8992','Mie Instan',3500,100,'Makanan'),('8993','Sabun Mandi',4500,30,'Kebutuhan')");
  }
  console.log("Database siap. Login: admin/admin123 atau petugas/petugas123");
  await c.end();
})();
