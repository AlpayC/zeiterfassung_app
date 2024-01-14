import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";

export default function Login() {
  const { refetch } = useContext(UserContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      const response = await axios.post("/api/user/login", data);
      console.log(response.data.data._id);
      refetch();
      nav("/tracker");
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="gap-2 flex flex-row items-center justify-center"
    >
      <input name="email" type="email" placeholder="your email" />
      <input name="password" type="password" placeholder="***********" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Login</button>
    </form>
  );
}
