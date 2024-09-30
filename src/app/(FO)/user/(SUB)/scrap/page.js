"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ScrapPage({ query }) {
    const [scraps, setScraps] = useState([]);

    useEffect(() => {
        const fetchScraps = async () => {
            const res = await axios.get(`/api/scrap/list?joIdx=1`);
            setScraps(res.data);
        }

        fetchScraps();
    }, []);

    return (
        <div className="w-full h-full p-8">
            <h1 className="text-3xl font-bold mb-4">스크랩 공고</h1>
            <div>
                {
                    scraps.map((scrap) => (
                        <div key={scrap.id} className="flex items-center p-4 gap-4 border-t mt-1 border-gray-300">
                            <div className="flex flex-col w-10/12">
                                <h2 className="text-lg font-bold">{scrap.post.company.coName}</h2>
                                <Link href={`/post/view/${scrap.poIdx}`} className="text-lg font-bold">{scrap.post.poTitle}</Link>
                                <p className="text-sm text-gray-500">{scrap.post.poContent}</p>
                            </div>
                            <div className="flex flex-col w-2/12 items-center justify-center gap-2">
                                <button className="bg-blue-500 text-white w-full p-2 rounded-md">즉시지원</button>
                                <h4 className="text-sm text-gray-500">{scrap.post.poDeadline}까지</h4>
                            </div>
                        </div>
                    ))
                }
                <div className="flex items-center p-4 gap-4 border-t mt-1 border-gray-300"/>
            </div>
        </div>
    )
}