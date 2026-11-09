import "./globals.css";

export const metadata = {
  title: "Citra Negara | SPMB",
  description: "Sistem Penerimaan Murid Baru SMK Citra Negara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
