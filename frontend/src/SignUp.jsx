import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login")
    }

    const handleSignup = async () => {
        try {
        const response = await axios.post("http://localhost:3000/user/signup", {
            name,
            email,
            password,
        });
        
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Something went wrong");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <div className="p-15 flex flex-col justify-center w-fit shadow border border-gray-200 rounded-2xl">
                <div className="font-bold text-2xl mb-3">Create your new account!</div>
                <div className="font-semibold">Name:</div>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="yaksh" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
                <div className="font-semibold">Email:</div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yaksh@gmail.com" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
                <div className="font-semibold">Passsword:</div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" className="w-full border border-gray-200 shadow rounded-md p-2 my-2" />
                <button onClick={handleSignup} className="bg-gray-800 rounded-md w-full my-2 py-3 text-sm cursor-pointer hover:bg-black text-white ">SignUp</button>
                <div className="text-center mt-2">Already have an account? <span className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer" onClick={goToLogin}>Login</span></div>
            </div>
        </div>
    )
}