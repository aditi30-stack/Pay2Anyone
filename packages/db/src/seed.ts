import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const seedData = await prisma.user.upsert({
        where: {
            number: "1112223334"
        },
        update: {},
        create:{
            
                number: "1112223334",
                password: await bcrypt.hash("examples", 10),
                name: "alice",
                Balance:{
                    create:{
                        amount: 2000,
                        locked: 0,    
                    }

                },
                onRampTransaction:{
                    create:{
                        startTime: new Date(),
                        token: "123",
                        provider: "HDFC Bank",
                        amount: 4000,
                        status: "success"


                        

                    }

                }

            
        }
    })

    console.log(seedData)
}

main().then(async()=>{
    await prisma.$disconnect()

}).catch(async(e)=>{
    console.log(e)
    await prisma.$disconnect()
    process.exit()
})

