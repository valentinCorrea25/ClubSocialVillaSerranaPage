export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/admin/paneldecontrol",
        // "/api/actividades/:id*",
        // "/api/alquileres/:id*",
        // "/api/restaurantes/:id*",
        // "/api/eventosnoticias/:id*",
        // "/api/servicios/:id*",
        // "/api/usuarios",
    ]
}
