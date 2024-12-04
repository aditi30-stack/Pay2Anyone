"use client";

import { Button } from "./button";

interface AppProp {
    children: React.ReactNode
    onSignin: () => void,
    onSignOut: () => void,
    user? : {
        name? : string | null,
        id? : string | null
    }

}


export const AppBar = ({children, onSignin, onSignOut, user}:AppProp) =>{
    return (
        <div className="flex justify-between items-center border-b border-gray-400 px-4 py-2">
            <div className="font-bold text-lg">
                {children}
            </div>

                <div className="font-bold text-lg pt-2">
                <Button onClick={user ? onSignOut: onSignin}>
                    {user ? "Logout": "Login"}
                </Button>
                </div>
            

        </div>
    )
}