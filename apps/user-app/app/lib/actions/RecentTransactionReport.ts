"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../options";
import { db } from "@repo/db/client";

const RecentTransactions = async() =>{
    const session = await getServerSession(authOptions)
    const userid = session?.user?.id

    const getTransactionReport = await db.onRampTransaction.findMany({
        where: {
            userId: Number(userid)
        }
    })

    return {
        message: getTransactionReport
    }

    

}

export default RecentTransactions