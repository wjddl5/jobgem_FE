'use client'

import React, {useEffect, useState} from 'react';
import UserCard from "@/components/card/UserCard";
import axios from "axios";

function Page() {
    const [jobseekers, setJobseekers] = useState([]);
    const [loadPage, setLoadPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const res = await axios(`/api/company/fit?id=${1}&loadPage=${loadPage}`);
            setJobseekers([...jobseekers, ...res.data.fitJobseekers.content]);
            setHasMore(!res.data.fitJobseekers.last);
            setIsLoading(false);
        }
        fetchData();

    }, [loadPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
            setLoadPage(loadPage + 1);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore]);

    return (
        <>
                <h2 className="text-xl font-semibold mb-4">맞춤형 인재</h2>
                <div className="grid grid-cols-3 gap-4">
                    {
                        jobseekers.map((jobseeker) => (
                            <UserCard key={jobseeker.id} jobseeker={jobseeker}/>
                        ))
                    }
                </div>
        </>
    );
}

export default Page;