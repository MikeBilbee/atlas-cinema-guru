// components/PageButtons.tsx
"use client";

import { useState, useEffect } from "react";

interface PageButtonsProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PageButtons: React.FC<PageButtonsProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }, [totalItems, itemsPerPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-l-full border border-lumi-teal ${currentPage === 1 ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-lumi-teal text-white hover:bg-lumi-dark-teal"}`}
            >
                Previous
            </button>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-r-full border border-lumi-teal ${currentPage === totalPages ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-lumi-teal text-white hover:bg-lumi-dark-teal"}`}
            >
                Next
            </button>
        </div>
    );
};

export default PageButtons;