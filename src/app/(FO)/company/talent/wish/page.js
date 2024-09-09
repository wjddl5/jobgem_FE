'use client';

import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "@/components/button/Button";

function Page(props) {

    const [jobseekers, setJobseekers] = useState([]);
    const [loadPage, setLoadPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getData = async () => {
        setIsLoading(true);
        const res = await axios(`/api/company/wish?id=${1}&loadPage=${loadPage}`);
        setJobseekers((prevJobseekers) => [...prevJobseekers, ...res.data.content]);
        setHasMore(!res.data.last);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, [loadPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
            setLoadPage((prevLoadPage) => prevLoadPage + 1); // 함수형 업데이트로 수정
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);


    const removeWishHandler = (id) => {
        if(confirm("해당 인재를 찜목록에서 삭제하시겠습니까?")){
            axios.post('/api/company/wish/delete',null, {
                params: {
                    id: id
                }
            }).then(res => {
                alert("삭제 완료했습니다.");
                setJobseekers(prevJobseekers =>
                    prevJobseekers.filter(jobseeker => jobseeker.id !== id) // Corrected the filtering
                );
            })
        }
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">찜한 인재</h2>
            <div className="grid grid-cols-3 gap-4">
                {
                    jobseekers.map((item, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-md shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-2xl">👤</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{item.jobseeker.joName} (만 {item.jobseeker.joAge}세)</h3>
                                    <p className="text-blue-500">{item.jobseeker.joTel}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{item.jobseeker.joAddress}</p>
                            <p className="text-gray-500 text-sm mb-2">{item.jobseeker.joEdu}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {item.jobseeker.skills.length > 0 ? (
                                    item.jobseeker.skills.map((skill, i) => (
                                        <span key={i}
                                              className="px-2 py-1 bg-gray-100 text-sm rounded-md">{skill.skName}</span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">No skills listed</span>
                                )}
                            </div>
                            <div className='flex gap-2 justify-center mt-4'>
                                <Button text='1:1 대화' type='submit'/>
                                <Button text='찜 삭제' onClick={() => removeWishHandler(item.id)}/>
                            </div>
                        </div>)
                    )
                }
            </div>
        </>
    );
}

export default Page;
