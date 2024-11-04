import { useFormik } from "formik";
import * as Yup from "yup";
import BackgroundImage from "../assets/login-background-image.jpg";
import InputField from "../Components/formComponents/InputField";
import { userLogin } from "../Services/apiServices";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        userLogin(values,navigate);
      },
    });
    
  return (
    <div className="w-screen h-dvh relative flex justify-center items-center">
      <img
        src={BackgroundImage}
        alt="login bg image"
        className="w-full h-full object-cover absolute"
      />
      <div className="w-[90%] md:w-[50%] h-fit md:h-[70%] bg-white/20 relative rounded-2xl pb-10 md:pb-0">
        <div className="w-full h-fit flex justify-center py-3 mt-10">
          <h3 className="text-xl font-semibold italic">Admin Login</h3>
        </div>
        <div className="w-full h-fit flex justify-center">
          <form
            className="w-[80%] h-fit space-y-5 mt-10"
            onSubmit={handleSubmit}
          >
            <div>
              <div>
                <InputField
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter Email"
                />
                {
                    errors.email&&touched.email&&(
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )
                }
              </div>
            </div>
            <div>
              <div>
                <InputField
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter Password"
                />
                {
                    errors.password&&touched.password&&(
                        <p className="text-sm text-red-500">{errors.password}</p>
                    )
                }
              </div>
            </div>
            <div className="flex justify-center py-5">
              <button
                type="submit"
                className="rounded-md text-white bg-blue-500 px-3 py-1"
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
