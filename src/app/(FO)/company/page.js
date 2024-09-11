"use client"; // 클라이언트 측 렌더링 활성화

import React, { useState, useEffect } from "react";
import Button from "@/components/button/Button";
import { DiAptana } from "react-icons/di";
import IconButton from "@/components/button/IconButton";
import Image from "next/image";
import Table from "@/components/table/Table";
import Link from "next/link";
import axios from "axios";

export default function Page() {
    const [companyData, setCompanyData] = useState();

    // 데이터를 가져오는 함수
    const getData = () => {
        axios.get(`/api/company?id=${1}`).then((res) => {
            setCompanyData(res.data);
        })
    }
    // 페이지 번호가 변경될 때마다 데이터를 가져옴
    useEffect(() => {
        getData();
    }, []);

    if (!companyData) return <div className='flex justify-center'><img src='/img/loading.gif' alt='로딩' /></div>;

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
                    <div className="flex gap-6">
                        <Image src="/img/1.jpg" width='100' height='100' alt="등록된 로고"
                               className="w-12 h-12 rounded-full object-cover border border-gray-300"/>
                        <button
                            className="flex items-center border border-dashed border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                            <label className="text-gray-600"><input type='file' className='appearance-none hidden'/>로고 등록 +</label>
                        </button>
                    </div>
                    <div className="hover:rotate-90 transition duration-200 ease-in-out">
                        <IconButton><DiAptana/></IconButton>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold mb-4">기업 정보</h2>
                            <Button text={'수정'}/>
                        </div>
                        <div className='flex justify-between'>
                            <div className="text-center p-4">
                                <p className="mb-2">매출액</p>
                                <p className="text-2xl font-bold">{companyData.company.coSales / 100000000} 억</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">사원수</p>
                                <p className="text-2xl font-bold">{companyData.company.coEmployee}명</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">산업</p>
                                <p className="text-2xl font-bold">IT</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">설립</p>
                                <p className="text-2xl font-bold">{companyData.company.coOpen.slice(0,4)}년</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">기업형태</p>
                                <p className="text-2xl font-bold">{companyData.company.coType}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">일반 채용 현황</h2>
                        <div className="flex justify-between mb-4">
                            <div className="text-center">
                                <Link href='/company/posting' className="text-2xl font-bold text-blue-600 underline text-center">{companyData.postCount}</Link>
                                <p>진행중 공고</p>
                            </div>
                            <div className="text-center">
                                <Link href='/company/posting' className="text-2xl font-bold text-blue-600 underline text-center">{companyData.noPostCount}</Link>
                                <p>마감된 공고</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Link href='/company/posting' className='btn submit'>공고목록</Link>
                            <Link href='/(SUB)/posting/write' className='btn'>공고등록</Link>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">후기 현황</h2>
                        <div className="flex justify-between mb-4">
                            <div className="text-center">
                                <Link href='/company/review' className="text-2xl font-bold text-blue-600 underline text-center">{companyData.reviewCount}</Link>
                                <p>기업 후기</p>
                            </div>
                            <div className="text-center">
                                <Link href='/company/review/meeting' className="text-2xl font-bold text-blue-600 underline text-center">{companyData.interviewCount}</Link>
                                <p>면접 후기</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Link href='/company/review' className='btn submit'>기업후기</Link>
                            <Link href='/company/review/meeting' className='btn'>면접 후기</Link>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">인재 현황</h2>
                        <div className="flex felx-co justify-between mb-4">
                            <div className="text-center">
                                <Link href='/company/talent/fit' className="text-2xl font-bold text-blue-600 underline text-center">{companyData.fitJobseekerCount}</Link>
                                <p>인재 추천</p>
                            </div>
                            <div className="text-center">
                                <Link href='/company/talent/wish' className="text-2xl font-bold text-blue-600 underline text-center">{companyData.talentCount}</Link>
                                <p>찜한 인재</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Link href='/company/talent/fit' className='btn submit'>추천목록</Link>
                            <Link href='/company/talent/wish' className='btn'>찜한목록</Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold">차단 목록<span className='text-xs font-gray-500 font-light'>( 최신순 )</span></h2>
                            <div className="hover:rotate-90 transition duration-200 ease-in-out h-6">
                                <Link href='/company/black'><IconButton><DiAptana/></IconButton></Link>
                            </div>
                        </div>
                        <Table list={companyData.blockList} headers={['번호', '이름', '차단일자', '내용']} isNumber={true}/>
                    </div>

                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold">채팅 목록<span className='text-xs font-gray-500 font-light'>( 최신순 )</span>
                            </h2>
                            <div className="hover:rotate-90 transition duration-200 ease-in-out h-6">
                                <IconButton><DiAptana/></IconButton>
                            </div>
                        </div>
                        <Table list={[{}]} headers={['프로필', '채팅자', '마지막 채팅 시간']}/>
                    </div>
                </div>
            </div>
        </>
    );
}
