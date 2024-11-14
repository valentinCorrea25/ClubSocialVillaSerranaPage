import { AdminProvider } from "@/context/adminContext";

export const metadata = {
  title: "Panel de Control | Club Social & Deportivo Villa Serrana",
}

export default function RootLayout({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}
