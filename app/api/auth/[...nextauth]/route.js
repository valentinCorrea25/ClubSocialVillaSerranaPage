import prisma from "@/libs/prisma";
import NextAuth from "next-auth";
const bcrypt = require('bcrypt');
import CredentialsProviders from "next-auth/providers/credentials";

export const authOptions = {
    providers:[
        CredentialsProviders({
            name: 'Credentials',
            credentials:{
                userName: {label: 'Nombre', type:'text', placeholder: 'Nombre de Usuario' },
                password: {label: 'Contrasenia', type: 'password', placeholder: 'Contrasenia'}
            },
            async authorize(credentials, req){
                try{
                    const userFound = await prisma.usuario.findFirst(
                        {where: {
                            nombre: credentials.userName,
                    }, });
    
                    if(!userFound){
                        throw new Error('Usuario no encontrado')
                    }
    
                    const itHasCorrectPassword = await bcrypt.compare(credentials.password, userFound.hashPass);
                    if(!itHasCorrectPassword){
                        console.log(itHasCorrectPassword);
                        throw new Error('Clave incorrecta')
                    }
    
                    return {id: userFound.id,
                            name: userFound.nombre,
                    };
                }
                catch(error){
                    console.log(error);
                    return {message: 'Ha ocurrido un error'};
                }
            }
        })
    ],
    pages:{
        signIn: '/admin'
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};