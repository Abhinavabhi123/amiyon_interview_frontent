import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { getDashboardData } from "../Services/apiServices";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  useState(() => {
    getDashboardData(setDashboardData);
  }, []);


  return (
    <div className="w-screen h-dvh max-w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-dvh flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-[85%] h-full">
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  px-10 md:px-20 py-10 text-white">
            <div className="w-full h-48  rounded-lg shadow-md drop-shadow-md bg-gradient-to-br from-blue-400 to-blue-600 pt-10">
              <div className="flex justify-center h-[30%] ">
                <p className="text-lg font-semibold italic">Total Companies</p>
              </div>
              <div className="flex h-[70%] justify-center ">
                <p className="text-3xl font-bold">{dashboardData?.companyCount}</p>
              </div>
            </div>
            <div className="w-full h-48  rounded-lg shadow-md drop-shadow-md bg-gradient-to-br from-blue-400 to-blue-600 pt-10">
              <div className="flex justify-center h-[30%]">
                <p className="text-lg font-semibold italic">Total Employees</p>
              </div>
              <div className="flex h-[70%] justify-center ">
                <p className="text-3xl font-bold">{dashboardData?.employeeCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
