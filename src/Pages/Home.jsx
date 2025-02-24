/* eslint-disable react/prop-types */
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductList } from "../Components/Product";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const Home = () => {
  useEffect(() => {
    localStorage.getItem("cart") === null && localStorage.setItem("cart", "[]");
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      <div className="container mx-auto pt-6 px-16">
        <Nav />
        <Hero />
        <ProductList />
      </div>
    </motion.div>
  );
};

const Nav = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      // setProfile(decode);
      axios
        .get(`https://api.escuelajs.co/api/v1/users/${decode.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setProfile(response.data);
        });
    }
  }, []);

  return (
    <div>
      <nav className="flex justify-between gap-16 w-full h-12 mb-10">
        <img src="logoShop.png" alt="" className="h-full" />
        <div className="flex flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="h-full border-none bg-gray-100 rounded-l-lg py-2.5 px-4 w-full"
          />
          <button className="py-2 px-4 h-full bg-[#FF4245] rounded-r-lg cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        {token ? (
          <div
            className="profile flex justify-center items-center p-2 hover:bg-gray-100"
            onClick={() => navigate("/profile")}
          >
            <img
              src={profile.avatar}
              alt=""
              className="rounded-full h-10 w-10"
            />
            <div className="flex flex-col mx-3">
              <span className="font-bold">Hello, {profile.name}</span>
              <span className="text-xs">Account Details</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white hover:bg-gray-100 text-[#FF4245] font-semibold py-2 px-4 border border-[#FF4245] rounded-full"
            onClick={() => navigate("/login")}
          >
            Sign in
          </motion.button>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="cart h-full hover:bg-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#FF4245"
          onClick={() => navigate("/cart")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
          <circle cx="20" cy="7" r="2" fill="black" strokeWidth={0} />
        </svg>
      </nav>
    </div>
  );
};

const Hero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      <div className="flex flex-col relative mb-10 h-80">
        <div className="w-full h-full">
          <img
            src="head.png"
            alt=""
            className="w-full h-full rounded-4xl object-center object-cover"
          />
        </div>
        <div className="w-auto flex flex-col justify-center items-start">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#FF4245] text-xl flex flex-col items-center gap-3">
            <p className="text-5xl text-white font-bold">Welcome to Shop</p>
            Shop the Home store
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { Home };


