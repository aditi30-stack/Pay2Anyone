import { Card } from "@repo/ui/card"
import RecentTransactions from "../lib/actions/RecentTransactionReport"


export const RecentTransaction = async() => {
    const {message} = await RecentTransactions()
    
    
    if(message.length === 0) {
        return(
            <Card title="Recent Transactions">
                <div>
                    No new Transactions to show

                </div>
            </Card>
        )
    }

   return (
    <Card title="Recent Transactions">
        <div className="flex flex-col">
        {message.map((txn)=>(
            <div key={txn.id} className="flex justify-between font-bold text-md bg-gray-50 border-b border-gray-200 p-1.5">
                <div>
                    Received INR
                    
                </div>
                <div>
                    +{txn.amount/100} INR
                </div>
                <div>
                    {txn.status}
                </div>
            </div>
        ))}
        </div>

    </Card>
   )


}
    
    