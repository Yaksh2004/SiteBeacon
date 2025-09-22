export function LoginPop() {
    return (
        <div className="m-10 flex flex-col p-3 shadow-md rounded-xl bg-gray-100 w-fit"> 
            <div className="text-md font-semibold ">Login: Yaksh</div>
            <hr className="border w-full border-gray-200 my-2" />
            <div className="text-md font-semibold">Email: gargyaksh4@gmail.com</div>
            <hr className="border w-full border-gray-200 my-2" />
            <button className="w-full text-sm hover:text-white hover:bg-red-500 cursor-pointer font-semibold border-gray-300 border p-2 mt-3 rounded-lg transition-all bg-white">Signout</button>
        </div>
    )
}