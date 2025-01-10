import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "src/schemas";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const api = import.meta.env.VITE_PORT;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setErrors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const data = await axios.post(`${api}/login`, {
          email: values.email,
          password: values.password,
        });
        console.log(data);

        setErrors({ password: data.data.message });
        if (data.data.user) {
          toast.success("Login Successfully");
          navigate("/admin");
        }
      } catch (error) {
        toast.error("Invalid Crediental");
      }
    },
  });
  return (
    <div className="">
      <div className="bg-[#15212d] h-screen flex items-center">
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
                  className="w-ful p-2 border border-white/30 rounded outline-none bg-[#15212d]"
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
                    className="w-full p-2 border border-white/30 rounded outline-none bg-[#15212d]"
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
              <div className="mb-3">Forgot Password?</div>
              <button
                type="submit"
                className="py-2.5 px-5 rounded text-xl border border-white/30"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="w-[60%]">
          <img
            src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
            alt=""
            className="h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
