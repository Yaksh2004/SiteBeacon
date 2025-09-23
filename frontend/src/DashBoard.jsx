import { BeaconDetails } from "./Components/BeaconDetails";
import { BeaconCount } from "./Components/BeaconCount";
import { ResponseTimeAvg } from "./Components/ResponseTimeAvg";
import { ResponseTimeMax } from "./Components/ResponseTimeMax";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";

export function DashBoard() {
    const [beacons, setBeacons] = useState([]);

    const navigate = useNavigate();
    const goToAddBeacon = () => {
        navigate("/add-beacon");
    };
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

    useEffect(() => {
      const fetchBeacons = async () => {
        try {
            const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/jobs", {
            headers: { Authorization: `${token}` },
          });
          setBeacons(response.data.beacons);
        } catch (error) {
          console.error(error);
        }
      };

      fetchBeacons();
    }, []);

    const findAvgTime = (beacons) => {
        let totalDuration = 0;
        beacons.forEach(beacon => {
            totalDuration += beacon.lastDuration;
        });
        return parseFloat((totalDuration / beacons.length).toFixed(2));
    }
    const findMaxTime = (beacons) => {
        let maxDuration = 0;
        beacons.forEach(beacon => {
            if (beacon.lastDuration > maxDuration) {
                maxDuration = beacon.lastDuration;
            }
        });
        return parseFloat(maxDuration.toFixed(2));
    }

    const [avgTime, setAvgTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);

    useEffect(() => {
        if (beacons.length > 0) {
            const avg = findAvgTime(beacons);
            const max = findMaxTime(beacons);
            setAvgTime(avg);
            setMaxTime(max);
        } else {
            setAvgTime(0);
            setMaxTime(0);
        }
    }, [beacons]);


    const handleDeleteBeacon = (beaconId) => {
        setBeacons(prev => prev.filter(b => b._id !== beaconId));
    };

    const refreshBeacons = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/jobsRefresh", {
            headers: { Authorization: `${token}` },
            });
            
            setBeacons(response.data.beacons); // update state with new data
        } catch (error) {
            console.error("Failed to refresh beacons", error);
        }
    };



    return (
        <div className="m-5">
            <div className="flex justify-between items-center">
                <div className="text-3xl font-bold m-3">DashBoard</div>
                <button onClick={goToAddBeacon} className="bg-gray-800 rounded-xl m-3 px-5 py-2 text-sm cursor-pointer hover:bg-black text-white">
                    +Add
                </button>
            </div>
            <div className="mx-3">Your watchtower for website reliability.</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-5">
                <BeaconCount count={beacons.length} />
                <ResponseTimeAvg avgTime={avgTime} />
                <ResponseTimeMax maxTime={maxTime} />
            </div>

            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold m-3">Your Beacons</div>
                <button onClick={refreshBeacons} className="bg-blue-600 text-sm text-white px-4 py-2 rounded-xl hover:bg-blue-800 cursor-pointer">Refresh All</button>
            </div>

            <div className="p-5 flex flex-wrap gap-10">
                {beacons.map((beacon) => (
                    <BeaconDetails key={beacon._id} beacon={beacon} updateDelete={handleDeleteBeacon} />
                ))}
            </div>
        </div>
    );
}
