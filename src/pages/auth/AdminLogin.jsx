import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "src/schemas";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "src/features/users/userActions";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        try {
          const userCredentials = {
            email: values.email,
            password: values.password,
          };
          dispatch(loginUser({ userCredentials, navigate }));
        } catch (error) {
          toast.error(error);
        }
      },
    });
  return (
    <div className="">
      <div className="bg-[#997049] h-screen flex items-center">
        <form className="w-[50%] px-10" onSubmit={handleSubmit}>
          <div className="text-white">
            <h1 className="text-center text-2xl mb-8 uppercase">
              catchy inventive
            </h1>
            <h2 className="text-center text-xl uppercase">Login</h2>
            <div className="my-6 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  className="w-ful p-2 border border-white/30 rounded outline-none bg-transparent"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="w-full p-2 border border-white/30 rounded outline-none bg-transparent"
                  />
                  {values.password.length >= 0 && (
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  )}
                </div>
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <div className="mb-3 cursor-pointer">Forgot Password?</div>
              <button
                type="submit"
                className={`py-2.5 px-5 rounded text-xl border border-white/30 bg-[#764f15] hover:bg-[#997049] ${
                  user?.status === "loading"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={user?.status === "loading"}
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="w-[60%]">
          <img
            src="https://cdn11.bigcommerce.com/s-ced79/images/stencil/608x608/products/1094/40463/FB-1.5cm-Assorted-100-1__02015.1729238489.jpg?c=2"
            alt=""
            className="h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
