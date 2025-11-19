import React from 'react'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const Pagination = ({currentPage,totalPages,setPage}) => {
  return (
    <div id="table-option">
        <button
          disabled={currentPage <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <GrFormPrevious />
        </button>
        <span>
          page : {currentPage} of {totalPages}{" "}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <GrFormNext />
        </button>
      </div>
  )
}

export default Pagination