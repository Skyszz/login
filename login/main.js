const container = document.getElementById("container");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");


/* =========================
   BUKA SIGN UP
========================= */

function openSignup() {
    container.classList.add("signup-mode");
}


/* =========================
   BUKA LOGIN
========================= */

function openLogin() {
    container.classList.remove("signup-mode");
}


/* =========================
   LINK SIGN UP
========================= */

showSignup.addEventListener("click", function(event) {

    event.preventDefault();

    openSignup();

});


/* =========================
   LINK LOGIN
========================= */

showLogin.addEventListener("click", function(event) {

    event.preventDefault();

    openLogin();

});


/* =========================
   TOMBOL SIGN UP
========================= */

signupBtn.addEventListener("click", function() {

    openSignup();

});


/* =========================
   TOMBOL LOGIN
========================= */

loginBtn.addEventListener("click", function() {

    openLogin();

});