import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSchema } from "src/schemas";

const EditUser = ({ closeModal, isModalOpen }) => {
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
      role: "",
      err: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);
        const data = await axios.post(`${api}/register`, {
          name: values.name,
          email: values.email,
          role: values.role,
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
        className="modal modal-bottom sm:modal-middle text-base"
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
            <h2>Edit User</h2>
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
                <label className="role">Role</label>
                <input
                  type="text"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Role"
                />
                <div className="text-red-500">
                  {errors.role && touched.role ? errors.role : null}
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
                Edit User
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

export default EditUser;
