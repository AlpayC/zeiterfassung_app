import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";

export default function Login() {
  const { refetch } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/login", data);
      refetch();
      navigate("/tracker");
    } catch (e) {
      // console.log(e);
      setError(
        `${e.response?.data.message}: ${e.response?.data.error.message}`
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="gap-6 flex flex-col items-center justify-center my-12"
    >
      <input name="email" type="email" placeholder="Deine Email" />
      <input name="password" type="password" placeholder="***********" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Login</button>
    </form>
  );
}
