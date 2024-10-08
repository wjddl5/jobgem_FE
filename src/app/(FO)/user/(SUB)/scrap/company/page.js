'use client'
import { getToken } from '@/app/util/token/token';
import { Rating } from '@mui/material';
import axios from 'axios';
import Link from "next/link";
import { useEffect, useState } from 'react';

function ScrapCompanyPage() {

    const [interestCo, setInterestCo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterestCo = async () => {
            const token = await getToken();
            if(token) {
                const userIdx = token.IDX;
                const res = await axios.get(`/api/interest/list/${userIdx}`);
                setInterestCo(res.data);
            }
            setLoading(false);
        }

        fetchInterestCo();
    }, []);

    return (
        <div className="w-full h-full p-8">
            <div className="overflow-x-auto">
                <h1 className="text-3xl font-bold mb-4">관심 기업</h1>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">기업명</th>
                            <th className="px-4 py-2 border-b text-left">기업형태</th>
                            <th className="px-4 py-2 border-b text-left">기업위치</th>
                            <th className="px-4 py-2 border-b text-left">기업평점</th>
                            <th className="px-4 py-2 border-b text-left">스크랩 일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            interestCo.length > 0 ?
                                interestCo.map((interestCo) => (
                                    <tr key={interestCo.id}>
                                        <td className="px-4 py-4 border-b">
                                            <Link href={`/com-info/${interestCo.companyDto.id}`} className="text-lg font-bold">
                                                <p className="text-lg font-bold">{interestCo.companyDto.coName}</p>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4 border-b">
                                            <p>{interestCo.companyDto.coType}</p>
                                        </td>
                                        <td className="px-4 py-4 border-b">
                                            <p>{interestCo.companyDto.coAddress}</p>
                                        </td>
                                        <td className="px-4 py-4 border-b">
                                            <p><Rating name="size-medium" readOnly defaultValue={interestCo.companyDto.coScore} /></p>
                                        </td>
                                        <td className="px-4 py-4 border-b">
                                            <p className="text-sm text-gray-500">{interestCo.icDate}일</p>
                                        </td>
                                    </tr>
                                )) :
                                loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">데이터 가져오는 중</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">관심기업이 없습니다.</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default ScrapCompanyPage;
