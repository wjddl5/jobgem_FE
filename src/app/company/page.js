'use client'

import React from 'react';
import Button from "@/components/button/Button";
import {DiAptana} from "react-icons/di";
import IconButton from "@/components/button/IconButton";
import Image from "next/image";
import Table from "@/components/table/Table";
import Link from "next/link";

function Page() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-md">
                    <div className="flex gap-6">
                        <Image src="/img/1.jpg" width='100' height='100' alt="등록된 로고"
                               className="w-12 h-12 rounded-full object-cover border border-gray-300"/>
                        <button
                            className="flex items-center border border-dashed border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                            <span className="text-gray-600">로고 등록 +</span>
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
                                <p className="text-2xl font-bold">46억</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">사원수</p>
                                <p className="text-2xl font-bold">1000명</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">산업</p>
                                <p className="text-2xl font-bold">IT</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">설립</p>
                                <p className="text-2xl font-bold">1933년</p>
                            </div>
                            <div className="text-center p-4">
                                <p className="mb-2">기업형태</p>
                                <p className="text-2xl font-bold">중견기업</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <h2 className="text-lg font-bold mb-4">일반 채용 현황</h2>
                        <div className="flex justify-between mb-4">
                            <div>
                                <p className="text-2xl font-bold text-blue-600 underline text-center">0</p>
                                <p>진행중 공고</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600 underline text-center">0</p>
                                <p>마감된 이력서</p>
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
                            <div>
                                <p className="text-2xl font-bold text-blue-600 underline text-center">0</p>
                                <p>기업 후기</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600 underline text-center">0</p>
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
                            <div>
                                <p className="text-2xl font-bold text-blue-600 underline text-center">0</p>
                                <p>인재 추천</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600 underline text-center">0</p>
                                <p>찜한 인재</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2">
                            <Link href='/company/talent/recommend' className='btn submit'>추천목록</Link>
                            <Button text={'찜한목록'}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold mb-4">차단 목록</h2>
                            <Link href='/company/black' className='btn'>더보기</Link>
                        </div>
                        <Table list={[{}]} headers={['이름', '차단일자', '이력']}/>
                    </div>

                    <div className="bg-white p-6 rounded-md shadow">
                        <div className='mb-4 flex justify-between'>
                            <h2 className="text-lg font-bold">채팅 목록</h2>
                            <Button text={'더보기'}/>
                        </div>
                        <Table list={[{}]} headers={['프로필', '채팅자', '마지막 채팅 시간']}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;