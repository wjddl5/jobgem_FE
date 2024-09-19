'use client'

import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPagination({ totalPages, keyword, curPage }) {
    const router = useRouter();
    const [loadPage, setLoadPage] = useState(0);

    useEffect(() => {
        router.push(`/search?keyword=${keyword}&curPage=${parseInt(loadPage)}`);
    }, [loadPage]);

    return (
        <Pagination totalPages={totalPages} currentPage={loadPage} setLoadPage={setLoadPage} />
    )
}   