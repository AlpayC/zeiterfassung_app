import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputFieldSignup from "../components/ui/inputFields/InputFieldSignup";
import Popup from "../components/Popup";
import FormButton from "../components/ui/buttons/FormButton";

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
      <InputFieldSignup name={"name"} type={"text"} placeholder={"Dein Name"} />
      <InputFieldSignup
        name={"lastname"}
        type={"text"}
        placeholder={"Dein Nachname"}
      />
      <InputFieldSignup
        name={"email"}
        type={"email"}
        placeholder={"Deine Email"}
      />
      <InputFieldSignup
        name={"password"}
        type={"password"}
        placeholder={"***********"}
      />

      {error && (
        <Popup
          errorDescription={error}
          messageType={"error"}
          title={"Registrierung"}
        />
      )}
      <FormButton label={"Signup"} type={"submit"} />
    </form>
  );
}
