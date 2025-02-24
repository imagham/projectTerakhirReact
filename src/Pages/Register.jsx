import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      role: isAdmin ? "admin" : null,
      avatar: "https://i.imgur.com/LD004Qs.jpeg",
    };

    axios
      .post("https://api.escuelajs.co/api/v1/users/", newUser)
      .then((response) => {
        alert("User created successfully! " + response.data);
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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      delay: 0.5,

      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgb(255, 66, 69)",
      transition: {
        yoyo: Infinity,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full h-screen absolute">
      <motion.img
        src="/bgAll.png"
        alt=""
        className="w-full h-screen object-center object-cover"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-[65%]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="absolute top-5 right-5 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer z-50"
          onClick={() => navigate("/")}
          variants={buttonVariants}
          whileHover="hover"
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
        </motion.button>
        <motion.div
          className="text-4xl w-full font-black text-white text-center absolute -top-15 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Hello, Welcome!
        </motion.div>
        <motion.div
          className="flex flex-col items-left bg-white rounded-2xl shadow-lg h-full py-10 px-10"
          variants={itemVariants}
        >
          <div className="mb-8">
            Sign up to <span className="font-bold">Shop.com</span>
          </div>
          <motion.form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <motion.input
                type="text"
                placeholder="Username"
                className="mb-4 bg-gray-100 w-full p-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF4245]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variants={inputVariants}
              />
              <motion.input
                type="email"
                placeholder="Email"
                className="mb-4 bg-gray-100 w-full p-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF4245]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variants={inputVariants}
              />
              <motion.input
                type="password"
                placeholder="Password"
                className="mb-6 bg-gray-100 w-full p-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF4245]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variants={inputVariants}
              />
              <motion.div
                className="flex items-center"
                variants={inputVariants}
              >
                <motion.input
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
              </motion.div>
            </motion.div>
            <motion.button
              className="w-full py-3 bg-[#FF4245] text-white rounded-3xl hover:bg-opacity-90 transition duration-200 mb-2 cursor-pointer"
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 8px rgb(255, 66, 69)",
              }}
              type="submit"
            >
              Sign Up
            </motion.button>
          </motion.form>
          <div className="text-sm">
            {"Already have an account? "}
            <a href="/login" className="text-main underline cursor-pointer">
              Sign In
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
