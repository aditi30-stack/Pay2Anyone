import z from "zod";


const SigninSchema = z.object({
    phone: z.string().min(10).max(10),
    password: z.string().min(8)

    
})

type SigninChecking = z.infer< typeof SigninSchema>

export type {SigninChecking}
export {SigninSchema}