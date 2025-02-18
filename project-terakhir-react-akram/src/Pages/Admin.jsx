import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminPanel() {
  const navigate = useNavigate();
  function handleCreate() {
    navigate("/admin/create");
  }

  function handleRead() {
    navigate("/admin/read");
  }

  function handleUpdate() {
    const id = prompt("Insert User ID:");
    id ? navigate(`/admin/update/${id}`) : null;
  }

  function handleDelete() {
    const id = prompt("Insert User ID:");
    if (id) {
      axios
        .delete(`https://api.escuelajs.co/api/v1/users/${id}`)
        .then((response) => {
          alert("User deleted successfully!" + response.data);
          navigate("/admin");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to delete user.");
        });
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
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
      <div className="flex items-center mb-4">
        <img
          src="./public/logoShop.png"
          alt="logo"
          className="h-12 w-12 mr-4"
        />
      <h1 className="text-2xl font-bold">Admin Page</h1>
      </div>
      <div className="flex gap-x-4 mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
          onClick={handleCreate}
        >
          CREATE USER
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={handleRead}
        >
          READ USER
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer"
          onClick={handleUpdate}
        >
          UPDATE USER
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
          onClick={handleDelete}
        >
          DELETE USER
        </button>
      </div>
    </div>
  );
}

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      role: isAdmin ? "admin" : null,
      avatar: "https://i.imgur.com/LD004Qs.jpeg",
    };

    console.log(newUser);
    axios
      .post("https://api.escuelajs.co/api/v1/users/", newUser)
      .then((response) => {
        setMessage(`${name} created successfully! `);
        alert("User created successfully!" + response.data);
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
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Create User</h1>
      <form onSubmit={handleCreateUser}>
        <div className="flex flex-col gap-y-4 mt-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 border-2 rounded-lg"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border-2 rounded-lg"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border-2 rounded-lg"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className=""
            />
            <label htmlFor="isAdmin">Is Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer mt-4"
        >
          Create User
        </button>
      </form>
      <p className="text-center mt-4">{message && <p>{message}</p>}</p>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer mt-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

const UserProfile = (user) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={user.avatar} alt="" width="40px" height="40px" />
      <div>
        <div>id : {user.id}</div>
        <div>Name : {user.name}</div>
        <div>Email : {user.email}</div>
        <div>Role : {user.role}</div>
        <div>Pass : {user.password}</div>
      </div>
    </div>
  );
};

const ReadUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Read User</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer mt-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <UserProfile key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

const UpdateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://api.escuelajs.co/api/v1/users/${id}`, user)
      .then((response) => {
        console.log(response.data);
        alert("User updated successfully!");
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update user.");
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">Update User</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4 mt-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
            className="px-4 py-2 border-2 rounded-lg"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="px-4 py-2 border-2 rounded-lg"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="px-4 py-2 border-2 rounded-lg"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={user.role === "admin"}
              onChange={(e) => setUser({ ...user, role: e.target.checked ? "admin" : "customer" })}
              className=""
            />
            <label htmlFor="isAdmin">Is Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer mt-4"
        >
          Update User
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer mt-4"
          onClick={() => navigate("/admin")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export { AdminPanel, CreateUser, ReadUser, UpdateUser };


