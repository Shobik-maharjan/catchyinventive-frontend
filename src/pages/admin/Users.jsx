import React, { useState } from "react";
import { USERS } from "src/utils/db/dummy";
import { CiSearch } from "react-icons/ci";
import RegisterUser from "components/admin/RegisterUser";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import EditUser from "components/admin/EditUser";
import Pagination from "components/Pagination";

const Users = () => {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(null);

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Products ~ currentPage:", currentPage);
  const userPerPage = 4;

  // Calculate the index of the last and first product based on the current page
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  // Slice the PRODUCTS array to get only the products for the current page
  const currentUsers = USERS.slice(indexOfFirstUser, indexOfLastUser);

  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };
  const closeEditUserModal = () => {
    setIsEditUserOpen(null);
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
        <button
          className="bg-teal-600 px-4 py-2 text-white rounded-md w-fit hover:bg-teal-600/90"
          onClick={() => setIsCreateUserModalOpen(true)}
        >
          Create&nbsp;User
        </button>
        {isCreateUserModalOpen && (
          <RegisterUser
            closeModal={closeCreateUserModal}
            isModalOpen={isCreateUserModalOpen}
          />
        )}
      </div>
      <div className="bg-white rounded-t-xl">
        <table className="min-w-full rounded-md table-auto border-collapse">
          <thead>
            <tr className="bg-zinc-100 border-b">
              <th className="p-2 text-left border-r rounded-tl-xl border-zinc-200">
                ID
              </th>
              <th className="p-2 text-left border-r border-zinc-200">Name</th>
              <th className="p-2 text-left border-r border-zinc-200">Role</th>
              <th className="p-2 text-left border-r border-zinc-200">Email</th>
              <th className="p-2 text-left border-r border-zinc-200">
                IsEnabled
              </th>
              <th className="p-2 text-left rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-zinc-200">
                <td className="p-2 border-r border-zinc-200">{user?.id}</td>
                <td className="p-2 border-r border-zinc-200">{user?.name}</td>
                <td className="p-2 border-r border-zinc-200">
                  {user?.role === "1" ? "admin" : "user"}
                </td>
                <td className="p-2 border-r border-zinc-200">{user?.email}</td>
                <td className="p-2 border-r border-zinc-200">
                  <div className="flex items-center">
                    {user?.isEnabled ? "yes" : "no"}
                    <input
                      type="checkbox"
                      className="toggle border-blue-500 bg-blue-500 [--tglbg:white] hover:bg-blue-700"
                      defaultChecked={user?.isEnabled}
                    />
                  </div>
                </td>
                <td>
                  <div className="p-2 flex items-center gap-2 my-auto text-xl">
                    <FiEdit
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => setIsEditUserOpen(user?.id)}
                    />
                    {isEditUserOpen === user?.id && (
                      <EditUser
                        closeModal={closeEditUserModal}
                        isModalOpen={isEditUserOpen}
                        userId={user?.id}
                      />
                    )}
                    <RiDeleteBin6Fill className="cursor-pointer hover:text-red-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={USERS?.length}
        itemsPerPage={userPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Users;
