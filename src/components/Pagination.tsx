import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  currentPage,
  handlePageClick,
}: {
  pageCount: number;
  currentPage: number;
  handlePageClick: (event: { selected: number }) => void;
}) => (
  <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    pageCount={pageCount}
    forcePage={currentPage}
    onPageChange={handlePageClick}
    containerClassName="flex justify-center items-center space-x-2"
    pageClassName="px-4 py-2 border rounded hover:bg-gray-200"
    activeClassName="bg-blue-500 text-white"
    previousClassName="px-4 py-2 border rounded hover:bg-gray-200"
    nextClassName="px-4 py-2 border rounded hover:bg-gray-200"
    disabledClassName="opacity-50 cursor-not-allowed"
  />
);

export default Pagination;
