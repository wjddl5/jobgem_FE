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
            setLoadPage((prevLoadPage) => prevLoadPage + 1);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    const removeWishHandler = (id) => {
        if(confirm("해당 인재를 찜목록에서 삭제하시겠습니까?")){
            axios.post('/api/company/wish/delete',null, {
                params: { id }
            }).then(res => {
                alert("삭제 완료했습니다.");
                setJobseekers(prevJobseekers =>
                    prevJobseekers.filter(jobseeker => jobseeker.id !== id)
                );
            });
        }
    };

    return (
        <div className="container mx-auto p-8">
            <div className="relative mb-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 relative z-10">
                    찜한 인재
                </h2>
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full mt-2"></div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    jobseekers.map((item, idx) => (
                        <div key={idx} className="p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-2xl">👤</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold">{item.jobseeker.joName} (만 {item.jobseeker.joAge}세)</h3>
                                    <p className="text-blue-500">{item.jobseeker.joTel}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-3">{item.jobseeker.joAddress}</p>
                            <p className="text-gray-500 text-sm mb-3">{item.jobseeker.joEdu}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {item.jobseeker.skills.length > 0 ? (
                                    item.jobseeker.skills.map((skill, i) => (
                                        <span key={i}
                                              className="px-2 py-1 bg-gray-100 text-sm rounded-md">{skill.skName}</span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">No skills listed</span>
                                )}
                            </div>
                            <div className="flex justify-center gap-3 mt-4">
                                <Button text='1:1 대화' type='submit' className="w-1/2" />
                                <Button text='찜 삭제' onClick={() => removeWishHandler(item.id)} className="w-1/2" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Page;
