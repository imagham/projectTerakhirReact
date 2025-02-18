/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        console.log("Product Data Successfully Fetched");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (products.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className="product-list flex flex-row gap-2 flex-wrap justify-between w-[90vw] mx-auto">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};



const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product flex flex-col w-[250px] p-5 h-fit hover:bg-gray-100 hover:scale-105 hover:z-50 hover:shadow-xl cursor-pointer rounded-xl"
    >
      <img
        src={product.image}
        alt=""
        className="image-product w-50 h-[266px] object-contain p-5"
      />
      <Category category={product.category} />
      <Rating rating={product.rating} />
      <div className="line-clamp-2 leading-tight mb-5 font-medium">
        {product.title}
      </div>
      <Price price={product.price} />
    </div>
  );
};

const Price = ({ price }) => {
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
//   console.log(bigNumber.format(price));
  return (
    <div className={`price flex flex-row items-start gap-1`}>
      <p className="text-sm pt-1">$</p>
      <p className="text-3xl font-semibold tracking-wider">
        {bigNumber.format(price)}
      </p>
      <p className="text-sm pt-1">
        {decimalNumber.format(price % 1).replace(0, "")}
      </p>
    </div>
  );
};

const StarSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5   text-[#FF4245]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

const Category = ({ category }) => {
  return (
    <div className="category flex flex-row mt-3 items-center gap-1 mb-1 -ml-1">
      <svg
        className="rounded-sm p-2 rotate-45 w-7 h-7"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="10" fill="#FF4245" />
      </svg>
      <p className="font-bold text-[#FF4245] text-sm capitalize">{category}</p>
    </div>
  );
};

const Rating = ({ rating }) => {
  return (
    <div className="rating flex flex-row mt-1 items-center gap-1">
      <div className="stars flex flex-row">
        {[...Array(Math.floor(rating.rate))].map((_, i) => (
          <StarSvg key={i} />
        ))}
      </div>
      <div className="flex flex-row gap-1">
        <p className="text-sm">{rating.rate}</p>
        <p className="text-xs text-gray-600">{rating.count} ratings</p>
      </div>
    </div>
  );
};

export { Rating, Category, StarSvg }