'use client'

import Link from 'next/link';
import Table from '@/components/table/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Posting() {
    const [list, setList] = useState([])
    const [data, setData] =useState([])
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('title')
    const [select, setSelect] = useState(0)
    const [sort, setSort] = useState('poDateDesc')
    const [page, setPage] = useState(1)
    useEffect(() => {
        init();
    }, [])
    useEffect(() => {
        if(select === 0){
            getAllList()
        }else if(select === 1){
            getProgressList()
        }else if(select === 2){
            getDeadlineList()
        }else if(select === 3){
            getCloseList()
        }
    }, [sort])
    function init(){
        axios.get('/api/post')
        .then(res => {
            listSet(res)
        })
    }
    function listSet(res){
        setData(res.data)
            setList([])
            res.data.postList.map(item => {
                let status = '';
                if(item.poState === 2){
                    status = '마감'
                }else if(item.poState === 1){
                    status = '진행중'
                }else if(item.poState === 0){
                    status = '대기중'
                }
                const data = {
                    poTitle: item.poTitle,
                    poCount: item.applyCount,
                    poDate: item.poDate,
                    poDeadline: item.poDeadline,
                    status: status
            }
            setList(prev => [...prev, data])
        })
    }
    function getAllList(){
        setSelect(0)
        axios.get('/api/post',{
            params: {
                sort: sort,
            }
        })
        .then(res => {
            listSet(res)

        })
    }
    function getProgressList(){
        setSelect(1)
        axios.get('/api/post',{
            params: {
                state: 1,
                sort: sort
            }
        })
        .then(res => {
            listSet(res)
        })
    }
    function getDeadlineList(){
        setSelect(2)
        axios.get('/api/post',{
            params: {
                deadline: 'today',
                sort: sort
            }
        })
        .then(res => {
            listSet(res)
        })
    }
    function getCloseList(){
        setSelect(3)
        axios.get('/api/post',{
            params: {
                state: 2,
                sort: sort
            }
        })
        .then(res => {
            listSet(res)
        })
    }
    
    function searchList(){
        if(search === ''){
            alert('검색어를 입력해주세요.')
            return
        }
        setSelect(0)
        axios.get('/api/post',{
            params: {
                search: search,
                searchType: searchType,
                sort: sort,
            }
        })
        .then(res => {
            listSet(res)
        })
    }

    function sortList(e){
        setSort(e.target.value)
    }

    
	return (
		<main className="container mx-auto px-4 py-8">
        <div className="bg-blue-100 rounded-lg p-6 mb-8">
            <p className="text-lg mb-4">유능한 인재를 효과적으로 채용하는 방법! 잡잼 인재 추천 서비스를 만나보세요</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">지금 바로 보러가기 →</button>
        </div>
        <div className="flex justify-between items-center">
            {select === 0 ? <h2 className="text-2xl font-bold mb-4">전체 채용공고</h2> :
            <h2 className="text-2xl font-bold mb-4">{select === 1 ? '진행중인 공고' : select === 2 ? '오늘마감 공고' : '채용마감 공고'}</h2>}
            
            <Link href="/(FO)/company/(SUB)/posting/write"><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">공고등록하기</button></Link>
        </div>
            
        <div className="flex" >
            {select === 0  ?<button className="text-blue-500 mr-9 " onClick={getAllList}>전체 {data.all}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={getAllList}>전체 {data.all}</button>}
            {select === 1 ?<button className="text-blue-500 mr-9 hover:text-blue-500" onClick={getProgressList}>진행중 {data.progress}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={getProgressList}>진행중 {data.progress}</button>}
            {select === 2 ?<button className="text-blue-500 mr-9 hover:text-blue-500" onClick={getDeadlineList}>오늘마감 {data.deadline}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={getDeadlineList}>오늘마감 {data.deadline}</button>}
            {select === 3 ?<button className="text-blue-500 mr-9 hover:text-blue-500" onClick={getCloseList}>채용마감 {data.complete}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={getCloseList}>채용마감 {data.complete}</button>}

        </div>

        <div className="flex justify-between items-center mb-6">
            <div className="flex ">
                <select className="border p-2 rounded mr-3" onChange={sortList}>
                    <option value="poDateDesc">최근 등록순</option>
                    <option value="poDeadlineAsc">마감일순</option>
                    <option value="applyCountDesc">지원자순</option>
                    <option value="poDateAsc">오래된순</option>
                </select>
                <select className="border p-2 rounded">
                    <option>10개씩 보기</option>
                    <option>20개씩 보기</option>
                    <option>30개씩 보기</option>
                </select>
            </div>
            <div className="flex">
                <select className="border p-2 rounded mr-3" onChange={(e) => setSearchType(e.target.value)}>
                    <option value="poTitle">공고명</option>
                </select>
                <input type="text" placeholder="검색어 입력" className="border p-2 rounded" onChange={(e) => setSearch(e.target.value)}/>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={searchList}>검색</button>
            </div>
        </div>
        {/* 진행중인 공고가 없을 때 */} 
        {list.length === 0 && (
        <div className="text-center py-16">
            <p className="text-gray-600 mb-4">진행중인 공고가 없습니다.</p>
            <Link href="/(FO)/company/(SUB)/posting/write"><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">공고등록하기</button></Link>
        </div>
        )}
        
        {/* 진행중인 공고가 있을때 */}
        {list.length > 0 && (
        <Table headers={['공고명', '지원자', '등록일', '마감일', '상태']} list={list.map(item => [item.poTitle, item.poCount, item.poDate, item.poDeadline, item.status])} />
        )}
        <footer className="mt-16 pt-8 border-t border-gray-200">
			<p className='text-sm text-gray-600'>채용공고 게재기간은 최소 7일에서 최대 90일까지 가능합니다.</p>
		</footer>
		</main>
	    );
}