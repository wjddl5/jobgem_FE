'use client';
import React, { useEffect, useState } from 'react';
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import axios from "axios";
import Pagination from "@/components/pagination/Pagination";
import { FaSearch } from 'react-icons/fa';
import IconButton from "@/components/button/IconButton";

function Page() {
    const [list, setList] = useState({ content: [], totalPages: 0 });
    const [loadPage, setLoadPage] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectList, setSelectList] = useState([]);
    const [checkAll, setCheckAll] = useState(false);

    const setData = () => {
        axios.get('/api/company/block', {
            params: {
                id: 1,
                loadPage: loadPage,
                name: searchTerm
            }
        }).then((res) => {
            setList(res.data);
        });
    }

    useEffect(() => {
        setData();
    }, [loadPage, searchTerm]);

    useEffect(() => {
        // 전체 선택 체크박스 상태를 업데이트
        setCheckAll(list.content.length > 0 && selectList.length === list.content.length);
    }, [list.content, selectList]);

    // 체크된 목록 저장
    const handleCheckboxChange = (e, id) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectList(prevIds => [...prevIds, id]);
        } else {
            setSelectList(prevIds => prevIds.filter(selectedId => selectedId !== id));
        }
    };

    // 전체 체크시 해당 페이지 요소들 전체 선택 및 해제
    const handleCheckAllChange = (e) => {
        const isChecked = e.target.checked;
        setCheckAll(isChecked);
        setSelectList(isChecked ? list.content.map(item => item.id) : []);
    };

    // 차단 해제
    const handleUnblock = () => {
        if(confirm("차단 해제 하시겠습니까?")){
            axios.post('/api/company/block/delete', null, {params:{
                selectList,
            }}).then((res) => {
                alert("차단 해제되었습니다.");
                setData();
            })
        }
    };

    return (
        <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold mb-6">차단내역</h1>
                    <div className="flex items-center gap-2 mb-2">
                        <Input
                            type="text"
                            placeholder="검색"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <IconButton onClick={() => setSearchTerm(searchValue)}><FaSearch /></IconButton>
                    </div>
                </div>
                <table className="border-collapse w-full">
                    <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            <Input
                                type='checkbox'
                                id='checkAll'
                                name='checkAll'
                                checked={checkAll}
                                onChange={handleCheckAllChange}
                            />
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            이름
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            사유
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            차단일자
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.content.map((value) => (
                        <tr key={value.id} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                <Input
                                    type='checkbox'
                                    id={`check${value.id}`}
                                    name={`check${value.id}`}
                                    checked={selectList.includes(value.id)}
                                    onChange={(e) => handleCheckboxChange(e, value.id)}
                                />
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {value.name}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {value.blContent}
                            </td>
                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                {value.blDate}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className='text-right mt-2'>
                    <Button text='차단해제' onClick={handleUnblock} />
                </div>
                <Pagination
                    totalPages={list.totalPages}
                    currentPage={loadPage}
                    onPageChange={(page) => setLoadPage(page)}
                />
                <div className="mt-4 text-gray-600 text-sm">
                    <p>• 차단된 인재는 귀사에서 진행하는 모든 채용공고에 지원하더라도 지원자 목록에 표시되지 않습니다.</p>
                    <p>• 차단해제는 해당 지원자에게 통보되지 않습니다.</p>
                    <p>• 차단에 시, 지원자 관리에서 정상적으로 확인할 수 있습니다.</p>
                    <p>• 프로필 지원자는 최종 학력, 최종경력 연봉까지 노출되지 않습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default Page;
