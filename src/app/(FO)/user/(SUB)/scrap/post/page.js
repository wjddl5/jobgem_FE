"use client"

import { getToken } from "@/app/util/token/token";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ScrapPage({ query }) {

    const [scraps, setScraps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScraps = async () => {
            const token = await getToken();
            const userIdx = token.IDX;
            const res = await axios.get(`/api/scrap/list/${userIdx}`);
            setScraps(res.data);
            setLoading(false);
        }

        fetchScraps();
    }, []);

    return (
        <div className="w-full h-full p-8">
            <h1 className="text-3xl font-bold mb-4">스크랩 공고</h1>
            <div className="flex items-center border-t mt-1 border-gray-300" />
            <div>
                {scraps.length > 0 ?
                    scraps.map((scrap) => (
                        <div key={scrap.id} className="flex items-center pb-4 gap-4 border-b mt-1 border-gray-300">
                            <div className="flex flex-col w-10/12">
                                <h2 className="text-lg font-bold">{scrap.postDto.company.coName}</h2>
                                <h2 className="text-lg font-bold">{scrap.postDto.poTitle}</h2>
                            </div>
                            <div className="flex flex-col w-2/12 items-center justify-center gap-2 mt-4">
                                <Link href={`/post/view/${scrap.poIdx}`} className="bg-blue-500 text-white p-2 rounded-md w-full text-center">
                                    공고 보기
                                </Link>
                                <h4 className="text-sm text-gray-500 text-center">
                                    {scrap.postDto.poDeadline}까지
                                </h4>
                            </div>
                        </div>
                    )) :
                    loading ? (
                        <p className="flex items-center justify-center">데이터 가져오는 중</p>
                    ) : (
                        <div>
                            <p className="flex items-center justify-center">스크랩 한 공고가 없습니다.</p>
                            <div className="flex justify-center mt-4">
                                <Link href="/recruit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                    공고 확인하기
                                </Link>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}