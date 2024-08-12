// 'use client'
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { SessionProvider } from "next-auth/react";

// export default function PanelDeControlLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "loading") return; // Evitar redirección mientras se carga el estado de la sesión
//     if (!session) {
//       router.push('/admin');
//     }
//   }, [session, status, router]);

//   return <>{children}</>;
// }
