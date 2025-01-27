import React, { useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "src/schemas";
import Modal from "components/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const CreateProduct = ({ closeModal, isModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const imgRef = useRef(null);

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
      options: [],
    }, // Dynamically populated
    { label: "Item", name: "productItem", type: "select", options: [] }, // Dynamically populated
    { label: "Size", name: "productSize", type: "text" },
    { label: "Price", name: "productPrice", type: "text" },
    { label: "Stock", name: "productStock", type: "text" },
  ];

  const Category = [
    {
      id: 1,
      categoryName: "Ball Items",
      subCategories: [
        {
          id: 1,
          name: "Plain Balls",
          items: [
            { id: 1, name: "1cm Ball" },
            { id: 2, name: "1cm Ball" },
          ],
        },
        {
          id: 2,
          name: "Wash Balls",
          items: [
            { id: 1, name: "10cm Ball" },
            { id: 2, name: "10cm Ball" },
          ],
        },
        {
          id: 3,
          name: "Style Balls",
          items: [
            { id: 1, name: "100cm Ball" },
            { id: 2, name: "100cm Ball" },
          ],
        },
      ],
    },
    {
      id: 2,
      categoryName: "Animals Items",
      subCategories: [
        {
          id: 1,
          name: "Pet Items",
          items: [
            { id: 1, name: "3cm Ball" },
            { id: 2, name: "31cm Ball" },
          ],
        },
      ],
    },
  ];

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setErrors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productCategory: "",
      productSubCategory: "",
      productItem: "",
      productSize: "",
      productPrice: "",
      productStock: "",
      productImage: [],
    },
    // validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        console.log(values);
      } catch (error) {}
    },
  });

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    // Create promises to read files as base64
    const imageData = await Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    );
    setFieldValue("productImage", [...values.productImage, ...imageData]); // Update Formik values
  };

  const removeImage = (index) => {
    setFieldValue(
      "productImage",
      values.productImage.filter((_, idx) => idx !== index)
    );
  };

  // Use memoization to avoid recalculating subcategories and items on every render
  const currentCategory = useMemo(
    () => Category.find((cat) => cat.categoryName === selectedCategory),
    [selectedCategory]
  );

  const currentSubCategory = useMemo(
    () =>
      currentCategory
        ? currentCategory.subCategories.find(
            (sub) => sub.name === selectedSubCategory
          )
        : null,
    [selectedCategory, selectedSubCategory, currentCategory]
  );

  const subCategoryOptions = currentCategory
    ? currentCategory.subCategories.map((sub) => sub.name)
    : [];

  const itemOptions = currentSubCategory
    ? currentSubCategory.items.map((item) => item.name)
    : [];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubCategory(""); // Clear subcategory when category changes
    handleChange(e); // Sync Formik's category value
  };

  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setSelectedSubCategory(subCategory);
    handleChange(e); // Sync Formik's subcategory value
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <form method="dialog" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl font-semibold">Create Product</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 w-1/2">
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "text" ? (
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
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={values[field.name]}
                    onChange={
                      field.name === "productCategory"
                        ? handleCategoryChange
                        : field.name === "productSubCategory"
                        ? handleSubCategoryChange
                        : handleChange
                    }
                    onBlur={handleBlur}
                    className="grow border w-full p-2.5 rounded-md"
                  >
                    <option value="">Select {field.label}</option>
                    {field.name === "productCategory" &&
                      Category.map((cat) => (
                        <option key={cat.id} value={cat.categoryName}>
                          {cat.categoryName}
                        </option>
                      ))}
                    {field.name === "productSubCategory" &&
                      subCategoryOptions.map((sub, i) => (
                        <option key={i} value={sub}>
                          {sub}
                        </option>
                      ))}
                    {field.name === "productItem" &&
                      itemOptions.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                ) : null}
                <div className="text-red-500">
                  {errors[field.name] && touched[field.name]
                    ? errors[field.name]
                    : null}
                </div>
              </div>
            ))}

            {/* Image */}
            <div>
              <label className="productImage">Image</label>
              <input
                type="file"
                accept="images/*"
                multiple
                hidden
                name="productImage"
                onChange={handleImageChange}
                ref={imgRef}
                className="grow border w-full p-2.5 rounded-md"
                placeholder="Image"
              />
              <div className="flex gap-1 items-center">
                <div className="btn" onClick={() => imgRef.current.click()}>
                  Add Images
                  <CiImageOn className="fill-neutral w-8 h-auto cursor-pointer" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {values.productImage.map((image, index) => (
                  <div key={index} className="relative">
                    <IoCloseSharp
                      className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                      onClick={() => removeImage(index)}
                    />
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="object-contain h-auto w-full rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="text-red-500">
                {errors.role && touched.role ? errors.role : null}
              </div>
            </div>

            <div className="text-red-500">{errors.err ? errors.err : null}</div>
          </div>
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
          {/* {error && <div className="text-red-500">{error}</div>} */}
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
