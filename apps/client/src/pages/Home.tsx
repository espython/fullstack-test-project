import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/useAuth.tsx";
import MainBtn from "../components/MainBtn.tsx";

function Home() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col text-center justify-center w-full p-24">
      <div className="flex justify-end">
        <MainBtn type="button" onClick={() => logout()}>
          LogOut <FaSignOutAlt className="ml-2" />
        </MainBtn>
      </div>

      <h2 className="text-3xl">Welcome to the application.</h2>
    </div>
  );
}

export default Home;
