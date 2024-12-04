"use client"

import { AppBar } from "@repo/ui/appbar"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

 const AppbarClient = () =>{
    const session = useSession()
    console.log(session?.data?.user)
    const router = useRouter()

    return (
        <div>
            <AppBar onSignin={signIn} onSignOut={async()=>{
                await signOut()
                router.push("/api/auth/signin")

            }} user={session?.data?.user}>
                Pay2Anyone
            </AppBar>
        </div>
    )
}


export default AppbarClient