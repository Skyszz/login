import "./globals.css";

export const metadata = {
  title: "Login & Sign Up",
  description: "Login dan Sign Up dengan Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
