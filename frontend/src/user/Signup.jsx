import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isProd = process.env.NODE_ENV === "production";

export default function Signup() {
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);

      if (isProd) {
        nav("/login");
      }
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="gap-6 flex flex-col items-center justify-center my-12"
    >
      <input name="name" type="text" placeholder="Dein Name" />
      <input name="lastname" type="text" placeholder="Dein Nachname" />
      <input name="email" type="text" placeholder="Deine Email" />
      <input name="password" type="password" placeholder="***********" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Signup</button>
    </form>
  );
}
