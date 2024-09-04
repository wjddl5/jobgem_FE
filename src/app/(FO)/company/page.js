"use client"; // 클라이언트 측 렌더링 활성화

import { useState, useEffect } from "react";
import Button from "@/components/button/Button";
import { DiAptana } from "react-icons/di";
import IconButton from "@/components/button/IconButton";
import Image from "next/image";
import Table from "@/components/table/Table";
import Link from "next/link";
import axios from "axios";
import Pagination from "@/components/pagination/Pagination";

// 데이터를 가져오는 함수
async function getPage(id, blockPage) {
    const company = await axios(`/api/company?id=${id}&blockPage=${blockPage}`);
    return company.data;
}

export default function Page() {
    const [company, setCompany] = useState(null); // 회사 데이터를 상태로 관리
    const [blockPage, setBlockPage] = useState(0); // 페이지 번호 상태 관리

    // 페이지 번호가 변경될 때마다 데이터를 가져옴
    useEffect(() => {
        async function fetchData() {
            const data = await getPage(1, blockPage);
            setCompany(data);
        }
        fetchData();
    }, [blockPage]);

    if (!company) return <div>Loading...</div>; // 데이터가 로드되기 전 로딩 상태 표시

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
                                <p className="text-2xl font-bold">{company.company.coSales / 100000000} 억</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">사원수</p>
                                <p className="text-2xl font-bold">{company.company.coEmployee}명</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">산업</p>
                                <p className="text-2xl font-bold">IT</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">설립</p>
                                <p className="text-2xl font-bold">{company.company.coOpen.slice(0,4)}년</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">기업형태</p>
                                <p className="text-2xl font-bold">{company.company.coType}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">일반 채용 현황</h2>
                        <div className="flex justify-between mb-4">
                            <div className="text-center">
                                <Link href='/company' className="text-2xl font-bold text-blue-600 underline text-center">{company.postCount}</Link>
                                <p>진행중 공고</p>
                            </div>
                            <div className="text-center">
                                <Link href='/company' className="text-2xl font-bold text-blue-600 underline text-center">{company.noPostCount}</Link>
                                <p>마감된 공고</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Button text={'공고목록'} type={'submit'}/>
                            <Button text={'공고등록'}/>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">후기 현황</h2>
                        <div className="flex justify-between mb-4">
                            <div className="text-center">
                                <Link href='/company' className="text-2xl font-bold text-blue-600 underline text-center">{company.reviewCount}</Link>
                                <p>기업 후기</p>
                            </div>
                            <div className="text-center">
                                <Link href='/company' className="text-2xl font-bold text-blue-600 underline text-center">{company.interviewCount}</Link>
                                <p>면접 후기</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Button text={'기업후기'} type={'submit'}/>
                            <Button text={'면접후기'}/>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">인재 현황</h2>
                        <div className="flex felx-co justify-between mb-4">
                            <div className="text-center">
                                <Link href='/company' className="text-2xl font-bold text-blue-600 underline text-center">{company.fitJobseekerCount}</Link>
                                <p>인재 추천</p>
                            </div>
                            <div className="text-center">
                                <Link href='/company' className="text-2xl font-bold text-blue-600 underline text-center">{company.talentCount}</Link>
                                <p>찜한 인재</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Link href='/src/app/(FO)/company/talent/recommend' className='btn submit'>추천목록</Link>
                            <Button text={'찜한목록'}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold mb-4">차단 목록</h2>
                            <Link href='/src/app/(FO)/company/black' className='btn'>더보기</Link>
                        </div>
                        <Table list={company.blockList.content} headers={['번호', '이름', '차단일자', '내용']} isNumber={true}/>
                        <Pagination
                            totalPages={company.blockList.totalPages}
                            currentPage={blockPage}
                            onPageChange={(page) => setBlockPage(page)}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold">채팅 목록</h2>
                            <Button text={'더보기'}/>
                        </div>
                        <Table list={[{}]} headers={['프로필', '채팅자', '마지막 채팅 시간']} />
                    </div>
                </div>
            </div>
        </>
    );
}
