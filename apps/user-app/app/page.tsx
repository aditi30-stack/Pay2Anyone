import { getServerSession } from "next-auth"
import { authOptions } from "./lib/options"
import { redirect } from "next/navigation"


export default async function () {
  const session = await getServerSession(authOptions)


  return(
   
      <div>
        {session?.user?.id ? redirect("/dashboard/transfer"): redirect("/api/auth/signin")}
      </div>
  )
}