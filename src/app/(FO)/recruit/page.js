// /src/app/recruit/page.js
"use client"

import Card from "@/components/card/Card";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Chip, Divider } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import LocationModal from "./component/LocationModal";
import CarrerModal from "./component/CarrerModal";


const NotFoundMessage = () => {
    return (
        <div className="text-center text-gray-500">
            찾으시는 조건의 검색 결과가 없습니다.
        </div>
    );
};

const RecruitPage = () => {
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loadPage, setLoadPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [locationModalOpen, setLocationModalOpen] = useState(false);
    const [carrerModalOpen, setCarrerModalOpen] = useState(false);
    const [selectedSkillIds, setSelectedSkillIds] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedCarrer, setSelectedCarrer] = useState([]);

    // 태그 데이터 패칭
    useEffect(() => {
        axios.get('/api/category/all').then(res => {
            setTags(res.data);
        }).catch(error => {
            console.error('Failed to fetch tags:', error);
        });
    }, []);

    // 무한 스크롤 구현
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
        setLoadPage(prevLoadPage => prevLoadPage + 1);
    }, [isLoading, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // 공고 데이터 패칭 및 페이징
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(`/api/posts/recruit`, {
                "crList": selectedCarrer,
                "edList": [],
                "hkList": [],
                "lgList": selectedLocation,
                "skList": selectedSkillIds,
                "curPage": loadPage
            });

            setPosts(prevPosts => [...prevPosts, ...res.data.content]);
            setHasMore(!res.data.last);
        } catch (error) {
            console.error('Failed to fetch jobseekers:', error);
        } finally {
            setIsLoading(false);
        }
    }, [loadPage, selectedSkillIds, selectedLocation, selectedCarrer]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setLoadPage(0);
        setPosts([]);
    }, [selectedSkillIds, selectedLocation, selectedCarrer]);

    const handleTagClick = (tagId) => {
        setSelectedSkillIds(prevSelectedSkillIds => {
            if (prevSelectedSkillIds.includes(tagId)) {
                return prevSelectedSkillIds.filter(id => id !== tagId);
            } else {
                return [...prevSelectedSkillIds, tagId];
            }
        });
    };

    const handleLocationClick = () => {
        setLocationModalOpen(true);
    };

    const handleCarrerClick = () => {
        setCarrerModalOpen(true);
    };
    
    return (
        <div className="relative pt-2 lg:pt-2 min-h-screen bg-white rounded-lg">
            <div className="mx-auto rounded-2xl space-y-10 bg-white p-10 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                <div className="w-2/12 flex">
                    <div className="flex w-full justify-center items-center" onClick={handleLocationClick}>
                        <h2 className="text-2xl font-semibold cursor-pointer">지역</h2>
                        <ArrowDropDownIcon />
                    </div>
                    <div className="flex w-full justify-center items-center" onClick={handleCarrerClick}>
                        <h2 className="text-2xl font-semibold cursor-pointer">경력</h2>
                        <ArrowDropDownIcon />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {
                        tags.skillList && tags.skillList.map((el) => (
                            <Chip
                                label={el.skName}
                                key={el.id}
                                color="primary"
                                variant={selectedSkillIds.includes(el.id) ? "filled" : "outlined"}
                                onClick={() => handleTagClick(el.id)}
                                sx={{ marginRight: 1, marginBottom: 1 }}
                            />
                        ))
                    }
                </div>
                <Divider textAlign="center">
                    <p className="text-lg font-semibold text-gray-600">검색 결과</p>
                </Divider>
                {posts.length === 0 ? <NotFoundMessage /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                        {posts.map((el, idx) => (
                            <Card item={el} key={idx} />
                        ))}
                    </div>
                )}
                {tags.locationList && <LocationModal open={locationModalOpen} setOpen={setLocationModalOpen} location={tags.locationList} setSelectedLocation={setSelectedLocation} />}
                {tags.careerList && <CarrerModal open={carrerModalOpen} setOpen={setCarrerModalOpen} carrer={tags.careerList} setSelectedCarrer={setSelectedCarrer} />}
            </div>
        </div>
    );
};

export default RecruitPage;
