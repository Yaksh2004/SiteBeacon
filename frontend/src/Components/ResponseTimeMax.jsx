export function ResponseTimeMax() {
    return (
        <div className="flex flex-col flex-1 min-w-[250px] py-8 pl-8 shadow-md justify-center items-start border-1 border-gray-300 rounded-xl ">
            <h1 className="text-2xl font-bold">Response Time(Max)</h1>
            <div className="text-gray-500">Highest across all beacons</div>
            <div className="text-2xl font-bold text-green-500">268ms</div>
        </div>
    );
}