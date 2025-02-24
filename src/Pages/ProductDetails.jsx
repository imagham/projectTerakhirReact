import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, Rating } from "../Components/Product";
import axios from "axios";
import { motion } from "framer-motion";

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const bigNumber = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const decimalNumber = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleAddCart = () => {
    const cart = localStorage.getItem("cart");
    const newProduct = { ...product, quantity: 1 };
    let parsedCart = JSON.parse(cart);
    const existingProductIndex = parsedCart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      parsedCart[existingProductIndex].quantity += 1;
    } else {
      parsedCart.push(newProduct);
    }
    
    const newCart = parsedCart;

    localStorage.setItem("cart", JSON.stringify(newCart));
    navigate("/cart");
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log("Product Data Successfully Fetched");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgb(255, 66, 69)",
      transition: {
        yoyo: Infinity,
      },
    },
  };

  if (!product) return <p>Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      className="w-full h-screen absolute"
    >
      <img
        src="/bgAll.png"
        alt=""
        className="w-full h-screen object-center object-cover"
      />
      <motion.div
        initial={{ y: "-100%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: "100%", opacity: 0, scale: 0.5 }}
        transition={transition}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%]"
      >
        <motion.button
          className="absolute top-5 left-5 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="product-detail flex flex-row items-center bg-white rounded-2xl shadow-lg h-full"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-1/2 h-full object-contain mb-6 p-12"
          />
          <div className="flex flex-col w-1/2 py-20 pr-10 ">
            <Category category={product.category} />
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className={`price flex flex-row items-start gap-1`}>
              <p className="text-sm pt-1">$</p>
              <p className="text-3xl font-semibold tracking-wider">
                {bigNumber.format(product.price)}
              </p>
              <p className="text-sm pt-1">
                {decimalNumber.format(product.price % 1).replace(0, "")}
              </p>
            </div>
            <Rating rating={product.rating} />
            <p className="text-gray-700 mb-4 h-36 overflow-scroll overflow-x-hidden" style={{ scrollbarWidth: "none" }} >{product.description}</p>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(255, 66, 69, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#FF4245] text-white px-4 py-2 rounded-lg hover:bg-[#FF3737] cursor-pointer w-[40%]"
              onClick={handleAddCart}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export { ProductDetails };

