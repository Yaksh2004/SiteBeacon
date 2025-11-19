import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("userId", response.data.user.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <div className="p-15 flex flex-col justify-center w-fit shadow border border-gray-200 rounded-2xl">
        <div className="font-bold text-2xl mb-3">Login to your account!</div>

        <div className="font-semibold">Email:</div>
        <input
          type="email"
          placeholder="yaksh@gmail.com"
          className="w-full border border-gray-200 shadow rounded-md p-2 my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="font-semibold">Password:</div>
        <input
          type="password"
          placeholder="*********"
          className="w-full border border-gray-200 shadow rounded-md p-2 my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-gray-800 rounded-md w-full my-2 py-3 text-sm cursor-pointer hover:bg-black text-white"
        >
          Login
        </button>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="text-center font-semibold text-red-500 cursor-pointer hover:text-red-600">
          Forgot password?
        </div>

        <div className="text-center">
          Don't have an account?{" "}
          <span
            className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={goToSignUp}
          >
            SignUp
          </span>
        </div>
      </div>
    </div>
  );
}
