'use client';

import React, {useEffect, useState} from 'react';
import axios from "axios";
import UserCard from "@/components/card/UserCard";

function Page(props) {

    const [jobseekers, setJobseekers] = useState([]);
    const [loadPage, setLoadPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getData = async () => {
        setIsLoading(true);
        const res = await axios(`/api/company/wish?id=${1}&loadPage=${loadPage}`);
        setJobseekers((prevJobseekers) => [...prevJobseekers, ...res.data.wishJobseekers.content]);
        setHasMore(!res.data.wishJobseekers.last);
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

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">찜한 인재</h2>
            <div className="grid grid-cols-3 gap-4">
                {
                    jobseekers.map((item) => {
                        return <UserCard type='wish' jobseeker={item.jobseeker} key={item.id} skills={item.jobseeker.skills}/>;
                    })
                }
            </div>
        </>
    );
}

export default Page;
