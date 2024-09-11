'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Button from "@/components/button/Button";

function Page() {
    const [jobseekers, setJobseekers] = useState([]);
    const [loadPage, setLoadPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios(`/api/company/fit?id=${1}&loadPage=${loadPage}`);
            setJobseekers(prevJobseekers => [
                ...prevJobseekers,
                ...res.data.fitJobseekers.content
            ]);
            setHasMore(!res.data.fitJobseekers.last);
        } catch (error) {
            console.error('Failed to fetch jobseekers:', error);
        } finally {
            setIsLoading(false);
        }
    }, [loadPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
        setLoadPage(prevLoadPage => prevLoadPage + 1);
    }, [isLoading, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);


    const addWishHandler = (id) => {
        if(confirm("해당 인재를 찜목록에 저장하시겠습니까?")){
            axios.post('/api/company/wish/add',null, {
                params: {
                    coIdx: 1,
                    joIdx: id,
                }
            }).then(res => {
                alert("저장완료되었습니다");
                setJobseekers(prevJobseekers =>
                    prevJobseekers.filter(jobseeker => jobseeker.id !== id) // Corrected the filtering
                );
            })
        }
    }


    return (
        <div className='flex flex-col p-8'>
            <div className="relative mb-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 relative z-10">
                    인재 추천
                </h2>
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full mt-2"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {jobseekers.map((jobseeker, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-md shadow-md">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-400 text-2xl">👤</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">{jobseeker.joName} (만 {jobseeker.joAge}세)</h3>
                                <p className="text-blue-500">{jobseeker.joTel}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-2">{jobseeker.joAddress}</p>
                        <p className="text-gray-500 text-sm mb-2">{jobseeker.joEdu}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {jobseeker.skills.length > 0 ? (
                                jobseeker.skills.map((skill, i) => (
                                    <span key={i}
                                          className="px-2 py-1 bg-gray-100 text-sm rounded-md">{skill.skName}</span>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">No skills listed</span>
                            )}
                        </div>
                        <div className='flex gap-2 justify-center mt-4'>
                            <Button text='1:1 대화' type='submit'/>
                            <Button text='인재 찜하기' onClick={() => addWishHandler(jobseeker.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
