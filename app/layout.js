import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from 'antd';
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Villa Serrana Club Social & Deportivo",
  description: "Sitio turistico oficial de el Club Social y Deportivo de Villa Serrana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
              token: {
                  // Verde Token
                  colorPrimary: '#09A603',
                  borderRadius: 2,

                  // Alias Token
                  colorBgContainer: '#f6ffed',
              },
              }}
        >
          <Navbar/>
          {children}
          <Footer/>
        </ConfigProvider>
      </body>
    </html>
  );
}
