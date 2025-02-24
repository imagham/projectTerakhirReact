/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Cart = () => {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-row items-center gap-2">
        <button
          className="bg-white p-2 hover:bg-gray-100 cursor-pointer"
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
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cart w-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#FF4245"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
            <circle cx="20" cy="7" r="2" fill="black" strokeWidth={0} />
          </svg>
        </span>

        <span>Your Cart</span>
      </div>
      <div>
        {cartProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="flex flex-row justify-start mt-5 gap-10 pl-5">
        <span className="font-bold">Total</span>
        <span className="font-bold">
          $
          {cartProducts
            .reduce((total, product) => {
              return total + product.price * product.quantity;
            }, 0)
            .toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

const Product = ({ product }) => {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  const setCartProducts = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };

  const handleDelete = () => {
    const newCart = [...cartProducts];
    const existingProductIndex = newCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex > -1) {
      if (newCart[existingProductIndex].quantity > 1) {
        newCart[existingProductIndex].quantity -= 1;
      } else {
        newCart.splice(existingProductIndex, 1);
      }
    }
    setCartProducts(newCart);
  };

  const handleAdd = () => {
    const newCart = [...cartProducts];
    const existingProductIndex = newCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex > -1) {
      newCart[existingProductIndex].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCartProducts(newCart);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border-b border-gray-200 last:border-b-0 p-5 flex flex-row justify-between"
    >
      <div className="flex flex-row items-center gap-2">
        <img
          src={product.image}
          alt=""
          className="w-10 h-10 object-contain rounded-lg"
        />
        <div className="flex flex-col w-full">
          <span className="font-bold text-lg">{product.title}</span>
          <span className="text-sm text-gray-500">
            Quantity: {product.quantity}
          </span>
          <span className="text-sm text-gray-500">
            Price : ${product.price} x {product.quantity} = $
            {product.price * product.quantity}
          </span>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover="hover"
              className="relative"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                variants={{
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute -left-10 bottom-0 text-sm bg-white p-1 rounded shadow-lg"
              >
                Add
              </motion.span>
              <motion.button
                onClick={handleAdd}
                className="bg-[#FF4245] text-white px-3 py-1 rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover="hover"
              className="relative"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                variants={{
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute -left-16 bottom-0 text-sm bg-white p-1 rounded shadow-lg"
              >
                Remove
              </motion.span>
              <motion.button
                onClick={handleDelete}
                className="bg-[#FF4245] text-white px-3 py-1 rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 13H5v-2h14v2z"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
