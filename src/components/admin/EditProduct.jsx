import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSchema } from "src/schemas";
import { PRODUCTS } from "src/utils/db/dummy";

const EditProduct = ({ closeModal, isModalOpen, productId }) => {
  const api = import.meta.env.VITE_PORT;

  const [isLoading, setIsLoading] = useState(false);

  const selectedProduct = PRODUCTS.find((product) => product.id === productId);
  console.log(selectedProduct);

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
      productName: selectedProduct.productName || "",
      productCategory: selectedProduct.productCategory || "",
      productPrice: selectedProduct.productPrice || "",
      productStock: selectedProduct.productStock || "",
      productImage: selectedProduct.productImage || "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);
        const data = await axios.post(`${api}/edit`, {
          productName: values.productName,
          productCategory: values.category,
          productPrice: "",
          productStock: "",
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
        className="modal modal-middle text-base backdrop-blur-[2px] bg-black/30"
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
            <h2 className="mb-4 text-lg">Edit Product</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="name">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Product Name"
                />
                <div className="text-red-500">
                  {errors.name && touched.name ? errors.name : null}
                </div>
              </div>
              <div>
                <label className="productCategory">Category</label>
                <input
                  type="text"
                  name="productCategory"
                  value={values.productCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="category"
                />
                <div className="text-red-500">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div>
                <label className="productPrice">Price</label>
                <input
                  type="text"
                  name="productPrice"
                  value={values.productPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Price"
                />
                <div className="text-red-500">
                  {errors.role && touched.role ? errors.role : null}
                </div>
              </div>
              <div>
                <label className="productStock">Stock</label>
                <input
                  type="text"
                  name="productStock"
                  value={values.productStock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Stock"
                />
                <div className="text-red-500">
                  {errors.role && touched.role ? errors.role : null}
                </div>
              </div>
              <div>
                <label className="productImage">Image</label>
                <input
                  type="text"
                  name="productImage"
                  value={values.productImage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="grow border w-full p-2.5 rounded-md"
                  placeholder="Image"
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
      </dialog>
    </>
  );
};

export default EditProduct;
