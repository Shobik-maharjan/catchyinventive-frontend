import React from "react";
import { USERS } from "src/utils/db/dummy";
import { CiSearch } from "react-icons/ci";

const Users = () => {
  return (
    <>
      <div className="flex justify-between gap-4 mb-4">
        <div className="relative w-[90%]">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="w-full border border-zinc-400 rounded-md p-2 pl-8 outline-none"
          />
          <CiSearch className="absolute top-2.5 left-1 text-2xl" />
        </div>
        <button className="bg-teal-600 px-4 py-2 rounded-md w-fit">
          Create&nbsp;User
        </button>
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
            {[...USERS, ...USERS].map((user) => (
              <tr key={user.id} className="border-b border-zinc-200">
                <td className="p-2 border-r border-zinc-200">{user.id}</td>
                <td className="p-2 border-r border-zinc-200">{user.name}</td>
                <td className="p-2 border-r border-zinc-200">{user.role}</td>
                <td className="p-2 border-r border-zinc-200">{user.email}</td>
                <td className="p-2 border-r border-zinc-200">
                  {user.isEnabled ? "yes" : "no"}
                </td>
                <td className="p-2">Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
