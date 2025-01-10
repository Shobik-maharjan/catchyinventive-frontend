import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerSchema } from "src/schemas";

const RegisterUser = ({ closeModal, isModalOpen }) => {
  const api = import.meta.env.VITE_PORT;

  const [isLoading, setIsLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setErrors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      err: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);
        const data = await axios.post(`${api}/register`, {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        });
        setTimeout(() => {
          if (data.data.user) {
            toast.success("User Created Successfully");
          }
          setIsLoading(false);
        }, 500);
        actions.resetForm();
      } catch (error) {
        setTimeout(() => {
          setErrors({
            err: error.response.data.error,
          });
          setIsLoading(false);
        }, 500);
      }
    },
  });

  return (
    <>
      <dialog
        id="my_modal_3"
        className="modal modal-bottom sm:modal-middle"
        open={isModalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeModal(); // Close modal if the backdrop is clicked
          }
        }}
      >
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm rounded-md btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2>Create New User</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Name"
                />
                <div className="text-red-500">
                  {errors.name && touched.name ? errors.name : null}
                </div>
              </div>
              <div>
                <label className="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Email"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div>
                <label className="passwod">Password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Password"
                />
                <div className="text-red-500">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <div>
                <label className="confirm-passwod">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={values.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Confirm Password"
                />
                <div className="text-red-500">
                  {errors.password_confirmation && touched.password_confirmation
                    ? errors.password_confirmation
                    : null}
                </div>
              </div>

              <button
                type="submit"
                className={`btn rounded-md cursor-pointer ${
                  !values.name ||
                  !values.email ||
                  !values.password ||
                  !values.password_confirmation
                    ? "cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  !values.name ||
                  !values.email ||
                  !values.password ||
                  !values.password_confirmation
                }
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                Create User
              </button>

              <div className="text-red-500">
                {errors.err ? errors.err : null}
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default RegisterUser;
