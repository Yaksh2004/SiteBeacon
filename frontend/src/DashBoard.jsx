import { BeaconDetails } from "./Components/BeaconDetails";
import { BeaconCount } from "./Components/BeaconCount";
import { ResponseTimeAvg } from "./Components/ResponseTimeAvg";
import { ResponseTimeMax } from "./Components/ResponseTimeMax";

export function DashBoard() {
    return (
        <div className="m-5">
            <div className="flex justify-between items-center">
                <div className="text-3xl font-bold m-3">DashBoard</div>
                <button className="bg-gray-800 rounded-xl m-3 px-5 py-2 text-sm cursor-pointer hover:bg-black text-white">
                    +Add
                </button>
            </div>
            <div className="mx-3">Your watchtower for website reliability.</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-5">
                <BeaconCount />
                <ResponseTimeAvg />
                <ResponseTimeMax />
            </div>

            <div className="text-2xl font-bold m-3">Your Beacons</div>

            <div className="p-5">
                <BeaconDetails />    
            </div>
        </div>
    );
}
