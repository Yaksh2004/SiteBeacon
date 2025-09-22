export function BeaconDetails() {
    return (
        <div className="flex flex-col flex-1 min-w-[250px] max-w-sm p-8 shadow-md justify-center items-start border-1 border-gray-300 rounded-xl ">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl font-bold">Beacon Name</h1>
                <div className="text-white text-xs py-0.5 font-semibold bg-green-600 px-3 rounded-2xl">Online</div>
            </div>
            <div className="text-gray-500 line-clamp-1">Beacon url</div>
            <div className="flex justify-between items-center w-full">
                <div className="text-gray-500 ">Response Time</div>
                <div className=" font-semibold text-green-500">230ms</div>
            </div>
            <hr className="border w-full border-gray-300 my-2" />
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <div className="text-gray-700">Central India</div>
                    <div>✅200</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-gray-700">West Europe</div>
                    <div>✅200</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-gray-700">East US</div>
                    <div>✅200</div>
                </div>
            </div>
            <button className="w-full text-sm hover:text-white hover:bg-red-500 cursor-pointer font-semibold border-gray-200 border-1 p-2 mt-3 rounded-lg transition-all">Delete</button>
        </div>
    );
}