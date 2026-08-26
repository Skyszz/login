<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Sign Up</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="page-bg">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="container" id="container">

    <!-- GELEMBUNG KHUSUS DI DALAM KOTAK -->
    <div class="animated-bg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>


    <!-- LOGIN -->
    <div class="form-container login-form">

        <form action="login.php" method="POST">

            <h1>Login</h1>

            <input
                type="text"
                name="username"
                placeholder="Username"
                required
            >

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            >

            <button type="submit">
                LOGIN
            </button>

            <p>
                Belum punya akun?
                <a href="#" id="showSignup">SIGN UP</a>
            </p>

        </form>

    </div>


    <!-- SIGN UP -->
    <div class="form-container signup-form">

        <form action="register.php" method="POST">

            <h1>Sign Up</h1>

            <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                required
            >

            <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
            >

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            >

            <button type="submit">
                SIGN UP
            </button>

            <p>
                Sudah punya akun?
                <a href="#" id="showLogin">LOGIN</a>
            </p>

        </form>

    </div>


    <!-- PANEL GESER -->
    <div class="overlay-container">

        <div class="overlay">

            <!-- PANEL LOGIN -->
            <div class="overlay-panel overlay-left">

                <h1>Welcome Back</h1>

                <p>Login untuk melanjutkan.</p>

                <button
                    type="button"
                    class="ghost"
                    id="loginBtn"
                >
                    LOGIN
                </button>

            </div>


            <!-- PANEL SIGN UP -->
            <div class="overlay-panel overlay-right">

                <h1>Hello There</h1>

                <p>Belum punya akun?</p>

                <button
                    type="button"
                    class="ghost"
                    id="signupBtn"
                >
                    SIGN UP
                </button>

            </div>

        </div>

    </div>

</div>

<script src="main.js"></script>

</body>
</html>