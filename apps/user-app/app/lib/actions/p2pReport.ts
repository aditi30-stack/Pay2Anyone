"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../options";
import { db } from "@repo/db/client";

const P2PtransferReport = async() =>{
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    const transactionReport = await db.p2pTransaction.findMany({
        where: {
            fromUserId: Number(userId)

        },
        orderBy: {
            timestamp: "desc"
        }
    })

    const receivedTransaction = await db.p2pTransaction.findMany({
        where:{
            toUserId: Number(userId)
        },
        orderBy:{
            timestamp: "desc"
        }
    })

    return {
        transactionReport: transactionReport,
        receivedTransaction: receivedTransaction
    }

}

export default P2PtransferReport