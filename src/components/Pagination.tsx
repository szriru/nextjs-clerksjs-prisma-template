import Link from 'next/link';

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const Pagination = async ({ currentPage, totalPages }: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex justify-center items-center mt-8">
      {!isFirstPage && (
        <Link className="mr-4 px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" href={`?page=${prevPage}`}>
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = pageNumber === currentPage;
        console.log(pageNumber, isActive, i)
        return (
          <Link key={pageNumber} href={`?page=${pageNumber}`} className={`${isActive ? 'bg-blue-500 text-white' : 'text-blue-500'
            } mr-4 px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100`}>
            {pageNumber.toString()}
          </Link>
        );
      })}

      {!isLastPage && (
        <Link href={`?page=${nextPage}`} className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100">
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination