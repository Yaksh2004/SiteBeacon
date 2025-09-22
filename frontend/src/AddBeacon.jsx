export function AddBeacon() {
    return (<div className="p-10 flex flex-col shadow m-5 border border-gray-200 rounded-2xl">
        <div className="text-4xl font-semibold">Create a new beacon:</div>
        <div className="text-sm text-gray-600 mb-3">Add a new endpoint to monitor its uptime and performance</div>
        <div className="font-semibold">Beacon Name:</div>
        <input type="text" placeholder="My Project" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
        <div className="font-semibold">URL:</div>
        <input type="text" placeholder="https://www.my-project.com" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
        <div className="flex flex-col gap-2 sm:flex-row mt-3">
            <button className="bg-gray-800 w-full rounded-md my-2 py-3 text-sm cursor-pointer hover:bg-black text-white shadow">Add</button>
            <button className="bg-white w-full rounded-md my-2 py-3 text-sm cursor-pointer hover:bg-gray-100 font-semibold shadow text-black">Cancel</button>
        </div>
    </div>)
}