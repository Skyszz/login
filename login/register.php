<?php

include "koneksi.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Akses tidak valid.");
}

$fullname = $_POST["fullname"] ?? "";
$email    = $_POST["email"] ?? "";
$password = $_POST["password"] ?? "";

if (
    trim($fullname) === "" ||
    trim($email) === "" ||
    trim($password) === ""
) {
    die("Data dari form tidak lengkap. Silakan kembali ke halaman login.");
}

$username = trim($fullname);
$email = trim($email);
$password = trim($password);


// Cek email
$cek = mysqli_prepare(
    $conn,
    "SELECT id FROM users WHERE email = ?"
);

mysqli_stmt_bind_param(
    $cek,
    "s",
    $email
);

mysqli_stmt_execute($cek);
mysqli_stmt_store_result($cek);

if (mysqli_stmt_num_rows($cek) > 0) {

    die("Email sudah terdaftar. Silakan gunakan email lain.");

}

mysqli_stmt_close($cek);


// Masukkan data
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO users (username, email, password)
     VALUES (?, ?, ?)"
);

mysqli_stmt_bind_param(
    $stmt,
    "sss",
    $username,
    $email,
    $password
);

if (mysqli_stmt_execute($stmt)) {

?>

<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">

<title>Sign Up Berhasil</title>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {

    min-height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;

    background:
        linear-gradient(
            135deg,
            #667eea,
            #764ba2
        );
}

.card {

    width: 430px;

    padding: 45px;

    text-align: center;

    background: #111;

    color: white;

    border-radius: 25px;

    box-shadow:
        0 20px 50px rgba(0,0,0,.35);
}

.icon {

    width: 80px;
    height: 80px;

    margin: 0 auto 25px;

    display: flex;

    justify-content: center;
    align-items: center;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            #4f20ff,
            #7b4cff
        );

    font-size: 45px;
}

h1 {

    margin-bottom: 15px;

}

p {

    color: #bbb;

    line-height: 1.6;

    margin-bottom: 30px;

}

.btn {

    display: inline-block;

    padding: 13px 30px;

    border-radius: 30px;

    background:
        linear-gradient(
            135deg,
            #4f20ff,
            #7b4cff
        );

    color: white;

    text-decoration: none;

    font-weight: bold;
}

.btn:hover {

    opacity: .85;

}

</style>

</head>

<body>

<div class="card">

    <div class="icon">
        ✓
    </div>

    <h1>Sign Up Berhasil!</h1>

    <p>
        Akun berhasil dibuat.
        <br>
        Selamat datang, <?= htmlspecialchars($username) ?> 👋
    </p>

    <a href="index.php" class="btn">
        LOGIN SEKARANG
    </a>

</div>

</body>
</html>

<?php

} else {

    echo "Pendaftaran gagal: " . mysqli_error($conn);

}

mysqli_stmt_close($stmt);

?>