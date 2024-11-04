import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import { BsBuildingFillAdd } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation().pathname;


  function isActive() {
    return (
      <div className="w-[5px] h-10 bg-blue-500 absolute right-0 top-0 rounded-md"></div>
    );
  }

  return (
    <div className="w-full md:w-[15%] h-[10] md:h-[90vh] overflow-y-scroll overflow-x-hidden hideScrollBar">
      <ul>
        <li
          className={`flex justify-start gap-3 items-center py-2 px-5 ${
            location === "/dashboard"
              ? "text-blue-400 bg-blue-200/30"
              : "text-gray-400"
          } relative cursor-pointer`}
          onClick={() => navigate("/dashboard")}
        >
          <IoMdHome size={20} />
          <p className="font-semibold w-full truncate">Dashboard</p>
          {location === "/dashboard" && isActive()}
        </li>
        <li
          className={`flex justify-start gap-3 items-center py-2 px-5 ${
            location === "/employees"
              ? "text-blue-400 bg-blue-200/30"
              : "text-gray-400"
          } relative cursor-pointer`}
          onClick={() => navigate("/employees")}
        >
          <FaUsers size={20} />
          <p className="font-semibold  w-full truncate">Employees</p>
          {location === "/employees" && isActive()}
        </li>
        <li
          className={`flex justify-start gap-3 items-center py-2 px-5 ${
            location === "/companies"
              ? "text-blue-400 bg-blue-200/30"
              : "text-gray-400"
          } relative cursor-pointer`}
          onClick={() => navigate("/companies")}
        >
          <BsBuildingsFill size={18} />
          <p className="font-semibold  w-full truncate">Companies</p>
          {location === "/companies" && isActive()}
        </li>
        <li
          className={`flex justify-start gap-3 items-center py-2 px-5 ${
            location === "/add-employee"
              ? "text-blue-400 bg-blue-200/30"
              : "text-gray-400"
          } relative cursor-pointer`}
          onClick={() => navigate("/add-employee")}
        >
          <HiUserAdd size={18} />
          <p className="font-semibold  w-full truncate">Add Employee</p>
          {location === "/add-employee" && isActive()}
        </li>
        <li
          className={`flex justify-start gap-3 items-center py-2 px-5 ${
            location === "/add-company"
              ? "text-blue-400 bg-blue-200/30"
              : "text-gray-400"
          } relative cursor-pointer`}
          onClick={() => navigate("/add-company")}
        >
          <BsBuildingFillAdd size={18} />
          <p className="font-semibold  w-full truncate"> Add Companies</p>
          {location === "/add-company" && isActive()}
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
