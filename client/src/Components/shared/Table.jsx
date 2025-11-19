import React from "react";
import Pagination from "../Table/Pagination";
import Header from "../Table/Header";
import Body from "../Table/Body";

const Table = ({
    tableHeader,
    tableBody,
    tableKeys,
    currentPage,
    totalPages,
    setPage,
}) => {
    return (
        <div id="table-holder">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
            />

            <table>
                <Header tableHeader={tableHeader} />
                <Body tableBody={tableBody} tableKeys={tableKeys} />
            </table>
        </div>
    );
};

export default Table;
