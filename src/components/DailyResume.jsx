import Card from "./Card";
import { FiClock, FiLogIn, FiLogOut } from "react-icons/fi";

const DailyResume = ({ checkIns = 2, checkOuts = 1 }) => {
    return (
        <Card
            titulo="Hoje"
            info={<FiClock size={18} className="text-gray-500" />}
        >
            <div className="flex flex-col gap-3">

                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="bg-[#e8f5ee] p-2 rounded-lg">
                        <FiLogIn size={20} className="text-[#21a568]" />
                    </div>
                    <span className="flex-1 text-gray-700 text-sm font-medium">
                        Check-ins Hoje
                    </span>
                    <span className="text-[#21a568] font-bold text-lg">{checkIns}</span>
                </div>

                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="bg-[#e8f0f5] p-2 rounded-lg">
                        <FiLogOut size={20} className="text-[#0f4f6e]" />
                    </div>
                    <span className="flex-1 text-gray-700 text-sm font-medium">
                        Check-outs Hoje
                    </span>
                    <span className="text-[#0f4f6e] font-bold text-lg">{checkOuts}</span>
                </div>

            </div>
        </Card>
    );
};

export default DailyResume;