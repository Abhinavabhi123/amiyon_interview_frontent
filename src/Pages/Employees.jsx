import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmployee, removeEmployee } from "../Services/apiServices";

export default function Employees() {
  const navigate = useNavigate();
  const [EmployeeData, setEmployeeData] = useState([]);
  const [updateState,setUpdateState] = useState(false);

  useEffect(()=>{
    getEmployee(setEmployeeData);
  },[updateState])

  return (
    <div className="w-screen h-dvh max-w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-dvh flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-[85%] h-full bg-blue-200/30">
          <div className="flex justify-center text-black py-5">
            <p className="text-lg font-semibold italic">Employee List</p>
          </div>
          <div className="w-full px-10">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Employee Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Company</TableCell>
                    <TableCell align="center">phone</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {EmployeeData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{`${row.firstName} ${row.lastName}`}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {row.email||"Null"}
                      </TableCell>
                      <TableCell align="center">
                        {row.companyId}
                      </TableCell>
                      <TableCell align="center" sx={{ cursor: "pointer" }}>
                       {row.phone||"Null"}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center gap-3 items-center">
                          <CiEdit
                            size={25}
                            className="cursor-pointer"
                            onClick={() =>
                              navigate("/add-employee", { state: row })
                            }
                          />
                          <IoTrashOutline
                            size={20}
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeEmployee(row.id, setUpdateState)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
