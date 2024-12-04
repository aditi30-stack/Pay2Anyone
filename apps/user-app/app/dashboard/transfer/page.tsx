import { AddMoney } from "../../components/addMoney";
import { BalanceCard } from "../../components/BalanceCard";
import { RecentTransaction } from "../../components/RecentTransaction";

const Transfer = () => {
    return (
        <div className="flex space-x-4">
        <AddMoney/>

            {/* Balance Card */}
            <div className="mt-12">
            
            <BalanceCard/>

            {/* Recent transaction */}

            <RecentTransaction/>
        </div>
        </div>
    );
};

export default Transfer;
