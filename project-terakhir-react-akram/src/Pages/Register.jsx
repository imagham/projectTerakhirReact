import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("cart") === null && localStorage.setItem("cart", "[]");
    const token = localStorage.getItem("token");
    token ? navigate("/") : null;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      role: isAdmin ? "admin" : null,
      avatar: "https://i.imgur.com/LD004Qs.jpeg",
      //   creationAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
    };

    // console.log(newUser);
    axios
      .post("https://api.escuelajs.co/api/v1/users/", newUser)
      .then((response) => {
        alert("User created successfully!" + response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });

    setName("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  return (
    <div className="w-full h-screen absolute">
      <img
        src="../public/bgAll.png"
        alt=""
        className="w-full h-screen object-center object-cover"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-[65%]">
        <button
          className="absolute top-5 right-5 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="text-4xl w-full font-black text-white text-center absolute -top-15 left-1/2 -translate-x-1/2">
          Hello, Welcome!
        </div>
        <div className="flex flex-col items-left bg-white rounded-2xl shadow-lg h-full py-10 px-10">
          <div className="mb-8">
            Sign up to <span className="font-bold">Shop.com</span>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <input
                type="text"
                placeholder="Username"
                className="mb-4 bg-gray-100 w-full p-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF4245]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="mb-4 bg-gray-100 w-full p-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF4245]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-6 bg-gray-100 w-full p-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF4245]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  className="mr-2"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="isAdmin" className="text-sm">
                  Is Admin
                </label>
              </div>
            </div>
            <button className="w-full py-3 bg-[#FF4245] text-white rounded-3xl hover:bg-opacity-90 transition duration-200 mb-2 cursor-pointer">
              Sign Up
            </button>
          </form>
          <div className="text-sm">
            {"Already have an account? "}
            <a href="/login" className="text-main underline cursor-pointer">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
