import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSchema } from "src/schemas";
import { PRODUCTS } from "src/utils/db/dummy";
import Modal from "components/Modal";
import { Link, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const selectedProduct = PRODUCTS.find(
    (product) => product.id === Number(productId)
  );

  const formFields = [
    { label: "Product Name", name: "productName", type: "text" },
    { label: "Product Description", name: "productDescription", type: "text" },
    {
      label: "Category",
      name: "productCategory",
      type: "select",
      options: ["Select Category", "Ball Items", "Animals Items"],
    },
    {
      label: "Sub Category",
      name: "productSubCategory",
      type: "select",
      options: [], // Dynamically populated
    },
    { label: "Item", name: "productItem", type: "select", options: [] }, // Dynamically populated
    { label: "Size", name: "productSize", type: "text" },
    { label: "Price", name: "productPrice", type: "text" },
    { label: "Stock", name: "productStock", type: "text" },
  ];

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
      productName: selectedProduct?.productName || "",
      productCategory: selectedProduct?.productCategory || "",
      productDescription: selectedProduct?.productDescription || "",
      productSubCategory: selectedProduct?.productSubCategory || "",
      productItem: selectedProduct?.productItem || "",
      productPrice: selectedProduct?.productPrice || "",
      productStock: selectedProduct?.productStock || "",
      productImage: selectedProduct?.productImage || "",
    },

    // validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrors({
          err: error.response.data.error,
        });
      }
    },
  });

  return (
    <>
      <div className="bg-white p-4 rounded-md">
        <h2 className="mb-4 text-xl font-semibold">Edit Product</h2>
        <form
          method="dialog"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          {formFields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                type="text"
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="grow border w-full p-2.5 rounded-md"
                placeholder={field.label}
              />
              <div className="text-red-500">
                {errors[field.name] && touched[field.name]
                  ? errors[field.name]
                  : null}
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="submit"
              className={`btn w-fit rounded-md cursor-pointer`}
              // disabled={isLoading}
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              Save
            </button>
            <Link to="/admin/products">
              <button
                type="button"
                className={`btn w-fit rounded-md cursor-pointer`}
              >
                Cancel
              </button>
            </Link>
          </div>

          {/* <div className="text-red-500">{errors.err ? errors.err : null}</div> */}
        </form>
      </div>
    </>
  );
};

export default EditProduct;
