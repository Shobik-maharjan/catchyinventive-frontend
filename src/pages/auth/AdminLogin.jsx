import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "src/schemas";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handlBar, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        navigate("/admin");
      },
    });
  return (
    <div className="">
      <div className="bg-[#15212d] h-screen flex items-center">
        <form className="w-[50%] px-10" onSubmit={handleSubmit}>
          <div className="text-white">
            <h1 className="text-center text-2xl mb-8">catchy inventive</h1>
            <h2 className="text-center text-xl">Login</h2>
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
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-ful p-2 border border-white/30 rounded outline-none bg-[#15212d]"
                />
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
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
