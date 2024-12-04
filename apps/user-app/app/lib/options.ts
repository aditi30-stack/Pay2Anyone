import CredentialsProvider  from "next-auth/providers/credentials";
import {SigninSchema, SigninChecking } from "@repo/type-checking/SignInChecking"
import { JWT } from "next-auth/jwt";
import {db} from "@repo/db/client"
import bcrypt from "bcrypt";


interface credentialType {
    phone? : string,
    password?: string
}



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: {label : "Phone number", type: "text", placeholder: "1234567890"},
                password: {label: "Password", type:"password"}
            },
            async authorize(credentials) {
                
                if(!credentials?.phone || !credentials.password) {
                    return null
                }
                
                try{
                    const output = SigninSchema.safeParse(credentials)
                    if(output.success) {
                        const hashed_Password = await bcrypt.hash(credentials.password, 10)
                        const existingUser = await db.user.findFirst({
                            where: {
                                number: credentials.phone
                            }
                        })

                        if(existingUser) {
                            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                            if(passwordValidation) {
                                return {
                                    id: existingUser.id.toString(),
                                    name: existingUser.name,
                                    email: existingUser.email,
                                    number: existingUser.number
        
                                }
                            }
                            return null
                        }else {
                            const createUser = await db.user.create({
                                data: {
                                    number: credentials.phone,
                                    password: hashed_Password
                                }
                            })
                            if(createUser) {
                                return {
                                    id: createUser.id.toString(),
                                    name: createUser.name,
                                    phone: createUser.number,
                                    email: createUser.email
                                }
                            }
                            return null
                        }

                    }
                    else {
                        return null
                    }
                
                }catch(e) {
                    console.log(e)
                    return null
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        
        async session({session, token}: {session:any, token:JWT}) {
            session.user.id = token.sub
            return session

        }
    }

}