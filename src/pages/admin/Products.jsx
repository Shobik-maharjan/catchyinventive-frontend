import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PRODUCTS } from "src/utils/db/dummy";

const Products = () => {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate the index of the last and first product based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Slice the PRODUCTS array to get only the products for the current page
  const currentProducts = PRODUCTS.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(PRODUCTS.length / productsPerPage);

  // Handler functions for pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-t-xl">
        <table className="min-w-full rounded-md table-auto border-collapse">
          <thead>
            <tr className="bg-zinc-100 border-b">
              <th className="p-2 text-left border-r rounded-tl-xl border-zinc-200">
                ID
              </th>
              <th className="p-2 text-left border-r border-zinc-200">
                Product Name
              </th>
              <th className="p-2 text-left border-r border-zinc-200">
                Category
              </th>
              <th className="p-2 text-left border-r border-zinc-200">Price</th>
              <th className="p-2 text-left border-r border-zinc-200">Stock</th>
              <th className="p-2 text-left rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b border-zinc-200">
                <td className="p-2 border-r border-zinc-200">{product?.id}</td>
                <td className="p-2 border-r border-zinc-200 flex items-center">
                  <img
                    src={product.productImage}
                    alt=""
                    className="w-10 h-10 object-contain"
                  />
                  {product?.productName}
                </td>
                <td className="p-2 border-r border-zinc-200">
                  {product?.productCategory}
                </td>
                <td className="p-2 border-r border-zinc-200">
                  Rs.{product?.productPrice}
                </td>
                <td className="p-2 border-r border-zinc-200">
                  {product?.productStock}
                </td>

                <td>
                  <div className="p-2 flex items-center gap-2 my-auto text-xl">
                    <FiEdit className="cursor-pointer hover:text-blue-500" />
                    <RiDeleteBin6Fill className="cursor-pointer hover:text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 items-center mt-4">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Number Display */}
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
