import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate("/")
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className="flex justify-between items-center px-5 shadow-md p-2">
            <h1 className="text-2xl m-2 font-bold cursor-pointer" onClick={backToHome}>SiteBeacon</h1>
            {isLoggedIn? <h1 className="text-xl text-gray-600 p-0.5 font-semibold rounded-full border-1 border-gray-300 shadow-md h-9 w-9 cursor-pointer text-center ">Y</h1> : <h1 className="text-l font-semibold cursor-pointer text-center hover:text-gray-600">Login</h1>}
        </div>
    );
}