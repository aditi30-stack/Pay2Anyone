"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../options";
import { db } from "@repo/db/client";

const BalanceReport = async() =>{
    const session = await getServerSession(authOptions)
    const userid = session?.user?.id

    const balanceReport = await db.balance.findMany({
        where: {
            userId: Number(userid)
        }
    })

    return {
        message: balanceReport
    }

    
    

}


export default BalanceReport