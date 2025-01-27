import Modal from "components/Modal";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "src/features/users/userActions";
import { registerSchema } from "src/schemas";

const RegisterUser = ({ closeModal, isModalOpen }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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
    onSubmit: (values) => {
      try {
        setIsLoading(true); // Start loading
        const userData = {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        };
        dispatch(registerUser({ userData, navigate })).then(() => {
          setIsLoading(false);
        });
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    },
  });
  console.log(isLoading);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Register New User"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={errors.err}
      >
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
        <div className="text-red-500">{errors.err ? errors.err : null}</div>
      </Modal>
    </>
  );
};

export default RegisterUser;
