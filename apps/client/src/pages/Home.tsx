import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col text-center justify-center w-full p-24">
      <div className="flex justify-end">
        <button
          className="flex items-center justify-center fill-btn btn-large disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
          type="button"
					onClick={() => logout()}
       
        >
          LogOut <FaSignOutAlt className="ml-2" />
        </button>
      </div>
      <h1>Easy Generators</h1>
      <h2>Welcome to the application.</h2>
    </div>
  );
}

export default Home;
