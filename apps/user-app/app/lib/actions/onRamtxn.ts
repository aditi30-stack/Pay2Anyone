"use server"
import { db } from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../options"

export const onRampTransaction = async(provider:string,amount:number) =>{
    const session = await getServerSession(authOptions)
    const userId = session.user.id;
    const token = Math.random().toString()

    try{
    await db.onRampTransaction.create({
        data: {
            provider: provider,
            amount: amount*100,
            startTime: new Date(),
            token: token,
            status: "processing",
            userId: Number(userId)


        }

})

return {
    message: "on ramp transaction added!"

}
}catch(e) {
    return {
        error: "Error adding transaction!"
    }

}
finally{
    await db.$disconnect()
}
    
    
   
    

}