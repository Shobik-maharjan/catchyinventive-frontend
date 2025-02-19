import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSchema } from "src/schemas";
import { USERS } from "src/utils/db/dummy";

const EditUser = ({ closeModal, isModalOpen, userId }) => {
  const api = import.meta.env.VITE_PORT;

  const [isLoading, setIsLoading] = useState(false);

  const selectedUser = USERS.find((user) => user.id === userId);
  console.log(selectedUser);

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
      name: selectedUser?.name,
      email: selectedUser?.email,
      role: selectedUser?.role,
      err: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);
        const data = await axios.post(`${api}/edit`, {
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
        className="modal sm:modal-middle text-base backdrop-blur-[2px] bg-black/30"
        open={isModalOpen}
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
            <h2 className="mb-4 text-lg">Edit User</h2>
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
                className={`btn rounded-md cursor-pointer}`}
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
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}></button>
        </form>
      </dialog>
    </>
  );
};

export default EditUser;
