import { Inter } from "next/font/google";
import "./globals.css";
import LayoutComponent from "@/components/layoutComponent";
import { ClientProvider } from "@/context/clientContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Villa Serrana Club Social & Deportivo",
  description:
    "Sitio turistico oficial de el Club Social y Deportivo de Villa Serrana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutComponent>
          <ClientProvider>{children}</ClientProvider>
        </LayoutComponent>
      </body>
    </html>
  );
}
