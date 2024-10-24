import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { AxiosError } from "axios";
import { FaCircleUser, FaLock, FaPaperPlane } from "react-icons/fa6";
import Alert from "./Alert";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  const { email, password, error } = state;
	console.log({email, password, error})
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
      error: "",
    });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
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
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold text-pastelBlue">Login</h2>
      </div>
			{error && <Alert text={error} />}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4">
        <div className="join bg-primary shadow-2xl p-2 flex items-center">
          <label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
            <FaCircleUser/>
          </label>
          <input
            type="email"
            className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
            placeholder="email"
						name="email"
						onChange={handleChange}
          />
        </div>
        <div className="join bg-primary shadow-2xl p-2 flex items-center">
          <label className="px-3 py-1 text-lg join-item text-pastelBlue border-r border-r-slate-400">
            <FaLock/>
          </label>
          <input
            type="password"
            className="px-3 py-2 w-full text-sm join-item outline-none bg-transparent"
            placeholder="Enter Password"
						name="password"
						onChange={handleChange}
          />
        </div>
        <div className=" py-4 flex flex-row gap-3 items-center justify-between">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-error" />
              <span className="sm:text-sm text-pastelBlue pl-2">
                Remember me
              </span>
            </label>
          </div>
          <div>
            <a className="sm:text-sm hover:text-acent" href="/register">
              Register
            </a>
          </div>
        </div>
        <button className="flex items-center justify-center fill-btn btn-large disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed" type="submit" disabled={!email || !password}>
          
            Login <FaPaperPlane className="ml-2"/>
          
        </button>
      </form>
    </div>
  );
}

export default Login;
