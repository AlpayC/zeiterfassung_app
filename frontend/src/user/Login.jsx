import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/inputFields/InputFieldLogin";
import { UserContext } from "./UserContext";
import FormButton from "../components/ui/buttons/FormButton";
import Popup from "../components/Popup";

export default function Login() {
  const { refetch } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data));
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
      <InputField name="email" type="email" placeholder="Deine Email" />
      <InputField name="password" type="password" placeholder="***********" />

      <FormButton label={"Login"} type={"submit"} />
      {error && (
        <Popup errorDescription={error} messageType={"error"} title={"Login"} />
      )}
    </form>
  );
}
