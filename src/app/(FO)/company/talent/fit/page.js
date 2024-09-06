'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UserCard from '@/components/card/UserCard';

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

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">맞춤형 인재</h2>
            <div className="grid grid-cols-3 gap-4">
                {jobseekers.map((jobseeker,idx) => (
                    <UserCard key={idx} jobseeker={jobseeker} />
                ))}
            </div>
            {isLoading && <p>Loading...</p>}
        </>
    );
}

export default Page;
