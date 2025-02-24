import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ProductDetails } from "./Pages/ProductDetails";
import { Cart } from "./Pages/Cart";
import { Profile } from "./Pages/ProfileDetails";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { AdminPanel, ReadUser, CreateUser, UpdateUser } from "./Pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "/admin/read",
    element: <ReadUser />,
  },
  {
    path: "/admin/create",
    element: <CreateUser />,
  },
  {
    path: "/admin/update/:id",
    element: <UpdateUser />,
  },

]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
