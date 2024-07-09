#!/bin/bash

usuario="valentinCorrea25"
contrasenia="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"
repo="ClubSocialVillaSerranaPage/develop.git"

# Configurar las credenciales para la URL del repositorio remoto
url="https://$usuario:$contrasenia@github.com/$usuario/$repo"

#cd HotecheUruguayMarchShopsUpdate

# Agregar todos los cambios al área de staging
git add .

# Realizar un commit con un mensaje predefinido
git commit -m "update by $usuario"

# Hacer push a la rama actual en el repositorio remoto (por defecto, 'origin')
git push "$url"

