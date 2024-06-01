import { TbChevronRight, TbChevronLeft, TbChevronRightPipe, TbChevronLeftPipe } from "react-icons/tb";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const maxPageNumbersToShow = 3;

  const getPageNumbers = () => {
    if (totalPages <= maxPageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center m-4">
      <ul className="flex space-x-2">
        <li
          onClick={() => onPageChange(1)}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronLeftPipe />
        </li>
        <li
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronLeft />
        </li>
        {getPageNumbers().map((number, index) => (
          <li
            key={index}
            onClick={() => number !== "..." && onPageChange(number)}
            className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg ${
              currentPage === number
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {number}
          </li>
        ))}
        <li
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronRight />
        </li>
        <li
          onClick={() => onPageChange(totalPages)}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronRightPipe />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
