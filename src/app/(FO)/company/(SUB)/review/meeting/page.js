'use client'

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from "@/components/pagination/Pagination";
import {getToken} from "@/app/util/token/token";

export default function Page() {
    const [interviews, setInterviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [sortBy, setSortBy] = useState('inWriteDate');
    const [loadPage, setLoadPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [coIdx, setCoIdx] = useState(0);

    const getData = () => {
        axios.get('/api/company/interview', { params: { id: coIdx, loadPage, sortBy } }).then((res) => {
            setInterviews(res.data.content);
            setTotalPage(res.data.totalPages);
        });
    };

    useEffect(() => {
        if(coIdx > 0) getData();
    }, [sortBy, loadPage, coIdx]);

    useEffect((res) => {
        getToken().then((res) => {
            setCoIdx(res.IDX);
        })
    }, [])

    const handleSort = (key) => {
        setSortBy(key);
    };



    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">면접 후기 조회</h1>

            <div className="mb-4">
                <label className="mr-2">정렬:</label>
                <select
                    onChange={(e) => handleSort(e.target.value)}
                    className="border rounded-md p-1"
                >
                    <option value="inWriteDate">날짜순</option>
                    <option value="inLevel">난이도순</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    {interviews.map((interview) => (
                        <div
                            key={interview.id}
                            className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
                            onClick={() => setSelectedReview(interview)}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{interview.inWriteDate}</span>
                                <span className={`px-2 py-1 rounded-full text-sm`}>{interview.jobseeker.joName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">난이도:</span>
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span className={`text-sm md:text-lg ${interview.inLevel >= index + 1 ? 'text-yellow-500' : 'text-gray-300'}`} key={index}>
                                            ★
                                        </span>
                                    ))}
                            </div>
                            <p className="mt-2 text-gray-600">{interview.inContent.slice(0, 50)}...</p>
                        </div>
                    ))}
                </div>

                <div className="border rounded-md p-4">
                    {selectedReview ? (
                        <>
                            <h2 className="text-xl font-semibold mb-2">상세 후기</h2>
                            <p className="mb-2">날짜: {selectedReview.inWriteDate}</p>
                            <p className="mb-2">난이도: {selectedReview.inLevel}</p>
                            <p>{selectedReview.inContent}</p>
                        </>
                    ) : (
                        <p className="text-gray-500">후기를 선택하면 여기에 상세 내용이 표시됩니다.</p>
                    )}
                </div>
            </div>
            <Pagination
                totalPages={totalPage}
                currentPage={loadPage}
                setLoadPage={setLoadPage}
            />
        </div>
    );
}
