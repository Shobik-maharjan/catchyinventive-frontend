import CreateProduct from "components/admin/CreateProduct";
import EditProduct from "components/admin/EditProduct";
import ConformationBox from "components/ConformationBox";
import Pagination from "components/Pagination";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useModal } from "src/hooks/useModal";
import { PRODUCTS } from "src/utils/db/dummy";

const Products = () => {
  const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(null);

  // const {
  //   isOpen: isEditProductModalOpen,
  //   openModal: openEditProductModal,
  //   closeModal: closeEditProductModal,
  // } = useModal();

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const productsPerPage = 4;

  // Calculate the index of the last and first product based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Slice the PRODUCTS array to get only the products for the current page
  const currentProducts = PRODUCTS.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleEditClick = (userId) => {
    setSelectedProductId(userId); // Set selected user ID
    openEditProductModal(); // Open the edit modal
  };

  const closeProductDeleteModal = () => {
    setIsProductDeleteOpen(null);
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-4">
        <div className="relative w-[90%]">
          <input
            type="search"
            placeholder="Search"
            className="w-full border border-zinc-400 rounded-md p-2 pl-8 outline-none"
          />
          <CiSearch className="absolute top-1/2 -translate-y-1/2 left-1 text-2xl" />
        </div>
        <Link to="create">
          <button
            className="bg-teal-600 px-4 py-2 text-white rounded-md w-fit hover:bg-teal-600/90"
            // onClick={openCreateProductModal}
          >
            Create&nbsp;Product
          </button>
        </Link>
        {/* {isCreateProductModalOpen && (
          <CreateProduct
            isModalOpen={isCreateProductModalOpen}
            closeModal={closeCreateProductModal}
          />
        )} */}
      </div>
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
                    src={product?.productImage}
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
                    <Link to={`${product.id}`}>
                      <FiEdit
                        className="cursor-pointer hover:text-blue-500"
                        // onClick={() => handleEditClick(product?.id)}
                      />
                    </Link>
                    {/* {isEditProductModalOpen &&
                      selectedProductId === product.id && (
                        <EditProduct
                          closeModal={closeEditProductModal}
                          isModalOpen={isEditProductModalOpen}
                          productId={product?.id}
                        />
                      )} */}
                    <RiDeleteBin6Fill
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setIsProductDeleteOpen(product.id)}
                    />
                    {isProductDeleteOpen === product.id && (
                      <ConformationBox
                        closeModal={closeProductDeleteModal}
                        isModalOpen={isProductDeleteOpen}
                        id={product?.id}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={PRODUCTS?.length}
        itemsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Products;
