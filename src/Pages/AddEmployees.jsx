import * as yup from "yup";
import { useFormik } from "formik";
import InputField from "../Components/formComponents/InputField";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import {
  addEmployee,
  editEmployeeDetails,
  getCompany,
} from "../Services/apiServices";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddEmployees() {
  const location = useLocation();
  const employeeData = location.state;
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    getCompany(setCompanyData);
  }, []);

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters long"),

    lastName: yup.string().required("Last name is required"),
    company: yup.string().nullable(),

    email: yup.string().email("Must be a valid email").nullable(),

    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number must be at most 10 digits")
      .nullable(),
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName:
        employeeData && employeeData.firstName ? employeeData.firstName : "",
      lastName:
        employeeData && employeeData.lastName ? employeeData.lastName : "",
      email: employeeData && employeeData.email ? employeeData.email : "",
      phone: employeeData && employeeData.phone ? employeeData.phone : "",
      company: employeeData && employeeData.company ? employeeData.company : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (employeeData && Object.keys(employeeData).length > 0) {
        const obj = {
          id: employeeData.id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          company: values.company,
        };
        editEmployeeDetails(obj, navigate);
      } else {
        addEmployee(values, navigate);
      }
    },
  });

  return (
    <div className="w-screen h-dvh max-w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-dvh flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-[85%] h-full">
          <div className="flex justify-center text-black py-5">
            <p className="text-lg font-semibold italic">Add Employees</p>
          </div>
          <form
            className="w-full h-fit px-10 space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="w-full h-fit flex flex-col md:flex-row gap-3">
              <div className="w-full space-y-1">
                <label htmlFor="firstName" className="text-sm">
                  First Name
                </label>
                <div>
                  <InputField
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="placeholder:text-sm"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="lastName" className="text-sm">
                  Last Name
                </label>
                <div>
                  <InputField
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="placeholder:text-sm"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col md:flex-row gap-3">
              <div className="w-full space-y-1">
                <label htmlFor="company" className="text-sm">
                  Company
                </label>
                <div className="w-full">
                  <select
                    name="company"
                    id="company"
                    onChange={(e) => setFieldValue("company", e.target.value)}
                    onBlur={handleBlur}
                    defaultValue={values.company}
                    className="text-sm w-full border border-gray-400 rounded-md py-2 outline-none"
                  >
                    <option className="w-full" value="">
                      Select company
                    </option>
                    {companyData.map((company, index) => (
                      <option key={index} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {errors.company && touched.company && (
                    <p className="text-xs text-red-500">{errors.company}</p>
                  )}
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <div>
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="placeholder:text-sm"
                  />
                  {errors.email && touched.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col md:flex-row gap-3">
              <div className="w-full space-y-1">
                <label htmlFor="phone" className="text-sm">
                  Phone Number
                </label>
                <div>
                  <InputField
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Enter Phone Number"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="placeholder:text-sm"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="w-full"></div>
            </div>
            <div className="flex justify-center py-6">
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-blue-500 text-white"
              >
                {employeeData && Object.keys(employeeData).length > 0
                  ? " Update Employee"
                  : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
