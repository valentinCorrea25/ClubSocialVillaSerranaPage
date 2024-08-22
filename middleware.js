export { default } from "next-auth/middleware"

export const config = { matcher: ["/admin/paneldecontrol"] }

//Agregar a .env --> NEXTAUTH_SECRET=SECRET