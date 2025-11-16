import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Global
export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Adding default dark background and transition-colors for a smooth theme change.
      */}
      <body className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <AuthProvider>
          <Navbar />

          {/* Layout UI */}
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}