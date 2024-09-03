import React from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const goToPage = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">
                <div
                    className={`flex items-center pt-3 text-gray-600 hover:text-sky-400 cursor-pointer ${currentPage === 0 && 'opacity-50 cursor-not-allowed'}`}
                    onClick={goToPreviousPage}
                >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
                              strokeLinejoin="round" />
                        <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25"
                              strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25"
                              strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm ml-3 font-medium leading-none">이전</p>
                </div>
                <div className="sm:flex hidden">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <p
                            key={i}
                            onClick={() => goToPage(i )}
                            className={`text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-sky-400 border-t ${currentPage === i  ? 'border-sky-400 text-sky-400' : 'border-transparent'} pt-3 mr-4 px-2`}
                        >
                            {i + 1}
                        </p>
                    ))}
                </div>
                <div
                    className={`flex items-center pt-3 text-gray-600 hover:text-sky-400 cursor-pointer ${currentPage + 1 === totalPages && 'opacity-50 cursor-not-allowed'}`}
                    onClick={goToNextPage}
                >
                    <p className="text-sm font-medium leading-none mr-3">다음</p>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
                              strokeLinejoin="round" />
                        <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25"
                              strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25"
                              strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
