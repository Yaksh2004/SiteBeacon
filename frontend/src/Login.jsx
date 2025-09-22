import { useNavigate } from "react-router-dom"

export function Login() {

    const navigate = useNavigate();
    const goToSignUp = () => {
        navigate("/signup")
    }

    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <div className="p-15 flex flex-col justify-center w-fit shadow border border-gray-200 rounded-2xl">
                <div className="font-bold text-2xl mb-3">Login to your account!</div>
                <div className="font-semibold">Email:</div>
                <input type="email" placeholder="yaksh@gmail.com" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
                <div className="font-semibold">Passsword:</div>
                <input type="password" placeholder="*********" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
                <button className="bg-gray-800 rounded-md w-full my-2 py-3 text-sm cursor-pointer hover:bg-black text-white ">Login</button>
                <div className="text-center font-semibold text-red-500 cursor-pointer hover:text-red-600">Forgot password?</div>
                <div className="text-center">Don't have an account? <span className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer" onClick={goToSignUp}>SignUp</span></div>
            </div>
        </div>
    )
}