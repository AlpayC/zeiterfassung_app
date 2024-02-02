import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/inputFields/InputFieldLogin";
import { UserContext } from "./UserContext";
import FormButton from "../components/ui/buttons/FormButton";
import { AlertContext } from "../context/AlertContext";

export default function Login() {
  const { refetch } = useContext(UserContext);
  const { showAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/login", data);
      showAlert("super", "alert-success", 3000);
      setTimeout(() => {
        refetch();
        navigate("/dashboard");
      }, 2200);
    } catch (e) {
      showAlert(
        `${e.response?.data.message}: ${e.response?.data.error.message}`,
        "alert-error",
        4000
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="gap-6 flex flex-col items-center justify-center my-12"
      noValidate
    >
      <InputField name="email" type="email" placeholder="Deine Email" />
      <InputField name="password" type="password" placeholder="***********" />

      <FormButton label={"Login"} type={"submit"} />
    </form>
  );
}
