import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}