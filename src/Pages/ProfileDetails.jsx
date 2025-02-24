import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      axios
        .get(`https://api.escuelajs.co/api/v1/users/${decode.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
        });
    }
  }, []);

  return (
    <motion.div
      className="w-full h-screen absolute"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img
        src="/bgAll.png"
        alt=""
        className="w-full h-screen object-center object-cover"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[70%]">
        <button
          className="absolute top-5 left-5 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer"
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
        <motion.div
          className="flex flex-col items-center bg-white rounded-2xl shadow-lg h-full py-10"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={profile.avatar}
            alt=""
            className="h-50 w-50 object-cover rounded-full"
          />
          <div className="flex flex-col items-center mt-10 gap-2 justify-between h-full">
            <div className="text-center">
              <p className="text-2xl font-bold">{profile.name}</p>
              <p className="text-sm text-gray-500">Email: {profile.email}</p>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-sm text-gray-500">
                You are {profile.role === "admin" ? "an" : "a"}{" "}
                <span className="capitalize">{profile.role}</span>
              </p>
              {profile.role === "admin" && (
                <button
                  className="bg-[#FF4245] text-white py-2 px-4 rounded-lg cursor-pointer"
                  onClick={() => navigate("/admin")}
                >
                  Admin Page
                </button>
              )}
              <button
                className="bg-gray-200 text-black py-2 px-4 rounded-lg cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

