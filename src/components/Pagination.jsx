// import React from "react";

// const Pagination = ({
//   totalItems,
//   itemsPerPage,
//   currentPage,
//   setCurrentPage,
// }) => {
//   // Calculate total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Handler functions for pagination
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       {/* Pagination Controls */}
//       <div className="flex justify-center gap-4 items-center mt-4">
//         {/* Previous Button */}
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
//         >
//           Previous
//         </button>

//         {/* Page Number Display */}
//         <span className="text-lg font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>

//         {/* Next Button */}
//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default Pagination;

import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(1);

    // Show the previous page, current page, and next page in the middle
    if (currentPage > 2) {
      pageNumbers.push(currentPage - 1);
    }
    pageNumbers.push(currentPage);
    if (currentPage < totalPages - 1) {
      pageNumbers.push(currentPage + 1);
      if (currentPage < 2) {
        pageNumbers.push(currentPage + 2);
      }
    }

    // Always show the last page if it's not already included
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }
    if (pageNumbers.includes(totalPages - 1)) {
      pageNumbers.push(totalPages - 2);
    }

    // Add ellipsis (...) if there are skipped pages
    const result = [];
    for (let i = 1; i <= totalPages; i++) {
      if (pageNumbers.includes(i)) {
        result.push(i);
      } else if (
        (i === 2 && !pageNumbers.includes(2)) ||
        (i === totalPages - 1 && !pageNumbers.includes(totalPages - 1))
      ) {
        result.push("...");
      }
    }

    return result;
  };
  console.log(totalPages);

  return (
    <>
      {/* Pagination Controls */}
      {totalPages >= 2 && (
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
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="text-black">
                ...
              </span> // Just display ellipsis as text without styling
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                disabled={page === currentPage}
                className={`px-4 py-2 ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } rounded-lg disabled:opacity-50`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
