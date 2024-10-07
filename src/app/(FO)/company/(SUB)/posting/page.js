'use client'

import Link from 'next/link';
import Table from '@/components/table/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/pagination/Pagination';
import { getToken } from '@/app/util/token/token';

export default function Posting() {
    const router = useRouter();
    const [login, setLogin] = useState(null); // 초기값을 null로 설정
    const [list, setList] = useState([])
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('title')
    const [listInfo, setListInfo] = useState({})
    const [select, setSelect] = useState(0)
    const [sort, setSort] = useState('poDateDesc')
    const [loadPage, setLoadPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    useEffect(() => {
        getToken().then((res) => {
            setLogin(res.IDX); // login 값 설정
            console.log(res);
        });
    }, [])
    useEffect(() => {
        if(login !== null){
            init();
            getinfo();
        }
    }, [login, loadPage])
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
    }, [sort, loadPage])

    function getinfo(){
        axios.get('/api/posts/info',{
            params: {
                coIdx: login
            }
        })
        .then(res => {
            
            setListInfo(res.data)
        })
    }
    function init(){
        axios.get('/api/posts',{
            params: {
                coIdx: login,
                sort: sort,
                curPage: loadPage,
                size: 10
            }
        })
        .then(res => {
            console.log( res.data)
            setList(res.data.content)
        })
    }
    function getAllList(){
        axios.get('/api/posts',{
            params: {
                coIdx: login,
                sort: sort,
                curPage: loadPage,
                size: 10
            }
        })
        .then(res => {
            updateListAndPagination(res);
        })
    }
    function getProgressList(){
        axios.get('/api/posts',{
            params: {
                coIdx: login,
                state: 1,
                sort: sort,
                curPage: loadPage,
                size: 10
            }
        })
        .then(res => {
            updateListAndPagination(res);
        })
    }
    function getDeadlineList(){
        axios.get('/api/posts',{
            params: {
                coIdx: login,
                deadline: 'today',
                sort: sort,
                curPage: loadPage,
                size: 10    
            }
        })
        .then(res => {
            updateListAndPagination(res);
        })
    }
    function getCloseList(){
        axios.get('/api/posts',{
            params: {
                coIdx: login,
                state: 2,
                sort: sort,
                curPage: loadPage,
                size: 10
            }
        })
        .then(res => {
            updateListAndPagination(res);
        })
    }
    
    function searchList(){
        if(search === ''){
            alert('검색어를 입력해주세요.')
            return
        }
        axios.get('/api/posts',{
            params: {
                coIdx: login,
                search: search,
                searchType: searchType,
                sort: sort,
                curPage: loadPage,
                size: 10
            }
        })
        .then(res => {
            updateListAndPagination(res);
        })
    }

    function sortList(e){
        setSort(e.target.value)
    }

    function detail(poIdx){
        router.push(`/company/posting/detail/${poIdx}`)
    }

    function updateListAndPagination(res) {
        setList(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setLoadPage(res.data.number);
    }

    function handlePageChange(newPage) {
        if (newPage >= 0 && newPage < totalPages) {
            setLoadPage(newPage);
        }
    }
    
    function handleall() {
        setSelect(0)
        if(loadPage !== 0){
            setLoadPage(0)
        }else{
            getAllList()
        }
        
    }
    function handleprogress() {
        setSelect(1)
        if(loadPage !== 0){
            setLoadPage(0)
        }else{
            getProgressList()
        }
    }
    function handledeadline() {
        setSelect(2)
        if(loadPage !== 0){
            setLoadPage(0)
        }else{
            getDeadlineList()
        }
    }
    function handleclose() {
        setSelect(3)
        if(loadPage !== 0){
            setLoadPage(0)
        }else{
            getCloseList()
        }
    }


	return (
		<main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
            {select === 0 ? <h2 className="text-2xl font-bold mb-4">전체 채용공고</h2> :
            <h2 className="text-2xl font-bold mb-4">{select === 1 ? '진행중인 공고' : select === 2 ? '오늘마감 공고' : '채용마감 공고'}</h2>}
            
            <Link href="/company/posting/write"><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">공고등록하기</button></Link>
        </div>
            
        <div className="flex" >
            {select === 0  ?<button className="text-blue-500 mr-9 " onClick={handleall}>전체 {listInfo.all}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={handleall}>전체 {listInfo.all}</button>}
            {select === 1 ?<button className="text-blue-500 mr-9 hover:text-blue-500" onClick={handleprogress}>진행중 {listInfo.progress}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={handleprogress}>진행중 {listInfo.progress}</button>}
            {select === 2 ?<button className="text-blue-500 mr-9 hover:text-blue-500" onClick={handledeadline}>오늘마감 {listInfo.deadline}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={handledeadline}>오늘마감 {listInfo.deadline}</button>}
            {select === 3 ?<button className="text-blue-500 mr-9 hover:text-blue-500" onClick={handleclose}>채용마감 {listInfo.complete}</button> :
            <button className="text-gray-600 mr-9 hover:text-blue-500" onClick={handleclose}>채용마감 {listInfo.complete}</button>}

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
            <Link href="/company/posting/write"><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">공고등록하기</button></Link>
        </div>
        )}
        
        {/* 진행중인 공고가 있을때 */}
        {list.length > 0 && (
        <>
            <table className='border-collapse w-full'>
                <thead>
                    <tr>
                        <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>공고명</th>
                        <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>지원자</th>
                        <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>등록일</th>
                        <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>마감일</th>
                        <th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, idx) => (
                        <tr key={idx} onClick={() => detail(item.id)}>
                            <td className='p-3 border border-gray-300'>{item.poTitle}</td>
                            <td className='p-3 border border-gray-300'>{item.applyCount}</td>
                            <td className='p-3 border border-gray-300'>{item.poDate}</td>
                            <td className='p-3 border border-gray-300'>{item.poDeadline}</td>
                            <td className='p-3 border border-gray-300'>{item.poState === 1 ? '진행중' : item.poState === 2 ? '마감' : '종료'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Pagination
                totalPages={totalPages}
                currentPage={loadPage}
                setLoadPage={setLoadPage}
            />
            
            <div className="text-center mt-4">
                <p className="text-sm text-gray-700">
                    <span className="font-medium">{totalElements}</span> 개 중{' '}
                    <span className="font-medium">{loadPage * 10 + 1}</span> -
                    <span className="font-medium">{Math.min((loadPage + 1) * 10, totalElements)}</span> 표시
                </p>
            </div>
        </>
        )}
        
        <footer className="mt-16 pt-8 border-t border-gray-200">
			<p className='text-sm text-gray-600'>채용공고 게재기간은 최소 7일에서 최대 90일까지 가능합니다.</p>
		</footer>
		</main>
	    );
}