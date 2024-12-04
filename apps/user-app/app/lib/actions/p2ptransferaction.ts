"use server";
import { db } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../options";
import { error } from "console";

const P2PAction = async (phone: number, amount: number) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      error: "Error sending rupees! Kindly login again and try!",
    };
  }


  const to = await db.user.findFirst({
    where: {
      number: phone.toString(),
    },
  });


  if (!to || !to.id) {
    return {
      error: "No user exists with this number!",
    };
  }

  if(to.id === Number(from)) {
    return{
      error: "You can't send money to your own account!"
    }
  }

  try{

  await db.$transaction(async(tx)=>{
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
    const fromBalance = await tx.balance.findUnique({
      where: {
        userId: Number(from)
      }
    })
    if(!fromBalance || (fromBalance.amount/100) < amount) {
      throw new Error("Insufficient funds!")
    }

    await tx.balance.update({
      where: {
        userId: Number(from)
      },
      data:{
        amount: {
          decrement: amount*100
        }
      }
    })

    await tx.balance.update({
      where:{
        userId: Number(to.id)
      },
      data:{
        amount: {
          increment: amount
        }
      }
    })

    await tx.p2pTransaction.create({
      data:{
       amount: amount*100,
       timestamp: new Date(),
       fromUserId: Number(from),
       toUserId: Number(to.id)

      }

    })

    
  })

  return {
    message: "Money sent successfully!"
  }
}catch(e) {
  console.log(e)
  return {
    error: "Error sending money"
  }
}

 
};

export default P2PAction;
