<?php

include "koneksi.php";

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$query = mysqli_query(
    $conn,
    "SELECT * FROM users WHERE username='$username' AND password='$password'"
);

if (mysqli_num_rows($query) > 0) {
    $berhasil = true;
} else {
    $berhasil = false;
}

?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .card {
            width: 430px;
            padding: 50px 40px;
            background: #111;
            border-radius: 25px;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
            animation: muncul 0.7s ease;
        }

        @keyframes muncul {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }

            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 25px;
            border-radius: 50%;
            background: #4d2be3;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            color: white;
            box-shadow: 0 0 30px rgba(77, 43, 227, 0.5);
        }

        h1 {
            color: white;
            font-size: 32px;
            margin-bottom: 15px;
        }

        p {
            color: #aaa;
            font-size: 16px;
            margin-bottom: 30px;
        }

        .username {
            color: #7655ff;
            font-weight: bold;
        }

        .button {
            display: inline-block;
            padding: 14px 35px;
            border-radius: 30px;
            background: #4d2be3;
            color: white;
            text-decoration: none;
            font-weight: bold;
            transition: 0.3s;
        }

        .button:hover {
            background: #6545ff;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(77, 43, 227, 0.4);
        }

        .error {
            color: #ff6b6b;
        }
    </style>
</head>

<body>

<?php if ($berhasil): ?>

    <div class="card">

        <div class="icon">
            ✓
        </div>

        <h1>Login Berhasil!</h1>

        <p>
            Selamat datang kembali,
            <span class="username">
                <?= htmlspecialchars($username) ?>
            </span>
        </p>

        <a href="index.php" class="button">
            KEMBALI
        </a>

    </div>

<?php else: ?>

    <div class="card">

        <div class="icon">
            ✕
        </div>

        <h1>Login Gagal</h1>

        <p class="error">
            Username atau password salah.
        </p>

        <a href="index.php" class="button">
            COBA LAGI
        </a>

    </div>

<?php endif; ?>

</body>
</html>