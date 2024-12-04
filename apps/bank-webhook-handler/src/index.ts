import express from "express";
import {db} from "@repo/db/client"
const app = express()


app.use(express.json())

app.post("/bankwebhook", async(req:any, res:any)=>{
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount:req.body.amount,
        provider: req.body.provider
    }

  const findRecord = await db.onRampTransaction.findFirst({
    where: {
        token: paymentInformation.token
    }
  })
 

  if(findRecord && findRecord.status === "processing") {
   try{
    await db.$transaction([
    db.balance.updateMany({
        where: {
            userId: Number(paymentInformation.userId)
        },
        data: {
            amount:{
                increment:Number(paymentInformation.amount * 100)
            }
        }
    }),
    db.onRampTransaction.updateMany({
        where:{
            
            token: paymentInformation.token
        },
        data:{
            status: "success"
        }
    })
    
   ])

   res.status(200).json({
    message: "Captured!"
   })
}catch(e) {
    console.log(e)
    return res.status(411).json({
        error: "Error while processing webhook!"
    })
}
 }else{
    return res.status(400).json({
        error: "No field to update"
       
    })
 }


})



const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})