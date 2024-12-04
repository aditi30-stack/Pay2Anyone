import { Card } from "@repo/ui/card";
import P2PtransferReport from "../lib/actions/p2pReport";

const PersonToPersonTransaction = async() =>{
    const {transactionReport, receivedTransaction} = await P2PtransferReport()
    
    

    if(transactionReport.length === 0 && receivedTransaction.length === 0) {
        return(
            <Card title="My Transactions">
                <div>
                    No new sent transactions to show!
                </div>

            </Card>
        )
    }


    return(
        <div className="flex flex-col space-y-4">
        <Card title="Sent Transactions">
        
        <div className="flex flex-col">
        {transactionReport.map((txn)=>(
            <div key={txn.id} className="flex justify-between font-bold text-md border-b border-gray-200 p-1.5 bg-gray-50">
                <div>
                    Sent INR
                    
                </div>
                <div>
                    +{txn.amount/100} INR
                </div>
               
            </div>
        ))}
        </div>

        </Card>

        <Card title="Received Transactions">
        
        <div className="flex flex-col">
        {receivedTransaction.map((txn)=>(
            <div key={txn.id} className="flex justify-between font-bold text-md border-b border-gray-200 p-1.5 bg-gray-50">
                <div>
                    Receieved INR
                    
                </div>
                <div>
                    +{txn.amount/100} INR
                </div>
               
            </div>
        ))}
        </div>

        </Card>

        </div>
    )

}


export default PersonToPersonTransaction