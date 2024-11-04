import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";

import { getCompany, removeCompany } from "../Services/apiServices";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    getCompany(setCompanyData);
  }, [updateState]);

  return (
    <div className="w-screen h-dvh max-w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-dvh flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-[85%] h-full bg-blue-200/30">
          <div className="flex justify-center text-black py-5">
            <p className="text-lg font-semibold italic">Company List</p>
          </div>
          <div className="w-full px-10">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Company Name</TableCell>
                    <TableCell align="center">Logo</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Website</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companyData.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/${row.logo}`}
                          alt="logo"
                          className="w-10"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {row.email || "Null"}
                      </TableCell>
                      <TableCell align="center" sx={{ cursor: "pointer" }}>
                        {row.website ? (
                          <a
                            href={row.website}
                            target="_blank"
                            className="text-blue-600"
                          >
                            {row.website}
                          </a>
                        ) : (
                          <p>Null</p>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center gap-3 items-center">
                          <CiEdit
                            size={25}
                            className="cursor-pointer"
                            onClick={() =>
                              navigate("/add-company", { state: row })
                            }
                          />
                          <IoTrashOutline
                            size={20}
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              removeCompany(row.id, setUpdateState)
                            }
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
