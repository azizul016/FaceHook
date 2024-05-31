import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token?.token;
          const refreshToken = token?.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/me");
        }
      }
    } catch (error) {
      console.log(error, "erros");
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors?.email}>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          className={`auth-input ${
            errors?.email ? "border-red-500" : "border-grey-200"
          }`}
          type="email"
          id="email"
          name="email"
        />
      </Field>{" "}
      <Field label="Password" error={errors?.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            errors?.password ? "border-red-500" : "border-grey-200"
          }`}
          type="password"
          id="password"
          name="password"
        />
      </Field>
      <Field>
        <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
