import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    // console.log(formData);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="FirstName" error={errors?.firstName}>
        <input
          {...register("firstName", {
            required: "FirstName is required",
          })}
          className={`auth-input ${
            errors?.firstName ? "border-red-500" : "border-grey-200"
          }`}
          type="firstName"
          id="firstName"
          name="firstName"
        />
      </Field>
      <Field label="LastName" error={errors?.lastName}>
        <input
          {...register("lastName", {
            required: "LastName is required",
          })}
          className={`auth-input ${
            errors?.lastName ? "border-red-500" : "border-grey-200"
          }`}
          type="lastName"
          id="lastName"
          name="lastName"
        />
      </Field>
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
      </Field>
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
          Register
        </button>
      </Field>
    </form>
  );
};

export default RegistrationForm;
