import { AdminProvider } from "@/context/adminContext";

export default function RootLayout({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}
