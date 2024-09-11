import React from 'react';

function Pagination({ totalPages, currentPage, setLoadPage }) {
    const pagesPerGroup = 5;
    // Calculate the block range of pages to display
    const startPage = Math.floor(currentPage / pagesPerGroup) * pagesPerGroup;
    const endPage = Math.min(startPage + pagesPerGroup, totalPages);

    // Calculate the current block and total blocks
    const currentBlock = Math.floor(currentPage / pagesPerGroup);
    const totalBlocks = Math.ceil(totalPages / pagesPerGroup);

    const goToPreviousBlock = () => {
        if (currentBlock > 0) {
            setLoadPage((currentBlock-1) * pagesPerGroup);
        }
    };
    const goToNextBlock = () => {
        if (currentBlock < totalBlocks - 1) {
            setLoadPage((currentBlock+1) * pagesPerGroup);
        }
    };

    const goToPage = (page) => {
        if (page !== currentPage) {
            setLoadPage(page);
        }
    };

    return (
        <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">
                <div
                    className={`flex items-center pt-3 text-gray-600 hover:text-sky-400 cursor-pointer ${currentBlock === 0 && 'opacity-50 cursor-not-allowed'}`}
                    onClick={goToPreviousBlock}
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
                    {Array.from({ length: endPage - startPage }, (_, i) => (
                        <p
                            key={startPage + i}
                            onClick={() => goToPage(startPage + i)}
                            className={`text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-sky-400 border-t ${currentPage === startPage + i ? 'border-sky-400 text-sky-400' : 'border-transparent'} pt-3 mr-4 px-2`}
                        >
                            {startPage + i + 1}
                        </p>
                    ))}
                </div>
                <div
                    className={`flex items-center pt-3 text-gray-600 hover:text-sky-400 cursor-pointer ${currentBlock + 1 === totalBlocks && 'opacity-50 cursor-not-allowed'}`}
                    onClick={goToNextBlock}
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
