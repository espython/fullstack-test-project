import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import {
  FaCircleUser,
  FaLock,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa6";
import Alert from "./Alert";
import { useAuth } from "../context/useAuth.tsx";
import MainBtn from "./MainBtn.tsx";

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const navigate = useNavigate();
  const { register } = useAuth();
  const { name, email, password, error } = state;

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      error: "",
    }));
    if (!validatePassword(state.password)) {
      setState((prevState) => ({
        ...prevState,
        error:
          "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
      }));
      return;
    }

    try {
      await register(state.name, state.email, state.password);

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setState(() => ({
          ...state,
          error: error.response?.data?.message || error.message,
        }));
      } else {
        setState(() => ({
          ...state,
          error: "An unknown error occurred",
        }));
      }
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold text-pastelBlue">Register</h2>
      </div>
      {error && <Alert text={error} />}
      <form
        className="w-full flex flex-col gap-3 sm:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="join bg-primary shadow-2xl py-2 flex items-center">
          <label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
            <FaCircleUser />
          </label>
          <input
            type="text"
            className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="join bg-primary shadow-2xl py-2 flex items-center">
          <label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
            <FaEnvelope />
          </label>
          <input
            type="email"
            className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="join bg-primary shadow-2xl py-2 flex items-center">
          <label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
            <FaLock />
          </label>
          <input
            type="password"
            className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-3 items-center justify-between py-2">
          <div>
            <p className="sm:text-sm">
              By creating an account, you agree and accept our{" "}
              <a className="underline hover:text-acent" href="#">
                Terms
              </a>{" "}
              and{" "}
              <a className="underline hover:text-acent" href="#">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex items-center ">
          <p>Already have an account?</p>
          <a className="sm:text-sm hover:text-acent ml-2" href="/login">
            Login
          </a>
        </div>
        <MainBtn type="submit" disabled={!name || !email || !password}>
          Sign Up <FaPaperPlane className="ml-2" />
        </MainBtn>
      </form>
    </div>
  );
}

export default SignUp;
