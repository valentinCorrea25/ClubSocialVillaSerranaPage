#!/bin/bash

usuario="valentinCorrea25"
contrasenia="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"
repo="ClubSocialVillaSerranaPage.git"

# Configurar las credenciales para la URL del repositorio remoto
url="https://$usuario:$contrasenia@github.com/$usuario/$repo"

# traer y fusionar los cambios.
git pull


