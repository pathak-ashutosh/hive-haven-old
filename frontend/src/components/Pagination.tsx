import React from "react";
import { TbChevronRight, TbChevronLeft, TbChevronRightPipe, TbChevronLeftPipe } from "react-icons/tb";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const maxPageNumbersToShow = 3;

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= maxPageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    const pages: (number | string)[] = [];
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

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center m-4">
      <ul className="flex space-x-2">
        <li
          onClick={() => handlePageChange(1)}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronLeftPipe />
        </li>
        <li
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronLeft />
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            onClick={() => typeof number === 'number' && handlePageChange(number)}
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
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          className={`cursor-pointer px-2 md:px-3 py-2 rounded-lg content-center ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <TbChevronRight />
        </li>
        <li
          onClick={() => handlePageChange(totalPages)}
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
