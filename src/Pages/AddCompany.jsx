import { useEffect, useState } from "react";
import InputField from "../Components/formComponents/InputField";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useFormik } from "formik";
import * as yup from "yup";
import { addCompanyDetails, updateCompany } from "../Services/apiServices";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCompany() {
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;

  useEffect(() => {
    if (stateData&&stateData.logo) {
      setLogo(`${import.meta.env.VITE_BASE_URL}/${stateData?.logo}`);
    }
  }, [stateData]);
  

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),

    email: yup.string().email("Must be a valid email").nullable(),
    logo: yup.mixed().nullable(),
    website: yup.string().url("Website must be a valid URL").nullable(),
  });
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldError,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name:(stateData&&stateData.name) ? stateData.name : "",
      email: (stateData&&stateData.email) ? stateData.email: "",
      logo: {},
      website:(stateData&&stateData.website) ?stateData.website: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (stateData&&Object.keys(stateData).length > 0) {
        const obj = {
          id:stateData.id,
          name:values.name||"",
          email:values.email||"",
          website:values.website||"",
          logo:values.logo||""
        }     
        updateCompany(obj,navigate)
      } else {
        addCompanyDetails(values, navigate);
      }
    },
  });

  function imageHandler(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFieldValue("logo", file);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width < 100 || height < 100) {
          setFieldError(
            "logo",
            "Image resolution is too low. Please select a higher resolution image."
          );
        } else {
          setLogo(imageUrl);
        }
      };
    }
  }

  return (
    <div className="w-screen h-dvh max-w-screen overflow-x-hidden">
      <Navbar />
      <div className="w-full h-dvh flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full md:w-[85%] h-full">
          <div className="flex justify-center text-black py-5">
            <p className="text-lg font-semibold italic">Add Company</p>
          </div>
          <form
            className="w-full h-fit px-10 space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="w-full h-fit flex flex-col md:flex-row gap-3">
              <div className="w-full space-y-1">
                <label htmlFor="name" className="text-sm">
                  Company Name
                </label>
                <div>
                  <InputField
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Company Name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="placeholder:text-sm"
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="email" className="text-sm">
                  Company Email
                </label>
                <div>
                  <InputField
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter Company Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="placeholder:text-sm"
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col md:flex-row gap-3">
              <div className="w-full space-y-1">
                <label htmlFor="logo" className="text-sm">
                  Company Logo
                </label>
                <div>
                  <div className="relative w-fit h-10">
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      onChange={imageHandler}
                      onBlur={handleBlur}
                      accept="image/*"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-[2]"
                    />
                    <button
                      type="button"
                      className="w-full px-3 h-full bg-blue-500 rounded-lg text-white relative z-[1]"
                    >
                      Add Image
                    </button>
                  </div>
                  <>
                    {touched.logo && errors.logo && (
                      <p className="text-xs text-red-500">{errors.logo}</p>
                    )}
                  </>
                  {logo && (
                    <img
                      src={logo}
                      alt="selected logo"
                      className="w-36 mt-10"
                    />
                  )}
                </div>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="website" className="text-sm">
                  Company Website
                </label>
                <div>
                  <InputField
                    id="website"
                    name="website"
                    type="text"
                    onBlur={handleBlur}
                    value={values.website}
                    onChange={handleChange}
                    placeholder="Enter Company Website Link"
                    className="placeholder:text-sm"
                  />
                  {touched.website && errors.website && (
                    <p className="text-xs text-red-500">{errors.website}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="px-3 py-2 rounded-md text-white bg-blue-500"
              >
                {stateData&&Object.keys(stateData).length > 0
                  ? "Update Company"
                  : "Add Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
