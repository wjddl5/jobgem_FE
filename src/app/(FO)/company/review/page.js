'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {AiFillAlert} from "react-icons/ai";

function Page() {
    const [reviews, setReviews] = useState([]);

    const getData = () => {
        axios.get('/api/company/review', { params: { coIdx: 1 } }).then((res) => {
            setReviews(res.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8 flex flex-col items-center">
            <div className="bg-white w-full max-w-3xl md:max-w-5xl p-4 md:p-8 rounded-lg shadow-lg">
                <div className="md:flex justify-between items-start mb-8 border-b pb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">회사 정보</h2>
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">회사명:</span>
                                <span className="text-gray-900">ABC Corp</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">설립 연도:</span>
                                <span className="text-gray-900">2001</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">위치:</span>
                                <span className="text-gray-900">서울특별시 강남구 종혁이의 비밀기지</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">연락처:</span>
                                <span className="text-gray-900">(02) 1234-5678</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">매출액:</span>
                                <span className="text-gray-900">1조</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">기업형태:</span>
                                <span className="text-gray-900">대기업</span>
                            </div>
                        </div>
                    </div>
                    <Image
                        src="/img/1.jpg"
                        alt="img"
                        width={80}
                        height={80}
                        className="rounded-lg shadow-md border border-gray-200 md:w-100 md:h-100"
                    />
                </div>

                <div className="mb-8">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg md:text-2xl font-bold text-gray-900">5.0</span>
                        <div className="text-yellow-500 text-sm md:text-lg">★★★★☆</div>
                        <span className="text-gray-500 text-xs md:text-sm">(50개 리뷰)</span>
                    </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                    {['5', '4', '3', '2', '1'].map((rating, idx) => (
                        <div key={idx} className="flex items-center space-x-2 md:space-x-3">
                            <span className="text-xs md:text-sm font-medium text-gray-600">{rating}</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                                <div
                                    className="bg-yellow-400 h-2 md:h-3 rounded-full"
                                    style={{ width: `${[60, 30, 5, 2, 3][idx]}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {reviews.map((review) => (
                    <div key={review.id} className="mt-8 md:mt-10 border-t pt-4 md:pt-6">

                        <div className='flex justify-between'>
                            <div className="text-yellow-500 text-sm md:text-lg">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span key={index}>{review.reScore >= index + 1 ? '★' : '☆'}</span>
                                    ))}
                            </div>
                            <button className="flex items-center gap-1 top-2 right-2 text-red-600 text-xs md:text-sm hover:underline">
                                <AiFillAlert/>신고하기
                            </button>
                        </div>


                        <div className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{review.reTitle}</div>

                        <div className="text-gray-500 text-sm md:text-base mb-4">
                            {review.company.coName} / {review.reWriteDate}
                        </div>
                        <div className="text-gray-700 space-y-2 md:space-y-4 text-xs md:text-sm">
                            <p>{review.reContent}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
