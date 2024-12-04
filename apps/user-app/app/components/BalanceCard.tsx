
import { Card } from "@repo/ui/card";
import BalanceReport from "../lib/actions/BalanceCard";


export const BalanceCard = async() =>{
    const {message} = await BalanceReport()
    

    return(
        <Card title="Balance">
                <div className="flex justify-between bg-white font-semibold border-b border-gray-200 p-2 bg-gray-50">
                    <div>Unlocked Balance</div>
                    <div>{message[0]?.amount ? message[0].amount / 100: "fetching..."} INR</div>
                </div>
                <div className="flex justify-between bg-white font-semibold border-b border-gray-200 bg-gray-50 p-2">
                    <div>Total Locked Balance</div>
                    <div>0 INR</div>
                </div>
                <div className="flex justify-between bg-white font-semibold border-b bg-gray-50 border-gray-200 p-2">
                    <div>Total Balance</div>
                    <div>{message[0]?.amount ? message[0].amount / 100 + message[0]?.locked : "fetching..."} INR</div>
                </div>
            </Card>

    )
}