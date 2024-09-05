'use client'

import Link from 'next/link';
import Table from '@/components/table/Table';
import { useEffect, useState } from 'react';

export default function Posting() {
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    function getList() {
        const ar = [
            {
                title: '백엔드',
                count: '7명',
                applicant: '1명',
                deadline: '2024-05-01',
                date: '2024-04-01'
            },
            {
                title: '프론트엔드',
                count: '3명',
                applicant: '7명',
                deadline: '2024-08-01',
                date: '2024-07-01'
            },
            {
                title: '디자이너',
                count: '1명',
                applicant: '3명',
                deadline: '2024-09-01',
                date: '2024-08-01'
            },
            {
                title: '마케터',
                count: '2명',
                applicant: '5명',
                deadline: '2024-10-01',
                date: '2024-09-01'
            }
        ]
        setList(ar)
    }
	return (
		<main class="container mx-auto px-4 py-8">
        <div class="bg-blue-100 rounded-lg p-6 mb-8">
            <p class="text-lg mb-4">유능한 인재를 효과적으로 채용하는 방법! 잡코리아 베스트 채용상품을 만나보세요!</p>
            <button class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">지금 바로 보러가기 →</button>
        </div>

        <h2 class="text-2xl font-bold mb-4">전체 채용공고</h2>
        <div class="flex " >
            <Link href="/posting/progress"><span class="text-gray-600 mr-9">진행중 0</span></Link>
            <Link href="/posting/today"><span class="text-gray-600 mr-9">오늘마감 0</span></Link>
            <Link href="/posting/end"><span class="text-gray-600 mr-9">채용마감 0</span></Link>
            <Link href="/posting/waiting"><span class="text-gray-600 mr-9">대기중 0</span></Link>
            <Link href="/posting/save"><span class="text-gray-600 mr-9">임시저장 0</span></Link>
            <Link href="/posting/all"><span class="text-gray-600 mr-9">전체 0</span></Link>
        </div>

        <div class="flex justify-between items-center mb-6">
            <div class="flex ">
                <select class="border p-2 rounded mr-3">
                    <option>최근 등록순</option>
                    <option>마감일순</option>
                    <option>채용인원순</option>
                </select>
                <select class="border p-2 rounded">
                    <option>10개씩 보기</option>
                    <option>20개씩 보기</option>
                    <option>30개씩 보기</option>
                </select>
            </div>
            <div class="flex">
                <select class="border p-2 rounded mr-3">
                    <option>공고명</option>
                </select>
                <input type="text" placeholder="검색어 입력" class="border p-2 rounded"/>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">검색</button>    
            </div>
        </div>
        {/* 진행중인 공고가 없을 때 */} 
        {list.length === 0 && (
        <div class="text-center py-16">
            <p class="text-gray-600 mb-4">진행중인 공고가 없습니다.</p>
            <Link href="/company/posting/write"><button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">공고등록하기</button></Link>
        </div>
        )}
        
        {/* 진행중인 공고가 있을때 */}
        {list.length > 0 && (
        <Table headers={['공고명', '채용인원', '지원자', '마감일', '등록일']} list={list} />
        )}
        <footer class="mt-16 pt-8 border-t border-gray-200">
				<p class='text-sm text-gray-600'>채용공고 게재기간은 최소 7일에서 최대 90일까지 가능합니다.</p>
			</footer>
		</main>
	    );
}