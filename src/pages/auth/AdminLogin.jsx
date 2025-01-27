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
    <>
      <div className="bg-white h-screen flex flex-row-reverse items-center">
        <div className="flex flex-col w-full md:w-1/2 lg:w-[35%] px-14">
          <h1 className="text-black text-center font-semibold text-2xl uppercase">
            catchy inventive
          </h1>
          <form className="py-20" onSubmit={handleSubmit}>
            <div className="text-black/50">
              <h2 className="font-bold mb-1">Sign In</h2>
              <span>
                Enter your email address and password to access account.
              </span>
              <div className="my-6 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-bold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    className="w-ful p-2 border border-black/30 rounded outline-none bg-transparent"
                  />
                  <div className="text-red-500">
                    {errors.email && touched.email ? errors.email : null}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-bold">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="text-sm cursor-pointer">
                      Forgot Password?
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      className="w-full p-2 border border-black/30 rounded outline-none bg-transparent"
                    />
                    {values.password.length > 0 && (
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    )}
                  </div>
                  <div className="text-red-500">
                    {errors.password && touched.password
                      ? errors.password
                      : null}
                  </div>
                </div>

                <button
                  type="submit"
                  className={`py-2.5 px-5 rounded text-xl border text-white border-white/30 bg-blue-500 hover:bg-blue-600 ${
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
          <div className="text-black/50 text-center">
            Don't have an account?{" "}
            <span className="font-bold cursor-pointer"> Sign Up</span>
          </div>
        </div>
        <div className="lg:w-[70%] md:w-1/2 w-0">
          <img
            src="https://cdn11.bigcommerce.com/s-ced79/images/stencil/608x608/products/1094/40463/FB-1.5cm-Assorted-100-1__02015.1729238489.jpg?c=2"
            alt=""
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
