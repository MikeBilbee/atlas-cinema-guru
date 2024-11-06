'use client';
const PageButtons = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 my-5 py-5">
      <button
        onClick={handlePrevious}
        disabled={isFirstPage}
        className={`px-5 py-4 w-28 text-navy bg-teal rounded-l-full 
        ${isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-tealDark'}`}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={isLastPage}
        className={`px-5 py-4 w-28 text-navy bg-teal rounded-r-full 
        ${isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-tealDark'}`}
      >
        Next
      </button>
    </div>
  );
};

export default PageButtons;