import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { userLogout } from "../Services/apiServices";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="w-full h-16 flex justify-between items-center px-5 md:px-10 shadow-md">
      <div>
        <img src={Logo} alt="logo" className="w-24 md:w-36" />
      </div>
      <div>
        {location === "/" ? (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 border rounded-md border-gray-500 bg-blue-500 text-white"
          >
            Login
          </button>
        ) : (
          <button
            onClick={()=>userLogout(navigate)}
            className="px-3 py-1 border rounded-md border-gray-500 bg-blue-500 text-white"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
