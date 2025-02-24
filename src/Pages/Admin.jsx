import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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

  function handleDeleteAll() {
    const areYouSure = window.confirm("Are you want to proceed?");
    if (!areYouSure) return;
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          axios
            .delete(`https://api.escuelajs.co/api/v1/users/${response.data[i].id}`)
            .then((res) => console.log(res.data));
        }
        alert("All users deleted successfully!");
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete all users.");
      });
  }

  function handleChangeAll() {
    const areYouSure = window.confirm("Are you want to proceed?");
    if (!areYouSure) return;
    axios
      .get("https://api.escuelajs.co/api/v1/users")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          axios
            .put(`https://api.escuelajs.co/api/v1/users/${response.data[i].id}`, {
              name: "Corrupted User",
              email: "corrupted@example.com",
              password: "corruptedpassword",
              avatar: "https://i.imgur.com/LD004Qs.jpeg"
            })
            .then((res) => console.log(res.data));
        }
        alert("All users have been corrupted!");
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to change all user names.");
      });
  }

  function handleCreate10 () {
    const quantity = prompt("Insert quantity:");
    for (let i = 0; i < quantity; i++) {
      const randomName = `User${Math.floor(Math.random() * 10000)}`;
      const randomEmail = `${randomName}${Math.floor(Math.random() * 10000)}@example.com`;
      const randomPassword = Math.random().toString(36).slice(-8);
      const randomAvatar = `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`;
      axios
        .post("https://api.escuelajs.co/api/v1/users/", {
          name: randomName,
          email: randomEmail,
          password: randomPassword,
          avatar: randomAvatar
        })
        .then((response) => {
          console.log(response.data);
          // alert({quantity} + " users created successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <motion.button
        className="absolute top-5 right-5 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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
      <div className="flex items-center mb-4">
        <motion.img
          src="/logoShop.png"
          alt="logo"
          className="h-12 w-12 mr-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <h1 className="text-2xl font-bold">Admin Page</h1>
      </div>
      <div className="flex gap-x-4 mt-4">
        <motion.button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
          onClick={handleCreate}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          CREATE USER
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={handleRead}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          READ USER
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer"
          onClick={handleUpdate}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          UPDATE USER
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          DELETE USER
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
          onClick={handleDeleteAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          DELETE ALL USER
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
          onClick={handleChangeAll}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          CORRUPT ALL USER
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
          onClick={handleCreate10}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          CREATE BUNCH USER
        </motion.button>
        
      </div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold">Create User</h1>
      <motion.form onSubmit={handleCreateUser} initial={{ x: -200 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
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
        <motion.button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Create User
        </motion.button>
      </motion.form>
      <p className="text-center mt-4">{message && <p>{message}</p>}</p>
      <motion.button
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer mt-4"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back
      </motion.button>
    </motion.div>
  );
}


const UserProfile = (user) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-lg flex items-center space-x-6"
    >
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-full object-cover rounded-l-3xl border-2 border-gray-200"
      />
      <div className="text-gray-800 p-6">
        <div className="text-lg font-semibold">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
        <div className="text-sm text-gray-500">Role: {user.role}</div>
        <div className="text-sm text-gray-500">ID: {user.id}</div>
        <div className="text-sm text-gray-500">Password: {user.password}</div>
      </div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold">Read User</h1>
      <motion.button
        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer mt-4"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back
      </motion.button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <UserProfile key={user.id} {...user} />
        ))}
      </div>
    </motion.div>
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
  }, [id]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold">Update User</h1>
      <motion.form onSubmit={handleSubmit} initial={{ x: 200 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
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
        <motion.button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer mt-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Update User
        </motion.button>
        <motion.button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer mt-4"
          onClick={() => navigate("/admin")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Back
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export { AdminPanel, CreateUser, ReadUser, UpdateUser };
