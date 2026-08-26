let belanja = 200000;

if (belanja > 150000) {
    let diskon = belanja * 10 / 100;
    let total = belanja - diskon;

    document.write("Anda mendapat diskon 10%<br>");
    document.write("Diskon: Rp" + diskon + "<br>");
    document.write("Total pembayaran: Rp" + total);
} else {
    document.write("Terima kasih sudah berbelanja!");
}