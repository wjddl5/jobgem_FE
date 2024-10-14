'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {AiFillAlert} from "react-icons/ai";
import Pagination from "@/components/pagination/Pagination";
import InputPopup from "@/components/popup/InputPopup";
import {getToken} from "@/app/util/token/token";
function Page(props) {
    const coIdx = props.params.coIdx;
    const [company, setCompany] = useState({});
    const [loadPage, setLoadPage] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [black, setBlack] = useState(null);
    const [ratingPercentages, setRatingPercentages] = useState([0, 0, 0, 0, 0]);

    const inputs = [
        { label: '제목', name: 'blTitle', placeholder: '제목을 입력하세요', type: 'input' },
        { label: '내용', name: 'blContent', placeholder: '내용를 입력하세요', type: 'textarea' }
    ];
    const calculator = (reviews) => {
        const total = reviews.length;
        const ratingsCount = [0, 0, 0, 0, 0]; // 1~5점 개수

        reviews.forEach(review => {
            ratingsCount[review.reScore - 1]++; // reScore에 맞춰 각 점수 개수 카운트
        });

        return ratingsCount.map(count => (count / total) * 100); // 각 점수의 비율을 퍼센트로 반환
    }

    const getData = () => {
        axios.get('/api/company/review', { params: { coIdx: coIdx, loadPage } }).then((res) => {
            setReviews(res.data.content);
            setTotalPage(res.data.totalPages);
        });
    };

    const handleBlack = (id) => {
        setBlack(id);
        setPopupOpen(true);
    }

    const fetchCompany = () => {
        axios.get(`/api/company/${coIdx}`).then((res) => {
            setCompany(res.data);
        })
    }
    useEffect(() => {
          fetchCompany();
          getData();
    }, []);

    useEffect(() => {
        if (reviews.length > 0) {
            setRatingPercentages(calculator(reviews)); // 비율 계산 후 상태 업데이트
        }
    }, [reviews]);

    useEffect(() => {
        getData();
    }, [loadPage]);

    return (
            <div className="bg-white w-full max-w-3xl md:max-w-5xl p-4 md:p-8 rounded-lg shadow-lg">
                <div className="md:flex justify-between items-start mb-8 border-b pb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">회사 정보</h2>
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">회사명:</span>
                                <span className="text-gray-900">{company?.coName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">설립 연도:</span>
                                <span className="text-gray-900">{company?.coOpen}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">위치:</span>
                                <span className="text-gray-900">{company?.coAddress}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">연락처:</span>
                                <span className="text-gray-900">{company?.coTel}</span>
                            </div>
                            <span className="text-gray-900">
                                {company?.coSales >= 1_0000_0000 && `${parseInt(company.coSales / 1_0000_0000)}억 `}
                                {(company?.coSales % 1_0000_0000) !== 0 && `${parseInt((company.coSales % 1_0000_0000) / 1_0000)}만`}
                            </span>
                            <div className="flex items-center">
                                <span className="font-medium text-gray-600 w-24 md:w-32">기업형태:</span>
                                <span className="text-gray-900">{company?.coType}</span>
                            </div>
                        </div>
                    </div>
                    <img
                        src={`/s3/${company?.coThumbimgUrl}`}
                        alt="img"
                        width={80}
                        height={80}
                        className="rounded-lg shadow-md border border-gray-200 md:w-100 md:h-100"
                    />
                </div>

                {
                    reviews.length > 0 ? <>
                        <div className="mb-8">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg md:text-2xl font-bold text-gray-900">{company?.coScore}</span>
                                <div className="text-yellow-500 text-sm md:text-lg">
                                    {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span className={`text-sm md:text-lg ${company?.coScore >= index + 1 ? 'text-yellow-500' : 'text-gray-300'}`} key={index}>
                                            ★
                                        </span>
                                    ))}</div>
                                <span className="text-gray-500 text-xs md:text-sm">({reviews.length}개 리뷰)</span>
                            </div>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {['5', '4', '3', '2', '1'].map((rating, idx) => (
                                <div key={idx} className="flex items-center space-x-2 md:space-x-3">
                                    <span className="text-xs md:text-sm font-medium text-gray-600">{rating}</span>
                                    <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                                        <div
                                            className="bg-yellow-400 h-2 md:h-3 rounded-full"
                                            style={{ width: `${ratingPercentages[5 - idx - 1]}%` }} // 비율을 반영
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
                        <Pagination
                            totalPages={totalPage}
                            currentPage={loadPage}
                            setLoadPage={setLoadPage}
                        />
                    </> : <p>리뷰가 없습니다</p>
                }
            </div>
    );
}

export default Page;
