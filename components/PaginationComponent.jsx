import React from "react";

const Pagination = ({ elementPerPage, element, pagination }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(element / elementPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-5">
      <ul className="flex justify-center items-center gap-2 p-5 w-full">
        {pageNumbers?.map((number) => (
          <li key={number} className="list-none">
            <button
              onClick={() => pagination(number)}
              className="w-8 h-8 bg-zinc-700 text-white rounded-full shadow-none font-bold text-base flex items-center justify-center cursor-pointer focus:text-black"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
